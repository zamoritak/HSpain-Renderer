import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { UserFishingCanesParser } from '../../parser';


export class UserFishingCanesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserFishingCanesParser);
    }

    public getParser(): UserFishingCanesParser
    {
        return this.parser as UserFishingCanesParser;
    }
}
