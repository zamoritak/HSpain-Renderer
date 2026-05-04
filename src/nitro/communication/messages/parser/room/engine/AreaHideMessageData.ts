import { IMessageDataWrapper, IRoomMapHoleData } from '../../../../../../api';

export class AreaHideMessageData implements IRoomMapHoleData
{
    private _furniId: number;
    private _on: boolean;
    private _rootX: number;
    private _rootY: number;
    private _width: number;
    private _length: number;
    private _invisibility: boolean;
    private _wallItems: boolean;
    private _invert: boolean;
    private _canWalk: boolean;
    private _alphaHide: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._furniId = wrapper.readInt();
        this._on = wrapper.readBoolean();
        this._rootX = wrapper.readInt();
        this._rootY = wrapper.readInt();
        this._width = wrapper.readInt();
        this._length = wrapper.readInt();
        this._invisibility = wrapper.readBoolean();
        this._wallItems = wrapper.readBoolean();
        this._invert = wrapper.readBoolean();
        this._canWalk = wrapper.readBoolean(); // chorizo conexión
        this._alphaHide = wrapper.readBoolean();
    }

    public get furniId(): number
    {
        return this._furniId;
    }

    public get on(): boolean
    {
        return this._on;
    }

    public get rootX(): number
    {
        return this._rootX;
    }

    public get rootY(): number
    {
        return this._rootY;
    }

    public get width(): number
    {
        return this._width;
    }

    public get length(): number
    {
        return this._length;
    }

    public get invisibility(): boolean
    {
        return this._invisibility;
    }

    public get wallItems(): boolean
    {
        return this._wallItems;
    }

    public get invert(): boolean
    {
        return this._invert;
    }

    public get blockWalking(): boolean
    {
        return this._canWalk; // chorizo
    }

    public get alphaHide(): boolean
    {
        return this._alphaHide;
    }

    public get id(): number
    {
        return this._furniId;
    }

    public get x(): number
    {
        return this._rootX;
    }

    public get y(): number
    {
        return this._rootY;
    }

    public get height(): number
    {
        return this._length;
    }

    public get hideWallItems(): boolean
    {
        return this._wallItems;
    }
}
