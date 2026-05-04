import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HSMarketplaceOffersParser } from '../../parser';

export class HSMarketplaceOffersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HSMarketplaceOffersParser);
    }

    public get parser(): HSMarketplaceOffersParser
    {
        return super.parser as HSMarketplaceOffersParser;
    }

    public set parser(parser: HSMarketplaceOffersParser)
    {
        super.parser = parser;
    }
}