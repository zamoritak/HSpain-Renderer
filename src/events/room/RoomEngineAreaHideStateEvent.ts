import { RoomEngineTriggerWidgetEvent } from './RoomEngineTriggerWidgetEvent';

export class RoomEngineAreaHideStateEvent extends RoomEngineTriggerWidgetEvent
{
    public static UPDATE_STATE_AREA_HIDE: string = 'REAHSE_UPDATE_STATE_AREA_HIDE';

    private _furniId: number;
    private _on: boolean;
    private _rootX: number;
    private _rootY: number;
    private _width: number;
    private _length: number;
    private _invert: boolean;
    private _invisibility: boolean;
    private _wallItems: boolean;
    private _blockWalking: boolean;
    private _alphaHide: boolean;

    constructor(roomId: number, furniId: number, category: number, on: boolean, rootX: number = 0, rootY: number = 0, width: number = 0, length: number = 0, invert: boolean = false, invisibility: boolean = false, wallItems: boolean = false, blockWalking: boolean = false, alphaHide: boolean = false)
    {
        super(RoomEngineAreaHideStateEvent.UPDATE_STATE_AREA_HIDE, roomId, furniId, category);

        this._furniId = furniId;
        this._on = on;
        this._rootX = rootX;
        this._rootY = rootY;
        this._width = width;
        this._length = length;
        this._invert = invert;
        this._invisibility = invisibility;
        this._wallItems = wallItems;
        this._blockWalking = blockWalking;
        this._alphaHide = alphaHide;
    }

    public get furniId(): number { return this._furniId; }
    public get on(): boolean { return this._on; }
    public get rootX(): number { return this._rootX; }
    public get rootY(): number { return this._rootY; }
    public get width(): number { return this._width; }
    public get length(): number { return this._length; }
    public get invert(): boolean { return this._invert; }
    public get invisibility(): boolean { return this._invisibility; }
    public get wallItems(): boolean { return this._wallItems; }
    public get blockWalking(): boolean { return this._blockWalking; }
    public get alphaHide(): boolean { return this._alphaHide; }
}
