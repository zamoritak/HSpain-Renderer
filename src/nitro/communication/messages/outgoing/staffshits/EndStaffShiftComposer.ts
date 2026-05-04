import { IMessageComposer } from '../../../../../api';

export class EndStaffShiftComposer implements IMessageComposer<ConstructorParameters<typeof EndStaffShiftComposer>>
{
    private _data: ConstructorParameters<typeof EndStaffShiftComposer>;

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
