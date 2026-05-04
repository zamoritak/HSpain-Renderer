import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class FishingCaptureParser implements IMessageParser
{
    private _userId: number;
    private _catchType: string;

    public flush(): boolean
    {
        this._userId = -1;
        this._catchType = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        this._catchType = wrapper.readString();

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get catchType(): string
    {
        return this._catchType;
    }
}
