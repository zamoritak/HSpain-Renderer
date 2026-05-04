import { IMessageComposer } from '../../../../../api';

export class HSMarketplaceAcceptOfferComposer implements IMessageComposer<any[]>
{
    private _data: any[] = [];

    constructor(offerId: number)
    {
        this._data = [offerId];
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