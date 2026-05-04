import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GetCasesListParser } from '../../parser';

export class GetCasesListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GetCasesListParser);
    }

    public getParser(): GetCasesListParser
    {
        return this.parser as GetCasesListParser;
    }
}
