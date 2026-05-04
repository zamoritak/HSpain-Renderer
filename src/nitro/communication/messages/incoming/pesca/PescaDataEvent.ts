import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { PescaDataParser } from '../../parser';


export class PescaDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PescaDataParser);
    }

    public getParser(): PescaDataParser
    {
        return this.parser as PescaDataParser;
    }
}
