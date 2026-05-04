import { IMessageComposer } from '../../../../../api';

export class HSMarketplaceCancelComposer implements IMessageComposer<any[]>
{
    private _data: any[] = [];

    constructor(listingId: number)
    {
        this._data = [listingId];
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