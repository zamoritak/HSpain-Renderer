import { IMessageComposer } from '../../../../../../api';

export class RoomUnitUsernameIconComposer implements IMessageComposer<[number]> {
    private _data: [number];

    constructor(iconId: number) {
        this._data = [iconId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void { }
}
