// GetCaseItemsComposer.ts
import { IMessageComposer } from '../../../../../api';

export class GetCaseItemsComposer implements IMessageComposer<ConstructorParameters<typeof GetCaseItemsComposer>>
{
    private _data: ConstructorParameters<typeof GetCaseItemsComposer>;

    constructor(caseId: number)
    {
        this._data = [caseId];
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
