import { IMessageComposer } from '../../../../../api';

export class HSMarketplaceSearchComposer implements IMessageComposer<any[]>
{
    private _data: any[] = [];

    constructor(query: string, minPrice: number, maxPrice: number, sortBy: number, ownOnly: boolean = false)
    {
        this._data = [query, minPrice, maxPrice, sortBy, ownOnly ? 1 : 0];
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