import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class HSMarketplaceListingsParser implements IMessageParser
{
    private _listings: any[] = [];

    public flush(): boolean
    {
        this._listings = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();

        this._listings = [];

        for(let i = 0; i < count; i++)
        {
            this._listings.push({
                id: wrapper.readInt(),
                userId: wrapper.readInt(),
                itemId: wrapper.readInt(),
                itemBaseId: wrapper.readInt(),
                extraData: wrapper.readString(),
                title: wrapper.readString(),
                priceCredits: wrapper.readInt(),
                priceDuckets: wrapper.readInt(),
                priceDiamonds: wrapper.readInt(),
                allowOffers: wrapper.readBoolean(),
                state: wrapper.readInt(),
                createdAt: wrapper.readInt(),
                username: wrapper.readString(),
                figure: wrapper.readString()
            });
        }

        return true;
    }

    public get listings(): any[]
    {
        return this._listings;
    }
}