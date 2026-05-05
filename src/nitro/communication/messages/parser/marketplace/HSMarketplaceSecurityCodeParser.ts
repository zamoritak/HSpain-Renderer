import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class HSMarketplaceSecurityCodeParser implements IMessageParser
{
    private _code: string = '';
    private _isLinked: boolean = false;
    private _discordUsername: string = '';
    private _discordAvatar: string = '';

    public flush(): boolean
    {
        this._code = '';
        this._isLinked = false;
        this._discordUsername = '';
        this._discordAvatar = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._code = wrapper.readString();
        this._isLinked = wrapper.readBoolean();
        this._discordUsername = wrapper.readString();
        this._discordAvatar = wrapper.readString();

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

    public get discordUsername(): string
    {
        return this._discordUsername;
    }

    public get discordAvatar(): string
    {
        return this._discordAvatar;
    }
}