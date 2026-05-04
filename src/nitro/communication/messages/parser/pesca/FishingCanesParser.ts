import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export interface IFishingCane
{
    id: number;
    name: string;
    description: string;
    priceCredits: number;
    uses: number;
    levelRequired: number;
    rarity: string;
}

export class FishingCanesParser implements IMessageParser
{
    private _canes: IFishingCane[] = [];

    public flush(): boolean
    {
        this._canes = [];
        return true;
    }

    public get canes(): IFishingCane[]
    {
        return this._canes;
    }

    public parse(bytes: IMessageDataWrapper): boolean
    {
        if (!bytes) return false;
        
        const count = bytes.readInt();
        this._canes = [];

        for (let i = 0; i < count; i++)
        {
            this._canes.push({
                id: bytes.readInt(),
                name: bytes.readString(),
                description: bytes.readString(),
                priceCredits: bytes.readInt(),
                uses: bytes.readInt(),
                levelRequired: bytes.readInt(),
                rarity: bytes.readString()
            });
        }

        return true;
    }
}
