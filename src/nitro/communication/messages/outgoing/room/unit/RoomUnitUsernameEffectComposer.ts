import { IMessageComposer } from '../../../../../../api';

export class RoomUnitUsernameEffectComposer implements IMessageComposer<[number]> {
    private _data: [number];

    constructor(effectId: number) {
        this._data = [effectId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void { }
}
