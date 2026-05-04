import { IMessageComposer } from '../../../../../api';

export class HSMarketplaceUpdateComposer implements IMessageComposer<any[]>
{
    private _data: any[] = [];

    constructor(listingId: number, credits: number, duckets: number, diamonds: number, allowOffers: boolean)
    {
        this._data = [listingId, credits, duckets, diamonds, allowOffers ? 1 : 0];
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