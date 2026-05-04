import { IMessageComposer } from '../../../../../api';
import { OutgoingHeader } from '../OutgoingHeader';

export class GetPescaDataComposer implements IMessageComposer<[]>
{
    private _data: any[] = [];

    constructor()
    {
    }

    public getMessageArray(): []
    {
        return [];
    }

    public dispose(): void
    {
    }

    public get header(): number
    {
        return OutgoingHeader.PESCA_GET_DATA;
    }
}
