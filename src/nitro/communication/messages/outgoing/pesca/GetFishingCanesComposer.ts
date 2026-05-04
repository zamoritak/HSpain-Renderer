import { IMessageComposer } from '../../../../../api';

export class GetFishingCanesComposer implements IMessageComposer<[]>
{
    private _data: [];

    constructor()
    {
        this._data = [];
    }

    public getMessageArray(): []
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
