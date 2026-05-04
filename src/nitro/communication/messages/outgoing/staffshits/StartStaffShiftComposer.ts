import { IMessageComposer } from '../../../../../api';

export class StartStaffShiftComposer implements IMessageComposer<ConstructorParameters<typeof StartStaffShiftComposer>>
{
    private _data: ConstructorParameters<typeof StartStaffShiftComposer>;

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
