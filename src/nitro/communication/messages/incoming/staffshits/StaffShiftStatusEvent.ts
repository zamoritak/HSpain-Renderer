import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { StaffShiftStatusParser } from '../../parser';

export class StaffShiftStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, StaffShiftStatusParser);
    }

    public getParser(): StaffShiftStatusParser
    {
        return this.parser as StaffShiftStatusParser;
    }
}
