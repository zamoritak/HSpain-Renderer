import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class HSMarketplaceOffersParser implements IMessageParser
{
    private _offers: any[] = [];

    public flush(): boolean
    {
        this._offers = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();

        this._offers = [];

        for(let i = 0; i < count; i++)
        {
            this._offers.push({
                id: wrapper.readInt(),
                listingId: wrapper.readInt(),
                userId: wrapper.readInt(),
                amountCredits: wrapper.readInt(),
                amountDuckets: wrapper.readInt(),
                amountDiamonds: wrapper.readInt(),
                state: wrapper.readInt(),
                createdAt: wrapper.readInt(),
                title: wrapper.readString(),
                itemBaseId: wrapper.readInt(),
                username: wrapper.readString(),
                figure: wrapper.readString()
            });
        }

        return true;
    }

    public get offers(): any[]
    {
        return this._offers;
    }
}