import { IMessageComposer } from '../../../../../api';

export class GetStaffShiftStatusComposer implements IMessageComposer<ConstructorParameters<typeof GetStaffShiftStatusComposer>>
{
    private _data: ConstructorParameters<typeof GetStaffShiftStatusComposer>;

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
