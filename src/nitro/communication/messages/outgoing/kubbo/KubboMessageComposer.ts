import { IMessageComposer } from '../../../../../api';

export class KubboMessageComposer implements IMessageComposer<ConstructorParameters<typeof KubboMessageComposer>>
{
    private _data: ConstructorParameters<typeof KubboMessageComposer>;

    constructor(message: string)
    {
        this._data = [message];
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
