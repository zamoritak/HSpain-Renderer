import { IMessageComposer } from '../../../../../api';

export class HSMarketplaceOfferComposer implements IMessageComposer<any[]>
{
    private _data: any[] = [];

    constructor(listingId: number, credits: number, duckets: number, diamonds: number)
    {
        this._data = [listingId, credits, duckets, diamonds];
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