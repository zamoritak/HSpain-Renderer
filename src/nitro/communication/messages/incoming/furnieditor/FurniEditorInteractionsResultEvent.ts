import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FurniEditorInteractionsResultMessageParser } from '../../parser';

export class FurniEditorInteractionsResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurniEditorInteractionsResultMessageParser);
    }

    public getParser(): FurniEditorInteractionsResultMessageParser
    {
        return this.parser as FurniEditorInteractionsResultMessageParser;
    }
}
