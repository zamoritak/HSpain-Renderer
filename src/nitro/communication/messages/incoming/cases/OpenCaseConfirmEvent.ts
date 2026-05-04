import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { OpenCaseConfirmParser } from '../../parser';

export class OpenCaseConfirmEvent extends MessageEvent implements IMessageEvent
{
    constructor(callback: Function)
    {
        super(callback, OpenCaseConfirmParser);
    }

    public getParser(): OpenCaseConfirmParser
    {
        return this.parser as OpenCaseConfirmParser;
    }
}
