import { IMessageDataWrapper } from '../../../../../api';

export class StickerMessageData
{
    private _stickerId: string;
    private _stickerName: string;
    private _stickerUrl: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._stickerId = wrapper.readString();
        this._stickerName = wrapper.readString();
        this._stickerUrl = wrapper.readString();
    }

    public get stickerId(): string
    {
        return this._stickerId;
    }

    public get stickerName(): string
    {
        return this._stickerName;
    }

    public get stickerUrl(): string
    {
        return this._stickerUrl;
    }
}
