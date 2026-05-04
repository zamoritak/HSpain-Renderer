import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FurniEditorSearchResultMessageParser } from '../../parser';

export class FurniEditorSearchResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurniEditorSearchResultMessageParser);
    }

    public getParser(): FurniEditorSearchResultMessageParser
    {
        return this.parser as FurniEditorSearchResultMessageParser;
    }
}
