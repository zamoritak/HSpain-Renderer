import { IMessageDataWrapper } from '../../../../../api';

export class CommandMessageData
{
    private _commandId: string;
    private _commandDesc: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._commandId = wrapper.readString();
        this._commandDesc = wrapper.readString();
    }

    public get commandId(): string
    {
        return this._commandId;
    }

    public get commandDesc(): string
    {
        return this._commandDesc;
    }
}
