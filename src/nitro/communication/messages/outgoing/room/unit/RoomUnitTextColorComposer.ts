import { IMessageComposer } from '../../../../../../api';

// Text Color
export class RoomUnitTextColorComposer implements IMessageComposer<[number]> {
    private _data: [number];

    constructor(colorId: number) {
        this._data = [colorId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void { }
}
