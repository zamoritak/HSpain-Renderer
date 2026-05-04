import { IMessageDataWrapper } from '../../../../../api';
import { Triggerable } from './Triggerable';

export class WiredActionDefinition extends Triggerable
{
    private _type: number;
    private _delayInPulses: number;
    private _conflictingTriggers: number[];

    constructor(wrapper: IMessageDataWrapper)
    {
        super(wrapper);

        this._conflictingTriggers = [];
        this._type = wrapper.readInt();
        this._delayInPulses = wrapper.readInt();

        const conflictCount = wrapper.readInt();
        for(let i = 0; i < conflictCount; i++) {
            this._conflictingTriggers.push(wrapper.readInt());
        }
    }

    public get type(): number
    {
        return this._type;
    }

    public get code(): number
    {
        return this._type;
    }

    public get delayInPulses(): number
    {
        return this._delayInPulses;
    }

    public get conflictingTriggers(): number[]
    {
        return this._conflictingTriggers;
    }

    // Para acceder a intParams de Triggerable, usa el getter público 'intData'
    public get intParams(): number[] {
        return this.intData;
    }
}
