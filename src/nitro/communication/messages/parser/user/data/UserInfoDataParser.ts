import { IMessageDataWrapper } from '../../../../../../api';

export class UserInfoDataParser
{
    private _userId: number;
    private _username: string;
    private _figure: string;
    private _gender: string;
    private _motto: string;
    private _realName: string;
    private _directMail: boolean;
    private _respectsReceived: number;
    private _respectsRemaining: number;
    private _respectsPetRemaining: number;
    private _streamPublishingAllowed: boolean;
    private _lastAccessDate: string;
    private _canChangeName: boolean;
    private _safetyLocked: boolean;
    private _nivelPesca: number;
    private _expPesca: number;
    private _creditosPesca: number;
    private _usosCañaPesca: number;
    private _capturasBotas: number;
    private _capturasComunPesca: number;
    private _capturasMisterioso: number;
    private _capturasRaro: number;
    private _capturasGusano: number;
    private _jailEndTime: number;
    private _jailStaffLook: string;
    private _jailStaffName: string;
    private _hotelState: string;
    private _hotelEventEndTime: number;
    private _onlineTime: number;
    private _reward10hClaimed: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._userId = 0;
        this._username = null;
        this._figure = null;
        this._gender = null;
        this._motto = null;
        this._realName = null;
        this._directMail = false;
        this._respectsReceived = 0;
        this._respectsRemaining = 0;
        this._respectsPetRemaining = 0;
        this._streamPublishingAllowed = false;
        this._lastAccessDate = null;
        this._canChangeName = false;
        this._safetyLocked = false;
        this._nivelPesca = 0;
        this._expPesca = 0;
        this._creditosPesca = 0;
        this._usosCañaPesca = 8;
        this._capturasBotas = 0;
        this._capturasComunPesca = 0;
        this._capturasMisterioso = 0;
        this._capturasRaro = 0;
        this._capturasGusano = 0;
        this._jailEndTime = 0;
        this._jailStaffLook = "";
        this._jailStaffName = "";
        this._hotelState = "EQUILIBRIO";
        this._hotelEventEndTime = 0;
        this._onlineTime = 0;
        this._reward10hClaimed = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        this._username = wrapper.readString();
        this._figure = wrapper.readString();
        this._gender = wrapper.readString();
        this._motto = wrapper.readString();
        this._realName = wrapper.readString();
        this._directMail = wrapper.readBoolean();
        this._respectsReceived = wrapper.readInt();
        this._respectsRemaining = wrapper.readInt();
        this._respectsPetRemaining = wrapper.readInt();
        this._streamPublishingAllowed = wrapper.readBoolean();
        this._lastAccessDate = wrapper.readString();
        this._canChangeName = wrapper.readBoolean();
        this._safetyLocked = wrapper.readBoolean();
        this._nivelPesca = wrapper.readInt();
        this._expPesca = wrapper.readInt();
        this._creditosPesca = wrapper.readInt();
        this._usosCañaPesca = wrapper.readInt();
        this._capturasBotas = wrapper.readInt();
        this._capturasComunPesca = wrapper.readInt();
        this._capturasMisterioso = wrapper.readInt();
        this._capturasRaro = wrapper.readInt();
        this._capturasGusano = wrapper.readInt();
        this._jailEndTime = wrapper.readInt();
        this._jailStaffLook = wrapper.readString();
        this._jailStaffName = wrapper.readString();
        this._hotelState = wrapper.readString();
        this._hotelEventEndTime = wrapper.readInt();
        this._onlineTime = wrapper.readInt();
        this._reward10hClaimed = wrapper.readBoolean();

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get username(): string
    {
        return this._username;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get motto(): string
    {
        return this._motto;
    }

    public get realName(): string
    {
        return this._realName;
    }

    public get directMail(): boolean
    {
        return this._directMail;
    }

    public get respectsReceived(): number
    {
        return this._respectsReceived;
    }

    public get respectsRemaining(): number
    {
        return this._respectsRemaining;
    }

    public get respectsPetRemaining(): number
    {
        return this._respectsPetRemaining;
    }

    public get streamPublishingAllowed(): boolean
    {
        return this._streamPublishingAllowed;
    }

    public get lastAccessedDate(): string
    {
        return this._lastAccessDate;
    }

    public get canChangeName(): boolean
    {
        return this._canChangeName;
    }

    public get safetyLocked(): boolean
    {
        return this._safetyLocked;
    }

    public get nivelPesca(): number
    {
        return this._nivelPesca;
    }

    public get expPesca(): number
    {
        return this._expPesca;
    }

    public get creditosPesca(): number
    {
        return this._creditosPesca;
    }

    public get usosCañaPesca(): number
    {
        return this._usosCañaPesca;
    }

    public get capturasBotas(): number
    {
        return this._capturasBotas;
    }

    public get capturasComunPesca(): number
    {
        return this._capturasComunPesca;
    }

    public get capturasMisterioso(): number
    {
        return this._capturasMisterioso;
    }

    public get capturasRaro(): number
    {
        return this._capturasRaro;
    }

    public get capturasGusano(): number
    {
        return this._capturasGusano;
    }

    public get jailEndTime(): number
    {
        return this._jailEndTime;
    }

    public get jailStaffLook(): string
    {
        return this._jailStaffLook;
    }

    public get jailStaffName(): string
    {
        return this._jailStaffName;
    }

    public get hotelState(): string
    {
        return this._hotelState;
    }

    public get hotelEventEndTime(): number
    {
        return this._hotelEventEndTime;
    }

    public get onlineTime(): number
    {
        return this._onlineTime;
    }

    public get reward10hClaimed(): boolean
    {
        return this._reward10hClaimed;
    }
}
