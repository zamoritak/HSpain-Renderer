import { IMessageComposer } from '../../../../../../api';

export class UpdateBannerComposer implements IMessageComposer<ConstructorParameters<typeof UpdateBannerComposer>>
{
    private _data: ConstructorParameters<typeof UpdateBannerComposer>;

    constructor(bannerUrl: string)
    {
        this._data = [bannerUrl];
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
