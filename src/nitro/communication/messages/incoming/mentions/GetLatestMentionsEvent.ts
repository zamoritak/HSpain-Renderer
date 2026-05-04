import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GetLatestMentionsParser } from '../../parser';

export class GetLatestMentionsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GetLatestMentionsParser);
    }

    public getParser(): GetLatestMentionsParser
    {
        return this.parser as GetLatestMentionsParser;
    }
}
