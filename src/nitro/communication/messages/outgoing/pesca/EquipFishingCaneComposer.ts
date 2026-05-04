import { IMessageComposer } from '../../../../../api';

export class EquipFishingCaneComposer implements IMessageComposer<ConstructorParameters<typeof EquipFishingCaneComposer>>
{
    private _data: ConstructorParameters<typeof EquipFishingCaneComposer>;

    constructor(caneId: number)
    {
        this._data = [ caneId ];
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
