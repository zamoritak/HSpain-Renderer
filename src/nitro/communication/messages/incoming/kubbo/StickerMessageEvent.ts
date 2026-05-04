import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { StickerMessageParser } from '../../parser';

export class StickerMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, StickerMessageParser);
    }

    public getParser(): StickerMessageParser
    {
        return this.parser as StickerMessageParser;
    }
}
