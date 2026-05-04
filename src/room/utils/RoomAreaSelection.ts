import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import { IRoomAreaSelectionManager, IRoomEngine, IRoomObject, RoomObjectVariable } from '../../api';
import { RoomEngineObjectEvent, RoomObjectMouseEvent, RoomObjectTileMouseEvent } from '../../events';
import { FurnitureVisualization, RoomVisualization } from '../../nitro/room/object';
import { GetTicker } from '../../pixi-proxy';

export class RoomAreaSelectionManager implements IRoomAreaSelectionManager
{
    public static NOT_ACTIVE: number = 0;
    public static NOT_SELECTING_AREA: number = 1;
    public static AWAITING_MOUSE_DOWN: number = 2;
    public static SELECTING: number = 3;
    public static HIGHLIGHT_DARKEN = 'highlight_darken';
    public static HIGHLIGHT_BRIGHTEN = 'highlight_brighten';
    public static HIGH_LIGHT_NEW = 'highlight_new';
    public static HIGH_GREEN = 'highlight_green';
    public static HIGHLIGHT_BLUE = 'highlight_blue';
    public static RANK = false;

    public static HIGHLIGHT_FILTERS: { [key: string]: ColorMatrixFilter } = {};

    private _roomEngine: IRoomEngine = null;
    private _state: number = RoomAreaSelectionManager.NOT_ACTIVE;
    private _tileXInit: number = 0;
    private _tileYInit: number = 0;
    private _tileXEnd: number = 0;
    private _tileYEnd: number = 0;
    private _highlightRootX: number = 0;
    private _highlightRootY: number = 0;
    private _highlightWidth: number = 0;
    private _highlightHeight: number = 0;
    private _callback: (rootX: number, rootY: number, width: number, height: number) => void;
    private _highlightType: string = RoomAreaSelectionManager.HIGH_LIGHT_NEW;
    private _originalMaxFPS: number = -1;
    private _excludeObjectId: number = -1;
    private _disableShift: boolean = false;

    constructor(roomEngine: IRoomEngine)
    {
        this._roomEngine = roomEngine;

        this._roomEngine.events.addEventListener<RoomEngineObjectEvent>(RoomEngineObjectEvent.ADDED, event =>
        {
            if(this._state === RoomAreaSelectionManager.NOT_ACTIVE) return;

            if(event.roomId !== this._roomEngine.activeRoomId) return;

            if(event.category !== 10 && event.category !== 20) return;

            const roomObject = this._roomEngine.getRoomObject(event.roomId, event.objectId, event.category);

            if(roomObject.visualization instanceof FurnitureVisualization) roomObject.visualization.lookThrough = true;
        });

        const brightenFilter = new ColorMatrixFilter();

        brightenFilter.matrix = [
            1.5, 0, 0, 0,
            0, 1.5, 0, 0,
            0, 0, 1.5, 0,
            0, 0, 0, 1,
            0, 0.0784, 0.0784, 0];

        const proFilter = new ColorMatrixFilter();

        proFilter.matrix = [
            0.5, 0, 0, 0, 0,
            0.5, 0, 0, 0, 0,
            0.5, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ];

        const darkenFilter = new ColorMatrixFilter();

        darkenFilter.matrix = [
            0.55, 0, 0, 0,
            0, 0.55, 0, 0,
            0, 0, 0.55, 0,
            0, 0, 0, 1,
            -0.0392, -0.0392, -0.0392, 0];

        const dropColor = new ColorMatrixFilter();

        dropColor.matrix = [
            0.3, 0, 0, 0, 0,
            0.8, 0, 0, 0, 0,
            0.3, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ];

        RoomAreaSelectionManager.HIGHLIGHT_FILTERS[RoomAreaSelectionManager.HIGHLIGHT_DARKEN] = darkenFilter;
        RoomAreaSelectionManager.HIGHLIGHT_FILTERS[RoomAreaSelectionManager.HIGHLIGHT_BRIGHTEN] = brightenFilter;
        RoomAreaSelectionManager.HIGHLIGHT_FILTERS[RoomAreaSelectionManager.HIGH_LIGHT_NEW] = proFilter;
        RoomAreaSelectionManager.HIGHLIGHT_FILTERS[RoomAreaSelectionManager.HIGH_GREEN] = dropColor;

        const blueFilter = new ColorMatrixFilter();

        blueFilter.matrix = [
            0.4, 0, 0, 0, 0,
            0, 0.4, 0, 0, 0,
            0, 0, 1.5, 0, 80,
            0, 0, 0, 1, 0
        ];

        RoomAreaSelectionManager.HIGHLIGHT_FILTERS[RoomAreaSelectionManager.HIGHLIGHT_BLUE] = blueFilter;
    }

    private getAllFurniture(): IRoomObject[]
    {
        return this._roomEngine.getRoomObjects(this._roomEngine.activeRoomId, 20).concat(this._roomEngine.getRoomObjects(this._roomEngine.activeRoomId, 10));
    }

    private setHighPerformance(): void
    {
        if (this._originalMaxFPS !== -1) return;

        this._originalMaxFPS = GetTicker().maxFPS;
        GetTicker().maxFPS = 0;

        const roomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, -1, 0);
        if (roomObject) roomObject.model.setValue(RoomObjectVariable.ROOM_SELECTION_ACTIVE, 1);
    }

    private restorePerformance(): void
    {
        if (this._originalMaxFPS === -1) return;

        GetTicker().maxFPS = this._originalMaxFPS;
        this._originalMaxFPS = -1;

        const roomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, -1, 0);
        if (roomObject) roomObject.model.setValue(RoomObjectVariable.ROOM_SELECTION_ACTIVE, 0);
    }
    
    public startSelecting(): void {
        if (this._state === RoomAreaSelectionManager.NOT_SELECTING_AREA) {
            this.setHighPerformance();
            
            this.clearHighlightSilent();
            this._state = RoomAreaSelectionManager.AWAITING_MOUSE_DOWN;
            this._roomEngine.moveBlocked = true;
        }
    }

    public handleTileMouseEvent(event: RoomObjectTileMouseEvent): void
    {
        let isWaitingForMouseDown = ((this._state === RoomAreaSelectionManager.AWAITING_MOUSE_DOWN) && (event.type == RoomObjectMouseEvent.MOUSE_DOWN));

        if(!this._disableShift && event.shiftKey && (this._state === RoomAreaSelectionManager.NOT_SELECTING_AREA) && (event.type == RoomObjectMouseEvent.MOUSE_DOWN))
        {
            this.startSelecting();

            isWaitingForMouseDown = true;
        };

        if(isWaitingForMouseDown)
        {
            this._state = RoomAreaSelectionManager.SELECTING;
            this._tileXInit = event.tileXAsInt;
            this._tileYInit = event.tileYAsInt;
            this._tileXEnd = event.tileXAsInt;
            this._tileYEnd = event.tileYAsInt;
            this.setHighlight(this._tileXInit, this._tileYInit, 1, 1);

            return;
        }

        if((this._state === RoomAreaSelectionManager.SELECTING) && (event.type === RoomObjectMouseEvent.MOUSE_MOVE))
        {
            if((event.tileXAsInt !== this._tileXEnd) || (event.tileYAsInt !== this._tileYEnd))
            {
                let rootX: number = 0;
                let rootY: number = 0;
                let width: number = 0;
                let height: number = 0;

                this._tileXEnd = event.tileXAsInt;
                this._tileYEnd = event.tileYAsInt;

                if(this._tileXEnd > this._tileXInit)
                {
                    rootX = this._tileXInit;
                    width = ((this._tileXEnd - this._tileXInit) + 1);
                }
                else
                {
                    rootX = this._tileXEnd;
                    width = ((this._tileXInit - this._tileXEnd) + 1);
                };

                if(this._tileYEnd > this._tileYInit)
                {
                    rootY = this._tileYInit;
                    height = ((this._tileYEnd - this._tileYInit) + 1);
                }
                else
                {
                    rootY = this._tileYEnd;
                    height = ((this._tileYInit - this._tileYEnd) + 1);
                };

                this.setHighlight(rootX, rootY, width, height);
            };
        }

        if((this._state === RoomAreaSelectionManager.SELECTING) && (event.type === RoomObjectMouseEvent.MOUSE_UP))
        {
            this.finishSelecting();
        }
    }

    public finishSelecting(): boolean
    {
        if(this._state !== RoomAreaSelectionManager.SELECTING) return false;

        this._state = RoomAreaSelectionManager.NOT_SELECTING_AREA;

        this._roomEngine.moveBlocked = false;

        if(this._callback) this._callback(this._highlightRootX, this._highlightRootY, this._highlightWidth, this._highlightHeight);

        this.restorePerformance();

        return true;
    }

    private clearHighlightSilent():void
    {
        const roomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, -1, 0);

        if(!roomObject) return;
        RoomAreaSelectionManager.RANK = true;
        (roomObject.visualization as RoomVisualization)?.clearHighlightArea();
    }

    public clearHighlight(): void
    {
        if(this._state === RoomAreaSelectionManager.NOT_ACTIVE) return;

        this.clearHighlightSilent();

        this._state = RoomAreaSelectionManager.NOT_SELECTING_AREA;

        this._roomEngine.moveBlocked = false;

        this.restorePerformance();

        if(this._callback) this._callback(0, 0, 0, 0);
    }

    public setHighlight(rootX: number, rootY: number, width: number, height: number): void
    {
        if(this._state === RoomAreaSelectionManager.NOT_ACTIVE) return;

        this._highlightRootX = rootX;
        this._highlightRootY = rootY;
        this._highlightWidth = width;
        this._highlightHeight = height;

        const roomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, -1, 0);

        if(!roomObject) return;

        (roomObject.visualization as RoomVisualization)?.initializeHighlightArea(rootX, rootY, width, height, RoomAreaSelectionManager.HIGHLIGHT_FILTERS[this._highlightType]);     
    }

    public activate(callback: (rootX: number, rootY: number, width: number, height: number) => void, highlightType: string, objectId: number = -1, disableShift: boolean = false): boolean {
        if (this._state !== RoomAreaSelectionManager.NOT_ACTIVE) {
            this._callback = callback;
            this._highlightType = highlightType;
            this._disableShift = disableShift;

            if (this._excludeObjectId !== objectId) {
                if (this._excludeObjectId > -1) {
                    const oldObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, this._excludeObjectId, 20) || this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, this._excludeObjectId, 10);
                    if (oldObject && oldObject.visualization instanceof FurnitureVisualization) oldObject.visualization.lookThrough = true;
                }

                this._excludeObjectId = objectId;

                if (this._excludeObjectId > -1) {
                    const newObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, this._excludeObjectId, 20) || this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, this._excludeObjectId, 10);
                    if (newObject && newObject.visualization instanceof FurnitureVisualization) newObject.visualization.lookThrough = false;
                }
            }
            return true;
        }

        this._callback = callback;
        this._highlightType = highlightType;
        this._excludeObjectId = objectId;
        this._disableShift = disableShift;

        for (const roomObject of this.getAllFurniture()) {
            if (this._excludeObjectId > -1 && roomObject.id === this._excludeObjectId) continue;

            const visualization = roomObject.visualization as FurnitureVisualization;

            if (visualization) {
                visualization.lookThrough = true;
            }
        }

        this.setHighPerformance();

        this._state = RoomAreaSelectionManager.NOT_SELECTING_AREA;
        return true;
    }

    public deactivate(): void
    {
        if(this._state === RoomAreaSelectionManager.NOT_ACTIVE) return;

        this._callback = null;

        for(const roomObject of this.getAllFurniture())
        {
            if(this._excludeObjectId > -1 && roomObject.id === this._excludeObjectId) continue;

            const visualization = (roomObject.visualization as FurnitureVisualization);

            if(visualization) visualization.lookThrough = false;
        };

        this._excludeObjectId = -1;
        this._disableShift = false;

        this.restorePerformance();

        this.clearHighlight();

        this._state = RoomAreaSelectionManager.NOT_ACTIVE;
    }

    public get areaSelectionState(): number
    {
        return this._state;
    }
}
