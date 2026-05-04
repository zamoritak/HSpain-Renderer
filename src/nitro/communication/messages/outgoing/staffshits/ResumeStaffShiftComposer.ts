import { IMessageComposer } from '../../../../../api';

export class ResumeStaffShiftComposer implements IMessageComposer<ConstructorParameters<typeof ResumeStaffShiftComposer>>
{
    private _data: ConstructorParameters<typeof ResumeStaffShiftComposer>;

    constructor()
    {
        this._data = [];
    }

    public dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
