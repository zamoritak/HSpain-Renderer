import { IMessageComposer } from '../../../../../api';

export class StartFishingModeComposer implements IMessageComposer<ConstructorParameters<typeof StartFishingModeComposer>>
{
    private _data: ConstructorParameters<typeof StartFishingModeComposer>;

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
