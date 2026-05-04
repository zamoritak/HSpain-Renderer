import { IMessageComposer } from '../../../../../api';

export class StopFishingModeComposer implements IMessageComposer<ConstructorParameters<typeof StopFishingModeComposer>>
{
    private _data: ConstructorParameters<typeof StopFishingModeComposer>;

    constructor()
    {
        this._data = [];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
