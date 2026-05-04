import { IMessageComposer } from '../../../../../../api';

export class RoomUnitBackgroundComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitBackgroundComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitBackgroundComposer>;

    constructor(
        backgroundImage: number,
        backgroundStand: number,
        backgroundOverlay: number,
        usernameIcon: number,
        usernameEffect: number,
        ornament: number,
        textColor: number,
    )
    {
        this._data = [
            backgroundImage,
            backgroundStand,
            backgroundOverlay,
            usernameIcon,
            usernameEffect,
            ornament,
            textColor,
        ];
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
