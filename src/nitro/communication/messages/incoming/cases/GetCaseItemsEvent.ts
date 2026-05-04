//GetCaseItemsEvent.ts
import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GetCaseItemsParser } from '../../parser';

export class GetCaseItemsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callback: Function)
    {
        // Llama al constructor padre con el callback y el parser asociado
        super(callback, GetCaseItemsParser);
    }

    // Método para obtener el parser tipado correctamente
    public getParser(): GetCaseItemsParser
    {
        return this.parser as GetCaseItemsParser;
    }
}
