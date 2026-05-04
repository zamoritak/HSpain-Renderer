import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export interface IUserFishingCane
{
    caneId: number;
    name: string;
    rarity: string;
    quantity: number;
    currentUses: number;
    maxUses: number;
}

export class UserFishingCanesParser implements IMessageParser
{
    private _equippedCaneId: number = -1;
    private _canes: IUserFishingCane[] = [];

    public flush(): boolean
    {
        this._equippedCaneId = -1;
        this._canes = [];
        return true;
    }

    public get equippedCaneId(): number
    {
        return this._equippedCaneId;
    }

    public get canes(): IUserFishingCane[]
    {
        return this._canes;
    }

    public parse(bytes: IMessageDataWrapper): boolean
    {
        if (!bytes) return false;

        this._canes = [];
        this._equippedCaneId = bytes.readInt();
        const count = bytes.readInt();

        for (let i = 0; i < count; i++)
        {
            this._canes.push({
                caneId: bytes.readInt(),
                name: bytes.readString(),
                rarity: bytes.readString(),
                quantity: bytes.readInt(),
                currentUses: bytes.readInt(),
                maxUses: bytes.readInt()
            });
        }

        return true;
    }
}
