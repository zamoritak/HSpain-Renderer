import { IMessageComposer } from '../../../../../../api';

export class RoomUnitOrnamentComposer implements IMessageComposer<[number]> {
    private _data: [number];

    constructor(ornamentId: number) {
        this._data = [ornamentId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void { }
}
