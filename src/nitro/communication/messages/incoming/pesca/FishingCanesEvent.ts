import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FishingCanesParser } from '../../parser';


export class FishingCanesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FishingCanesParser);
    }

    public getParser(): FishingCanesParser
    {
        return this.parser as FishingCanesParser;
    }
}
