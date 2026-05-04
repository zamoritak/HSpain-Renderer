import { IMessageComposer } from '../../../../../api';

export class HSMarketplacePostItemComposer implements IMessageComposer<any[]>
{
    private _data: any[] = [];

    constructor(itemId: number, credits: number, duckets: number, diamonds: number, allowOffers: boolean, title: string)
    {
        this._data = [itemId, credits, duckets, diamonds, allowOffers, title];
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