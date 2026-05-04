import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HSMarketplaceHistoryParser } from '../../parser';

export class HSMarketplaceHistoryEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HSMarketplaceHistoryParser);
    }

    public get parser(): HSMarketplaceHistoryParser
    {
        return super.parser as HSMarketplaceHistoryParser;
    }

    public set parser(parser: HSMarketplaceHistoryParser)
    {
        super.parser = parser;
    }
}