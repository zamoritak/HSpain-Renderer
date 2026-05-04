import { IMessageComposer } from '../../../../../api';

export class GetLatestMentionsComposer implements IMessageComposer<ConstructorParameters<typeof GetLatestMentionsComposer>>
{
    private _data: ConstructorParameters<typeof GetLatestMentionsComposer>;

    constructor()
    {
        this._data = [];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
