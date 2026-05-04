import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class HSMarketplaceSecurityCodeParser implements IMessageParser
{
    private _code: string = '';
    private _isLinked: boolean = false;

    public flush(): boolean
    {
        this._code = '';
        this._isLinked = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._code = wrapper.readString();
        this._isLinked = wrapper.readBoolean();

        return true;
    }

    public get code(): string
    {
        return this._code;
    }

    public get isLinked(): boolean
    {
        return this._isLinked;
    }
}