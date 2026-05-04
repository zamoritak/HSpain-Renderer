import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { StickerMessageData } from './StickerMessageData';

export class StickerMessageParser implements IMessageParser
{
    private _stickers: StickerMessageData[];

    public flush(): boolean
    {
        this._stickers = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalStickers = wrapper.readInt();

        while(totalStickers > 0)
        {
            this._stickers.push(new StickerMessageData(wrapper));
            totalStickers--;
        }

        return true;
    }

    public get stickers(): StickerMessageData[]
    {
        return this._stickers;
    }
}
