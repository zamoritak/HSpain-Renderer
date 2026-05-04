import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HSMarketplaceDashboardParser } from '../../parser';

export class HSMarketplaceDashboardEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HSMarketplaceDashboardParser);
    }

    public get parser(): HSMarketplaceDashboardParser
    {
        return super.parser as HSMarketplaceDashboardParser;
    }

    public set parser(parser: HSMarketplaceDashboardParser)
    {
        super.parser = parser;
    }
}