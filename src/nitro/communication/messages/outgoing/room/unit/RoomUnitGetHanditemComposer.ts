import { IMessageComposer } from '../../../../../../api';

export class RoomUnitGetHanditemComposer implements IMessageComposer<[]> // sin parámetros
{
    public getMessageArray(): []
    {
        return [];
    }

    public dispose(): void
    {
        return;
    }
}
