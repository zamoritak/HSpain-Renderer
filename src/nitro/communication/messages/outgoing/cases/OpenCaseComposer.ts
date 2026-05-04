import { IMessageComposer } from '../../../../../api';

export class OpenCaseComposer implements IMessageComposer<any[]>
{
    private _data: any[];

    constructor(caseId: number, confirm: boolean = false)
    {
        this._data = [caseId, confirm];
    }

    dispose(): void
    {
        this._data = null;
    }

    getMessageArray(): any[]
    {
        return this._data;
    }
}
