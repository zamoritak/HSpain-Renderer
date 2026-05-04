import { IMessageComposer } from '../../../../../api';

export class PauseStaffShiftComposer implements IMessageComposer<ConstructorParameters<typeof PauseStaffShiftComposer>>
{
    private _data: ConstructorParameters<typeof PauseStaffShiftComposer>;

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
