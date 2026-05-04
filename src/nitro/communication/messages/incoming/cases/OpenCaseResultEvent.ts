import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { OpenCaseResultParser } from '../../parser';

export class OpenCaseResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callback: Function)
    {
        super(callback, OpenCaseResultParser);
    }

    public getParser(): OpenCaseResultParser
    {
        return this.parser as OpenCaseResultParser;
    }
}
