import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class OpenCaseConfirmParser implements IMessageParser
{
    private _caseId: number;
    private _caseName: string;
    private _price: number;
    private _currencyType: number;
    private _userBalance: number;
    private _success: boolean;
    private _message: string;

    public flush(): boolean
    {
        this._caseId = 0;
        this._caseName = '';
        this._price = 0;
        this._currencyType = 0;
        this._userBalance = 0;
        this._success = false;
        this._message = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._success = wrapper.readBoolean();       // <- Se espera que el servidor envíe un booleano
        this._caseId = wrapper.readInt();            // ID del case
        this._caseName = wrapper.readString();       // Nombre
        this._price = wrapper.readInt();             // Precio
        this._currencyType = wrapper.readInt();      // Tipo de moneda
        this._userBalance = wrapper.readInt();       // Saldo
        this._message = wrapper.readString();        // <- Mensaje opcional

        return true;
    }

    public get caseId(): number { return this._caseId; }
    public get caseName(): string { return this._caseName; }
    public get price(): number { return this._price; }
    public get currencyType(): number { return this._currencyType; }
    public get userBalance(): number { return this._userBalance; }
    public get success(): boolean { return this._success; }
    public get message(): string { return this._message; }
}
