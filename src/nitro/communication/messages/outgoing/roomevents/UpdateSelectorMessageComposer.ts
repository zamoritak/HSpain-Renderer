import { IMessageComposer } from '../../../../../api';

export class UpdateSelectorMessageComposer implements IMessageComposer<unknown[]>
{
    private _data: unknown[];

    constructor(id: number, ints: number[], string: string, stuffs: number[], delay: number, selectionCode: number)
    {
        this._data = [id, ints.length, ...ints, string, stuffs.length, ...stuffs, delay, selectionCode];
    }

    public getMessageArray(): unknown[]
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
        }
}
