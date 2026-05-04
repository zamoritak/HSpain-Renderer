import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FishingCaptureParser } from '../../parser';

export class FishingCaptureEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FishingCaptureParser);
    }

    public getParser(): FishingCaptureParser
    {
        return this.parser as FishingCaptureParser;
    }
}
