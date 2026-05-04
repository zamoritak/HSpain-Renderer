import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HSMarketplaceListingsParser } from '../../parser';

export class HSMarketplaceListingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HSMarketplaceListingsParser);
    }

    public get parser(): HSMarketplaceListingsParser
    {
        return super.parser as HSMarketplaceListingsParser;
    }

    public set parser(parser: HSMarketplaceListingsParser)
    {
        super.parser = parser;
    }
}