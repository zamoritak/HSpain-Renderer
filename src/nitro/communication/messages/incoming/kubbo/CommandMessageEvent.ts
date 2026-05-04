import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CommandMessageParser } from '../../parser';

export class CommandMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommandMessageParser);
    }

    public getParser(): CommandMessageParser
    {
        return this.parser as CommandMessageParser;
    }
}
