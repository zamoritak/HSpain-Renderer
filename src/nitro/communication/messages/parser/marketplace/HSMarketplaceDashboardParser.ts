import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class HSMarketplaceDashboardParser implements IMessageParser
{
    private _totalSales: number = 0;
    private _totalRevenueCredits: number = 0;
    private _totalRevenueDuckets: number = 0;
    private _totalRevenueDiamonds: number = 0;
    private _reputation: number = 0;
    private _activeListings: number = 0;

    public flush(): boolean
    {
        this._totalSales = 0;
        this._totalRevenueCredits = 0;
        this._totalRevenueDuckets = 0;
        this._totalRevenueDiamonds = 0;
        this._reputation = 0;
        this._activeListings = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._totalSales = wrapper.readInt();
        this._totalRevenueCredits = wrapper.readInt();
        this._totalRevenueDuckets = wrapper.readInt();
        this._totalRevenueDiamonds = wrapper.readInt();
        this._reputation = parseFloat(wrapper.readString());
        this._activeListings = wrapper.readInt();

        return true;
    }

    public get totalSales(): number
    {
        return this._totalSales;
    }

    public get totalRevenueCredits(): number
    {
        return this._totalRevenueCredits;
    }

    public get totalRevenueDuckets(): number
    {
        return this._totalRevenueDuckets;
    }

    public get totalRevenueDiamonds(): number
    {
        return this._totalRevenueDiamonds;
    }

    public get reputation(): number
    {
        return this._reputation;
    }

    public get activeListings(): number
    {
        return this._activeListings;
    }
}