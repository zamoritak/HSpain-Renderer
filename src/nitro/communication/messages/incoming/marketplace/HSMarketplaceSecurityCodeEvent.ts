import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { HSMarketplaceSecurityCodeParser } from '../../parser';

export class HSMarketplaceSecurityCodeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HSMarketplaceSecurityCodeParser);
    }

    public get parser(): HSMarketplaceSecurityCodeParser
    {
        return super.parser as HSMarketplaceSecurityCodeParser;
    }

    public set parser(parser: HSMarketplaceSecurityCodeParser)
    {
        super.parser = parser;
    }
}