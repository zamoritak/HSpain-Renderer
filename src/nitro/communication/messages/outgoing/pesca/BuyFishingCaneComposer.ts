import { IMessageComposer } from '../../../../../api';

export class BuyFishingCaneComposer implements IMessageComposer<[caneId: number]>
{
    private _caneId: number;

    constructor(caneId: number)
    {
        this._caneId = caneId;
    }

    public getMessageArray(): [caneId: number]
    {
        return [this._caneId];
    }

    public dispose(): void
    {
        return;
    }
}
