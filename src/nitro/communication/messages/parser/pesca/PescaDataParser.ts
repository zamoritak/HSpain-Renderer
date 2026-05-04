import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class PescaDataParser implements IMessageParser
{
    private _nivel: number;
    private _experiencia: number;
    private _creditos: number;
    private _usosCanaActual: number;
    private _capturasBota: number;
    private _capturasComun: number;
    private _capturasMisterioso: number;
    private _capturasRaro: number;
    private _capturasGusano: number;

    public flush(): boolean
    {
        this._nivel = 1;
        this._experiencia = 0;
        this._creditos = 0;
        this._usosCanaActual = 0;
        this._capturasBota = 0;
        this._capturasComun = 0;
        this._capturasMisterioso = 0;
        this._capturasRaro = 0;
        this._capturasGusano = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._nivel = wrapper.readInt();
        this._experiencia = wrapper.readInt();
        this._creditos = wrapper.readInt();
        this._usosCanaActual = wrapper.readInt();
        this._capturasBota = wrapper.readInt();
        this._capturasComun = wrapper.readInt();
        this._capturasMisterioso = wrapper.readInt();
        this._capturasRaro = wrapper.readInt();
        this._capturasGusano = wrapper.readInt();

        return true;
    }

    public get nivel(): number { return this._nivel; }
    public get experiencia(): number { return this._experiencia; }
    public get creditos(): number { return this._creditos; }
    public get usosCanaActual(): number { return this._usosCanaActual; }
    public get capturasBota(): number { return this._capturasBota; }
    public get capturasComun(): number { return this._capturasComun; }
    public get capturasMisterioso(): number { return this._capturasMisterioso; }
    public get capturasRaro(): number { return this._capturasRaro; }
    public get capturasGusano(): number { return this._capturasGusano; }
}
