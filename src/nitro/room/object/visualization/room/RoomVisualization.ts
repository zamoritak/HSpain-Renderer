
import { Filter } from '@pixi/core';
import { Rectangle } from '@pixi/math';
import { AlphaTolerance, IObjectVisualizationData, IPlaneVisualization, IRoomGeometry, IRoomObjectModel, IRoomObjectSprite, IRoomPlane, RoomObjectSpriteType, RoomObjectVariable, Vector3d } from '../../../../../api';
import { PlaneTextureCache } from '../../../../../pixi-proxy';
import { RoomAreaSelectionManager, RoomObjectSpriteVisualization } from '../../../../../room';
import { ToInt32 } from '../../../../utils';
import { RoomMapData } from '../../RoomMapData';
import { RoomMapMaskData } from '../../RoomMapMaskData';
import { RoomPlaneBitmapMaskData } from '../../RoomPlaneBitmapMaskData';
import { RoomPlaneBitmapMaskParser } from '../../RoomPlaneBitmapMaskParser';
import { RoomPlaneData } from '../../RoomPlaneData';
import { RoomPlaneParser } from '../../RoomPlaneParser';
import { RoomPlane } from './RoomPlane';
import { RoomVisualizationData } from './RoomVisualizationData';

export class RoomVisualization extends RoomObjectSpriteVisualization implements IPlaneVisualization
{
    public static FLOOR_COLOR: number = 0xFFFFFF;
    public static FLOOR_COLOR_LEFT: number = 0xDDDDDD;
    public static FLOOR_COLOR_RIGHT: number = 0xBBBBBB;
    private static WALL_COLOR_TOP: number = 0xFFFFFF;
    private static WALL_COLOR_SIDE: number = 0xCCCCCC;
    private static WALL_COLOR_BOTTOM: number = 0x999999;
    private static WALL_COLOR_BORDER: number = 0x999999;
    public static LANDSCAPE_COLOR_TOP: number = 0xFFFFFF;
    public static LANDSCAPE_COLOR_SIDE: number = 0xCCCCCC;
    public static LANDSCAPE_COLOR_BOTTOM: number = 0x999999;
    private static ROOM_DEPTH_OFFSET: number = 1000;

    protected _data: RoomVisualizationData;

    private _roomPlaneParser: RoomPlaneParser;
    private _roomPlaneBitmapMaskParser: RoomPlaneBitmapMaskParser;

    private _geometryUpdateId: number;
    private _boundingRectangle: Rectangle;
    private _directionX: number;
    private _directionY: number;
    private _directionZ: number;
    private _floorThickness: number;
    private _wallThickness: number;
    private _holeUpdateTime: number;
    private _planes: RoomPlane[];
    private _visiblePlanes: RoomPlane[];
    private _visiblePlaneSpriteNumbers: number[];
    private _roomScale: number;
    private _lastUpdateTime: number;
    private _updateIntervalTime: number;
    private _wallType: string;
    private _floorType: string;
    private _landscapeType: string;
    private _colorBackgroundOnly: boolean;
    private _color: number;
    private _redColor: number;
    private _greenColor: number;
    private _blueColor: number;
    private _typeVisibility: boolean[];
    private _assetUpdateCounter: number;
    private _maskData: RoomMapMaskData;
    private _isPlaneSet: boolean;
    private _highlightAreaX: number = 0;
    private _highlightAreaY: number = 0;
    private _highlightAreaWidth: number = 0;
    private _highlightAreaHeight: number = 0;
    private _highlightFilter: Filter = null;
    private _highlightPlaneOffsets: number[] = [];
    private _textureCache: PlaneTextureCache;

    constructor()
    {
        super();

        this._data = null;

        this._roomPlaneParser = new RoomPlaneParser();
        this._roomPlaneBitmapMaskParser = new RoomPlaneBitmapMaskParser();

        this._geometryUpdateId = -1;
        this._directionX = 0;
        this._directionY = 0;
        this._directionZ = 0;
        this._floorThickness = 1;
        this._wallThickness = 1;
        this._holeUpdateTime = NaN;
        this._planes = [];
        this._visiblePlanes = [];
        this._visiblePlaneSpriteNumbers = [];
        this._roomScale = 0;
        this._lastUpdateTime = -1000;
        this._updateIntervalTime = 250;
        this._wallType = null;
        this._floorType = null;
        this._landscapeType = null;
        this._colorBackgroundOnly = true;
        this._color = 0xFFFFFF;
        this._redColor = 0xFF;
        this._greenColor = 0xFF;
        this._blueColor = 0xFF;
        this._typeVisibility = [];
        this._assetUpdateCounter = 0;
        this._maskData = null;
        this._isPlaneSet = false;
        this._textureCache = new PlaneTextureCache();

        this._typeVisibility[RoomPlane.TYPE_UNDEFINED] = false;
        this._typeVisibility[RoomPlane.TYPE_FLOOR] = true;
        this._typeVisibility[RoomPlane.TYPE_WALL] = true;
        this._typeVisibility[RoomPlane.TYPE_LANDSCAPE] = true;
    }

    public initialize(data: IObjectVisualizationData): boolean
    {
        if(!(data instanceof RoomVisualizationData)) return false;

        this._data = data;

        super.initialize(data);

        this._data.setGraphicAssetCollection(this.asset);

        return true;
    }

    public dispose(): void
    {
        super.dispose();

        this.clearPlanes();

        this._planes = null;
        this._visiblePlanes = null;
        this._visiblePlaneSpriteNumbers = null;
        this._highlightPlaneOffsets = [];

        if(this._roomPlaneParser)
        {
            this._roomPlaneParser.dispose();

            this._roomPlaneParser = null;
        }

        if(this._roomPlaneBitmapMaskParser)
        {
            this._roomPlaneBitmapMaskParser.dispose();

            this._roomPlaneBitmapMaskParser = null;
        }

        if(this._data)
        {
            this._data.clearCache();

            this._data = null;
        }

        if(this._textureCache)
        {
            this._textureCache.clearCache();
        }
    }

    protected reset(): void
    {
        super.reset();

        this._floorType = null;
        this._wallType = null;
        this._landscapeType = null;
        this._maskData = null;
        this._geometryUpdateId = -1;
        this._roomScale = 0;
    }

    public update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void
    {
        if(!this.object || !geometry) return;

        const geometryUpdate = this.updateGeometry(geometry);
        const objectModel = this.object.model;

        let needsUpdate = false;

        if(this.updateThickness(objectModel)) needsUpdate = true;

        if(this.updateHole(objectModel)) needsUpdate = true;

        this.initializeRoomPlanes();

        needsUpdate = this.updateMasks(objectModel);

        const selectionActive = (objectModel.getValue<number>(RoomObjectVariable.ROOM_SELECTION_ACTIVE) === 1);
        const updateInterval = selectionActive ? 0 : this._updateIntervalTime;

        if(((time < (this._lastUpdateTime + updateInterval)) && (!geometryUpdate)) && (!needsUpdate)) return;

        if(this.updatePlaneTexturesAndVisibilities(objectModel))
        {
            needsUpdate = true;
        }

        if(this.updatePlanes(geometry, geometryUpdate, time)) needsUpdate = true;

        if(needsUpdate)
        {
            let index = 0;

            while(index < this._visiblePlanes.length)
            {
                const spriteIndex = this._visiblePlaneSpriteNumbers[index];
                const sprite = this.getSprite(spriteIndex);
                const plane = this._visiblePlanes[index];

                if(sprite && plane && (plane.type !== RoomPlane.TYPE_LANDSCAPE))
                {
                    if(this._colorBackgroundOnly && !plane.isHighlighter)
                    {
                        let color = plane.color;

                        const r = (((color & 0xFF) * this._redColor) / 0xFF);
                        const g = ((((color >> 8) & 0xFF) * this._greenColor) / 0xFF);
                        const b = ((((color >> 16) & 0xFF) * this._blueColor) / 0xFF);
                        const a = (color >> 24);

                        color = ((((a << 24) + (b << 16)) + (g << 8)) + r);

                        sprite.color = color;
                    }
                    else
                    {
                        sprite.color = plane.color;
                    }
                }

                index++;
            }

            this.updateSpriteCounter++;
        }

        this.updateModelCounter = objectModel.updateCounter;
        this._lastUpdateTime = time;
    }

    private updateGeometry(k: IRoomGeometry): boolean
    {
        if(!k) return false;

        if(this._geometryUpdateId === k.updateId) return false;

        this._geometryUpdateId = k.updateId;
        this._boundingRectangle = null;

        const direction = k.direction;

        if(direction && ((direction.x !== this._directionX) || (direction.y !== this._directionY) || (direction.z !== this._directionZ) || (k.scale !== this._roomScale)))
        {
            this._directionX = direction.x;
            this._directionY = direction.y;
            this._directionZ = direction.z;
            this._roomScale = k.scale;

            return true;
        }

        return false;
    }

    private updateThickness(k: IRoomObjectModel): boolean
    {
        if(this.updateModelCounter === k.updateCounter) return false;

        const floorThickness = k.getValue<number>(RoomObjectVariable.ROOM_FLOOR_THICKNESS);
        const wallThickness = k.getValue<number>(RoomObjectVariable.ROOM_WALL_THICKNESS);

        if((!isNaN(floorThickness) && !isNaN(wallThickness)) && ((floorThickness !== this._floorThickness) || (wallThickness !== this._wallThickness)))
        {
            this._floorThickness = floorThickness;
            this._wallThickness = wallThickness;

            this.clearPlanes();

            return true;
        }

        return false;
    }

    private updateHole(k: IRoomObjectModel): boolean
    {
        if(this.updateModelCounter === k.updateCounter) return false;

        const holeUpdate = k.getValue<number>(RoomObjectVariable.ROOM_FLOOR_HOLE_UPDATE_TIME);

        if(!isNaN(holeUpdate) && (holeUpdate !== this._holeUpdateTime))
        {
            this._holeUpdateTime = holeUpdate;

            this.clearPlanes();

            return true;
        }

        return false;
    }

    private updateMasks(k: IRoomObjectModel): boolean
    {
        if(this.updateModelCounter === k.updateCounter) return false;

        let didUpdate = false;

        const planeMask = k.getValue<RoomMapMaskData>(RoomObjectVariable.ROOM_PLANE_MASK_XML);

        if(planeMask !== this._maskData)
        {
            this.updatePlaneMasks(planeMask);

            this._maskData = planeMask;

            didUpdate = true;
        }

        const backgroundColor = k.getValue<number>(RoomObjectVariable.ROOM_BACKGROUND_COLOR);

        if(backgroundColor !== this._color)
        {
            this._color = backgroundColor;
            this._redColor = (this._color & 0xFF);
            this._greenColor = ((this._color >> 8) & 0xFF);
            this._blueColor = ((this._color >> 16) & 0xFF);

            didUpdate = true;
        }

        const backgroundOnly = (k.getValue<boolean>(RoomObjectVariable.ROOM_COLORIZE_BG_ONLY) || false);

        if(backgroundOnly !== this._colorBackgroundOnly)
        {
            this._colorBackgroundOnly = backgroundOnly;

            didUpdate = true;
        }

        return didUpdate;
    }

    private updatePlaneTexturesAndVisibilities(model: IRoomObjectModel): boolean
    {
        if(this.updateModelCounter === model.updateCounter) return false;

        const floorType = model.getValue<string>(RoomObjectVariable.ROOM_FLOOR_TYPE);
        const wallType = model.getValue<string>(RoomObjectVariable.ROOM_WALL_TYPE);
        const landscapeType = model.getValue<string>(RoomObjectVariable.ROOM_LANDSCAPE_TYPE);

        const floorVisibility = (model.getValue<number>(RoomObjectVariable.ROOM_FLOOR_VISIBILITY) === 1);
        const wallVisibility = (model.getValue<number>(RoomObjectVariable.ROOM_WALL_VISIBILITY) === 1);
        const landscapeVisibility = (model.getValue<number>(RoomObjectVariable.ROOM_LANDSCAPE_VISIBILITY) === 1);

        return (this.updatePlaneTypes(floorType, wallType, landscapeType) || this.updatePlaneVisibility(floorVisibility, wallVisibility, landscapeVisibility));
    }

    private clearPlanes(): void
    {
        if(this._planes)
        {
            while(this._planes.length)
            {
                const plane = this._planes[0];

                if(plane) plane.dispose();

                this._planes.pop();
            }

            this._planes = [];
            this._highlightPlaneOffsets = [];
        }

        this._isPlaneSet = false;
        this._assetUpdateCounter = (this._assetUpdateCounter + 1);

        this.reset();
    }

    protected initializeRoomPlanes(): void
    {
        if(!this.object || this._isPlaneSet) return;

        if(!isNaN(this._floorThickness)) this._roomPlaneParser.floorThicknessMultiplier = this._floorThickness;
        if(!isNaN(this._wallThickness)) this._roomPlaneParser.wallThicknessMultiplier = this._wallThickness;

        this._roomPlaneParser.clearHighlightArea();

        const mapData = this.object.model.getValue<RoomMapData>(RoomObjectVariable.ROOM_MAP_DATA);

        if(!this._roomPlaneParser.initializeFromMapData(mapData)) return;

        this._roomPlaneParser.initializeHighlightArea(this._highlightAreaX, this._highlightAreaY, this._highlightAreaWidth, this._highlightAreaHeight);
        this.createPlanesAndSprites();
       }
       
    private createPlanesAndSprites(offset: number = 0): void
    {
        const maxX = this.getLandscapeWidth();
        const maxY = this.getLandscapeHeight();

        let accumulatedOffset = 0;
        let randomSeed = this.object.model.getValue<number>(RoomObjectVariable.ROOM_RANDOM_SEED);
        let index = offset;
        const parser = this._roomPlaneParser;
        const textureCache = this._textureCache;
        const objectLocation = this.object.getLocation();
        const maskManager = this._data?.maskManager;

        while(index < parser.planeCount)
        {
            this._highlightPlaneOffsets[index] = -1;

            const location = parser.getPlaneLocation(index);
            const leftSide = parser.getPlaneLeftSide(index);
            const rightSide = parser.getPlaneRightSide(index);
            const secondaryNormals = parser.getPlaneSecondaryNormals(index);
            const planeType = parser.getPlaneType(index);

            let plane: RoomPlane = null;

            if(location && leftSide && rightSide)
            {
                const normal = Vector3d.crossProduct(leftSide, rightSide);
                randomSeed = ToInt32(Math.trunc((randomSeed * 7613) + 517) >>> 0);

                switch(planeType)
                {
                    case RoomPlaneData.PLANE_FLOOR:
                        const offsetX = Math.trunc((location.x + leftSide.x) + 0.5) - (location.x + leftSide.x + 0.5);
                        const offsetY = Math.trunc((location.y + rightSide.y) + 0.5) - (location.y + rightSide.y + 0.5);

                        plane = new RoomPlane(textureCache, objectLocation, location, leftSide, rightSide, RoomPlane.TYPE_FLOOR, true, secondaryNormals, randomSeed, -offsetX, -offsetY);
                        plane.color = (normal.z !== 0) ? RoomVisualization.FLOOR_COLOR : ((normal.x !== 0) ? RoomVisualization.FLOOR_COLOR_RIGHT : RoomVisualization.FLOOR_COLOR_LEFT);
                        if(this._data) plane.rasterizer = this._data.floorRasterizer;
                        if(this._floorType)
                        {
                            if(this._floorType.startsWith('#'))
                            {
                                const parts = this._floorType.split(':');
                                plane.customColor = parseInt(parts[0].replace('#', ''), 16);
                                if(parts.length > 1) plane.customLineAlpha = parseInt(parts[1]);
                            }
                            else plane.id = this._floorType;
                        }
                        break;

                    case RoomPlaneData.PLANE_WALL:
                        plane = new RoomPlane(textureCache, objectLocation, location, leftSide, rightSide, RoomPlane.TYPE_WALL, true, secondaryNormals, randomSeed);
                        plane.hasTexture = (leftSide.length >= 1 && rightSide.length >= 1);
                        if(normal.x === 0 && normal.y === 0) plane.color = RoomVisualization.WALL_COLOR_BORDER;
                        else if(normal.y > 0) plane.color = RoomVisualization.WALL_COLOR_TOP;
                        else plane.color = (normal.y === 0) ? RoomVisualization.WALL_COLOR_SIDE : RoomVisualization.WALL_COLOR_BOTTOM;
                        if(this._data) plane.rasterizer = this._data.wallRasterizer;
                        if(this._wallType)
                        {
                            if(this._wallType.startsWith('#'))
                            {
                                const parts = this._wallType.split(':');
                                plane.customColor = parseInt(parts[0].replace('#', ''), 16);
                                if(parts.length > 1) plane.customLineAlpha = parseInt(parts[1]);
                            }
                            else plane.id = this._wallType;
                        }
                        break;

                    case RoomPlaneData.PLANE_LANDSCAPE:
                        plane = new RoomPlane(textureCache, objectLocation, location, leftSide, rightSide, RoomPlane.TYPE_LANDSCAPE, true, secondaryNormals, randomSeed, accumulatedOffset, 0, maxX, maxY);
                        plane.color = (normal.y > 0) ? RoomVisualization.LANDSCAPE_COLOR_TOP : ((normal.y === 0) ? RoomVisualization.LANDSCAPE_COLOR_SIDE : RoomVisualization.LANDSCAPE_COLOR_BOTTOM);
                        if(this._data) plane.rasterizer = this._data.landscapeRasterizer;
                        if(this._landscapeType) plane.id = this._landscapeType;
                        accumulatedOffset += leftSide.length;
                        break;

                    case RoomPlaneData.PLANE_BILLBOARD:
                        plane = new RoomPlane(textureCache, objectLocation, location, leftSide, rightSide, RoomPlane.TYPE_WALL, true, secondaryNormals, randomSeed);
                        plane.hasTexture = (leftSide.length >= 1 && rightSide.length >= 1);
                        if(normal.x === 0 && normal.y === 0) plane.color = RoomVisualization.WALL_COLOR_BORDER;
                        else if(normal.y > 0) plane.color = RoomVisualization.WALL_COLOR_TOP;
                        else plane.color = (normal.y === 0) ? RoomVisualization.WALL_COLOR_SIDE : RoomVisualization.WALL_COLOR_BOTTOM;
                        if(this._wallType)
                        {
                            if(this._wallType.startsWith('#'))
                            {
                                const parts = this._wallType.split(':');
                                plane.customColor = parseInt(parts[0].replace('#', ''), 16);
                                if(parts.length > 1) plane.id = parts[1];
                            }
                            else plane.id = this._wallType;
                        }
                        break;
                }

                if(plane)
                {
                    plane.maskManager = maskManager;

                    const maskCount = parser.getPlaneMaskCount(index);
                    for(let i = 0; i < maskCount; i++)
                    {
                        const left = parser.getPlaneMaskLeftSideLoc(index, i);
                        const right = parser.getPlaneMaskRightSideLoc(index, i);
                        const leftLength = parser.getPlaneMaskLeftSideLength(index, i);
                        const rightLength = parser.getPlaneMaskRightSideLength(index, i);
                        plane.addRectangleMask(left, right, leftLength, rightLength);
                    }

                    this._highlightPlaneOffsets[index] = this._planes.length;
                    this._planes.push(plane);
                }
            }
            else
            {
                return;
            }

            index++;
        }

        this._isPlaneSet = true;
        this.defineSprites();
    }

    public initializeHighlightArea(highlightAreaX: number, highlightAreaY: number, highlightAreaWidth: number, highlightAreaHeight: number, highlightFilter: Filter): void
    {
        this._highlightAreaX = highlightAreaX;
        this._highlightAreaY = highlightAreaY;
        this._highlightAreaWidth = highlightAreaWidth;
        this._highlightAreaHeight = highlightAreaHeight;
        this._highlightFilter = highlightFilter;

        const totalHighlightedPlanes = this._roomPlaneParser.clearHighlightArea();
        let numHighlightedPlanesRemoved = 0;

        let planeIndex = this._roomPlaneParser.planeCount;

        while (planeIndex < this._roomPlaneParser.planeCount + totalHighlightedPlanes) {
            const highlightOffset = this._highlightPlaneOffsets[planeIndex];

            if (highlightOffset !== -1) {
                numHighlightedPlanesRemoved = numHighlightedPlanesRemoved + 1;
                this._highlightPlaneOffsets[planeIndex] = -1;
            }

            planeIndex = planeIndex + 1;
        }

        this._planes = this._planes.slice(0, this._planes.length - numHighlightedPlanesRemoved);

        this._roomPlaneParser.initializeHighlightArea(highlightAreaX, highlightAreaY, highlightAreaWidth, highlightAreaHeight);

        this.createPlanesAndSprites(this._planes.length);

        const floorType = this._floorType;
        const wallType = this._wallType;
        const landscapeType = this._landscapeType;

        this.reset();

        this._floorType = floorType;
        this._wallType = wallType;
        this._landscapeType = landscapeType;
    }

    public clearHighlightArea(): void {
        this._highlightAreaX = 0;
        this._highlightAreaY = 0;
        this._highlightAreaWidth = 0;
        this._highlightAreaHeight = 0;
    
        const totalHighlightedPlanes = this._roomPlaneParser.clearHighlightArea();
        let numHighlightedPlanesRemoved = 0;
    
        let planeIndex = this._roomPlaneParser.planeCount;
    
        while (planeIndex < this._roomPlaneParser.planeCount + totalHighlightedPlanes) {
            const highlightOffset = this._highlightPlaneOffsets[planeIndex];
    
            if (highlightOffset !== -1) {
                numHighlightedPlanesRemoved = numHighlightedPlanesRemoved + 1;
                this._highlightPlaneOffsets[planeIndex] = -1;
            }
    
            planeIndex = planeIndex + 1;
        }
    
        this._planes = this._planes.slice(0, this._planes.length - numHighlightedPlanesRemoved);
        this.createSprites(this._planes.length);
    
        if (RoomAreaSelectionManager.RANK) {
            let index = 0;
            while (index < this._planes.length) {
                const spriteIndex = this._visiblePlaneSpriteNumbers[index];
                const sprite = this.getSprite(spriteIndex);
                const plane = this._planes[index];
    
                if (sprite && plane && (plane.type !== RoomPlane.TYPE_LANDSCAPE)) {
                    sprite.color = this._colorBackgroundOnly ? plane.color : sprite.color;
                }
    
                index++;
            }
                this.updateSpriteCounter++;
                RoomAreaSelectionManager.RANK = false;
        }
    }

    protected defineSprites(): void
    {
        this.createSprites(this._planes.length);

        let planeIndex = 0;

        while(planeIndex < this._planes.length)
        {
            const plane = this._planes[planeIndex];
            const sprite = this.getSprite(planeIndex);

            if(plane && sprite && plane.leftSide && plane.rightSide)
            {
                if((plane.type === RoomPlane.TYPE_WALL) && ((plane.leftSide.length < 1) || (plane.rightSide.length < 1)))
                {
                    sprite.alphaTolerance = AlphaTolerance.MATCH_NOTHING;
                }
                else
                {
                    sprite.alphaTolerance = AlphaTolerance.MATCH_OPAQUE_PIXELS;
                }

                if(plane.type === RoomPlane.TYPE_WALL)
                {
                    sprite.tag = 'plane.wall@' + (planeIndex + 1);
                }

                else if(plane.type === RoomPlane.TYPE_FLOOR)
                {
                    sprite.tag = 'plane.floor@' + (planeIndex + 1);
                }

                else
                {
                    sprite.tag = 'plane@' + (planeIndex + 1);
                }

                sprite.spriteType = RoomObjectSpriteType.ROOM_PLANE;

                if(this._roomPlaneParser.isPlaneTemporaryHighlighter(planeIndex))
                    {
                        if(this._highlightFilter) sprite.filters = [ this._highlightFilter ];
                        sprite.skipMouseHandling = true;
                        plane.extraDepth = -100;
                        plane.isHighlighter = true;
                    }
                    else
                    {
                        sprite.filters = [];
                        sprite.skipMouseHandling = false;
                        plane.extraDepth = 0;
                        plane.isHighlighter = false;
                    }
            }

            planeIndex++;
        }
    }

    private getLandscapeWidth(): number
    {
        let length = 0;
        let index = 0;

        while(index < this._roomPlaneParser.planeCount)
        {
            const type = this._roomPlaneParser.getPlaneType(index);

            if(type === RoomPlaneData.PLANE_LANDSCAPE)
            {
                const vector = this._roomPlaneParser.getPlaneLeftSide(index);

                length += vector.length;
            }

            index++;
        }

        return length;
    }

    private getLandscapeHeight(): number
    {
        let length = 0;
        let index = 0;

        while(index < this._roomPlaneParser.planeCount)
        {
            const type = this._roomPlaneParser.getPlaneType(index);

            if(type === RoomPlaneData.PLANE_LANDSCAPE)
            {
                const vector = this._roomPlaneParser.getPlaneRightSide(index);

                if(vector.length > length) length = vector.length;
            }

            index++;
        }

        if(length > 5) length = 5;

        return length;
    }

    protected updatePlaneTypes(floorType: string, wallType: string, landscapeType: string): boolean
    {
        if(floorType !== this._floorType) this._floorType = floorType;
        else floorType = null;

        if(wallType !== this._wallType) this._wallType = wallType;
        else wallType = null;

        if(landscapeType !== this._landscapeType) this._landscapeType = landscapeType;
        else landscapeType = null;

        if(!floorType && !wallType && !landscapeType) return false;

        let index = 0;

        while(index < this._planes.length)
        {
            const plane = this._planes[index];

            if(plane)
            {
                if((plane.type === RoomPlane.TYPE_FLOOR) && floorType)
                {
                    if(floorType.startsWith('#'))
                    {
                        const parts = floorType.split(':');

                        plane.customColor = parseInt(parts[0].replace('#', ''), 16);
                        
                        if(parts.length > 1) plane.customLineAlpha = parseInt(parts[1]);
                    }
                    else
                    {
                        plane.customColor = -1;
                        plane.id = floorType;
                    }
                }

                else if((plane.type === RoomPlane.TYPE_WALL) && wallType)
                {
                    if(wallType.startsWith('#'))
                    {
                        const parts = wallType.split(':');

                        plane.customColor = parseInt(parts[0].replace('#', ''), 16);
                        
                        if(parts.length > 1) plane.customLineAlpha = parseInt(parts[1]);
                    }
                    else
                    {
                        plane.customColor = -1;
                        plane.id = wallType;
                    }
                }

                else if((plane.type === RoomPlane.TYPE_LANDSCAPE) && landscapeType)
                {
                    plane.id = landscapeType;
                }
            }

            index++;
        }

        return true;
    }

    private updatePlaneVisibility(k: boolean, _arg_2: boolean, _arg_3: boolean): boolean
    {
        if((k === this._typeVisibility[RoomPlane.TYPE_FLOOR]) && (_arg_2 === this._typeVisibility[RoomPlane.TYPE_WALL]) && (_arg_3 === this._typeVisibility[RoomPlane.TYPE_LANDSCAPE])) return false;

        this._typeVisibility[RoomPlane.TYPE_FLOOR] = k;
        this._typeVisibility[RoomPlane.TYPE_WALL] = _arg_2;
        this._typeVisibility[RoomPlane.TYPE_LANDSCAPE] = _arg_3;

        this._visiblePlanes = [];
        this._visiblePlaneSpriteNumbers = [];

        return true;
    }

    protected updatePlanes(geometry: IRoomGeometry, geometryUpdate: boolean, timeSinceStartMs: number): boolean
    {
        if(!geometry || !this.object) return false;

        this._assetUpdateCounter++;

        if(geometryUpdate)
        {
            this._visiblePlanes = [];
            this._visiblePlaneSpriteNumbers = [];
        }

        const hasVisiblePlanes = (this._visiblePlanes.length > 0);

        let visiblePlanes = this._visiblePlanes;

        if(!this._visiblePlanes.length) visiblePlanes = this._planes;

        let depth = 0;
        let updated = false;
        let index = 0;

        while(index < visiblePlanes.length)
        {
            let id = index;

            if(hasVisiblePlanes) id = this._visiblePlaneSpriteNumbers[index];

            const sprite = this.getSprite(id);

            if(sprite)
            {
                const plane = visiblePlanes[index];

                if(plane)
                {
                    sprite.id = plane.uniqueId;

                    if(plane.update(geometry, timeSinceStartMs))
                    {
                        if(plane.visible)
                        {
                            depth = ((plane.relativeDepth + this.floorRelativeDepth) + (id / 1000));

                            if(plane.type !== RoomPlane.TYPE_FLOOR)
                            {
                                depth = ((plane.relativeDepth + this.wallRelativeDepth) + (id / 1000));

                                if((plane.leftSide.length < 1) || (plane.rightSide.length < 1))
                                {
                                    depth = (depth + (RoomVisualization.ROOM_DEPTH_OFFSET * 0.5));
                                }
                            }

                            this.updateSprite(sprite, geometry, plane, `plane ${ id } ${ geometry.scale }`, depth);
                        }

                        updated = true;
                    }

                    if(sprite.visible != ((plane.visible) && (this._typeVisibility[plane.type])))
                    {
                        sprite.visible = (!(sprite.visible));
                        updated = true;
                    }

                    if(sprite.visible)
                    {
                        if(!hasVisiblePlanes)
                        {
                            this._visiblePlanes.push(plane);
                            this._visiblePlaneSpriteNumbers.push(index);
                        }
                    }
                }
                else
                {
                    sprite.id = 0;

                    if(sprite.visible)
                    {
                        sprite.visible = false;
                        updated = true;
                    }
                }
            }

            index++;
        }

        return updated;
    }

    protected updatePlaneMasks(k: RoomMapMaskData): void
    {
        if(!k) return;

        this._roomPlaneBitmapMaskParser.initialize(k);

        const _local_4: number[] = [];
        const _local_5: number[] = [];

        let _local_6 = false;
        let index = 0;

        while(index < this._planes.length)
        {
            const plane = this._planes[index];

            if(plane)
            {
                plane.resetBitmapMasks();

                if(plane.type === RoomPlane.TYPE_LANDSCAPE) _local_4.push(index);
            }

            index++;
        }

        for(const mask of this._roomPlaneBitmapMaskParser.masks.values())
        {
            const maskType = this._roomPlaneBitmapMaskParser.getMaskType(mask);
            const maskLocation = this._roomPlaneBitmapMaskParser.getMaskLocation(mask);
            const maskCategory = this._roomPlaneBitmapMaskParser.getMaskCategory(mask);

            if(maskLocation)
            {
                let i = 0;

                while(i < this._planes.length)
                {
                    const plane = this._planes[i];

                    if((plane.type === RoomPlane.TYPE_WALL) || (plane.type === RoomPlane.TYPE_LANDSCAPE))
                    {
                        if(plane && plane.location && plane.normal)
                        {
                            const _local_14 = Vector3d.dif(maskLocation, plane.location);
                            const _local_15 = Math.abs(Vector3d.scalarProjection(_local_14, plane.normal));

                            if(_local_15 < 0.01)
                            {
                                if(plane.leftSide && plane.rightSide)
                                {
                                    const leftSideLoc = Vector3d.scalarProjection(_local_14, plane.leftSide);
                                    const rightSideLoc = Vector3d.scalarProjection(_local_14, plane.rightSide);

                                    if((plane.type === RoomPlane.TYPE_WALL) || ((plane.type === RoomPlane.TYPE_LANDSCAPE) && (maskCategory === RoomPlaneBitmapMaskData.HOLE)))
                                    {
                                        plane.addBitmapMask(maskType, leftSideLoc, rightSideLoc);
                                    }
                                    else
                                    {
                                        if(plane.type === RoomPlane.TYPE_LANDSCAPE)
                                        {
                                            if(!plane.canBeVisible) _local_6 = true;

                                            plane.canBeVisible = true;

                                            _local_5.push(i);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    i++;
                }
            }
        }

        index = 0;

        while(index < _local_4.length)
        {
            const planeIndex = _local_4[index];

            if(_local_5.indexOf(planeIndex) < 0)
            {
                const plane = this._planes[planeIndex];

                plane.canBeVisible = false;
                _local_6 = true;
            }

            index++;
        }

        if(_local_6)
        {
            this._visiblePlanes = [];
            this._visiblePlaneSpriteNumbers = [];
        }
    }

    private updateSprite(sprite: IRoomObjectSprite, geometry: IRoomGeometry, plane: RoomPlane, _arg_3: string, relativeDepth: number): void
    {
        const offset = plane.offset;

        sprite.offsetX = -(offset.x);
        sprite.offsetY = -(offset.y);
        sprite.relativeDepth = relativeDepth;
        sprite.color = plane.color;
        sprite.texture = plane.bitmapData;
        sprite.name = ((_arg_3 + '_') + this._assetUpdateCounter);
    }

    public getBoundingRectangle(): Rectangle
    {
        if(!this._boundingRectangle) this._boundingRectangle = super.getBoundingRectangle();

        return new Rectangle(this._boundingRectangle.x, this._boundingRectangle.y, this._boundingRectangle.width, this._boundingRectangle.height);
    }

    public get planes(): IRoomPlane[]
    {
        const planes: IRoomPlane[] = [];

        for(const plane of this._visiblePlanes) planes.push(plane);

        return planes;
    }

    public get floorRelativeDepth(): number
    {
        return RoomVisualization.ROOM_DEPTH_OFFSET + 0.1;
    }

    public get wallRelativeDepth(): number
    {
        return RoomVisualization.ROOM_DEPTH_OFFSET + 0.5;
    }
}
