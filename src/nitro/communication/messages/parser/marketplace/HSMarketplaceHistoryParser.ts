import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class HSMarketplaceHistoryParser implements IMessageParser
{
    private _logs: any[] = [];

    public flush(): boolean
    {
        this._logs = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();

        this._logs = [];

        for(let i = 0; i < count; i++)
        {
            this._logs.push({
                id: wrapper.readInt(),
                listingId: wrapper.readInt(),
                itemBaseId: wrapper.readInt(),
                extraData: wrapper.readString(),
                title: wrapper.readString(),
                priceCredits: wrapper.readInt(),
                priceDuckets: wrapper.readInt(),
                priceDiamonds: wrapper.readInt(),
                type: wrapper.readInt(),
                timestamp: wrapper.readInt()
            });
        }

        return true;
    }

    public get logs(): any[]
    {
        return this._logs;
    }
}