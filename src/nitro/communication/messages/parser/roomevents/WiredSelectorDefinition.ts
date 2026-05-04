import { IMessageDataWrapper } from '../../../../../api';
import { Triggerable } from './Triggerable';

export class WiredSelectorDefinition extends Triggerable
{
    private _type: number;
    private _selectedUserIds: number[];  // ejemplo si tiene IDs de usuarios

    constructor(wrapper: IMessageDataWrapper)
    {
        super(wrapper);

        this._type = wrapper.readInt();

        // Leer más datos según la serialización del backend, ejemplo:
        const count = wrapper.readInt();
        this._selectedUserIds = [];

        for(let i = 0; i < count; i++)
        {
            this._selectedUserIds.push(wrapper.readInt());
        }
    }

    public get type(): number
    {
        return this._type;
    }

    public get selectedUserIds(): number[]
    {
        return this._selectedUserIds;
    }

    public get code(): number
    {
        return this._type;
    }
}
