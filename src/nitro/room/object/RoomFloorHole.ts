export class RoomFloorHole
{
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _blockWalking: boolean;
    private _alphaHide: boolean;
    private _hideWallItems: boolean;
    private _invisibility: boolean;

    constructor(x: number, y: number, width: number, height: number, blockWalking: boolean = false, alphaHide: boolean = false, hideWallItems: boolean = false, invisibility: boolean = true)
    {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._blockWalking = blockWalking;
        this._alphaHide = alphaHide;
        this._hideWallItems = hideWallItems;
        this._invisibility = invisibility;
    }

    public get invisibility(): boolean
    {
        return this._invisibility;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    public get blockWalking(): boolean
    {
        return this._blockWalking;
    }

    public get alphaHide(): boolean
    {
        return this._alphaHide;
    }

    public get hideWallItems(): boolean
    {
        return this._hideWallItems;
    }
}
