import { IMessageComposer } from '../../../../../api';

export class HSMarketplaceHistoryComposer implements IMessageComposer<any[]>
{
    private _data: any[] = [];

    constructor()
    {
        this._data = [];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        this._data = [];
    }
}