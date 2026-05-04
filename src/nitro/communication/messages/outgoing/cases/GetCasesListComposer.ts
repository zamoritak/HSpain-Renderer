import { IMessageComposer } from '../../../../../api';

export class GetCasesListComposer implements IMessageComposer<ConstructorParameters<typeof GetCasesListComposer>>
{
    private _data: ConstructorParameters<typeof GetCasesListComposer>;

    constructor()
    {
        this._data = [];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
