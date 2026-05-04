import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export interface IStaffShiftReportRow
{
    userId: number;
    username: string;
    rankName: string;
    figure: string;
    totalSeconds: number;
}

export class StaffShiftStatusParser implements IMessageParser
{
    private _enabled = false;
    private _eligible = false;
    private _serverTimestamp = 0;
    private _hasActiveSession = false;
    private _paused = false;
    private _sessionStartedAt = 0;
    private _currentSessionSeconds = 0;
    private _weekSeconds = 0;
    private _weekYear = 0;
    private _weekNumber = 0;
    private _feedbackType = '';
    private _feedbackMessage = '';
    private _reportRows: IStaffShiftReportRow[] = [];

    public flush(): boolean
    {
        this._enabled = false;
        this._eligible = false;
        this._serverTimestamp = 0;
        this._hasActiveSession = false;
        this._paused = false;
        this._sessionStartedAt = 0;
        this._currentSessionSeconds = 0;
        this._weekSeconds = 0;
        this._weekYear = 0;
        this._weekNumber = 0;
        this._feedbackType = '';
        this._feedbackMessage = '';
        this._reportRows = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if (!wrapper) return false;

        this._enabled = wrapper.readBoolean();
        this._eligible = wrapper.readBoolean();
        this._serverTimestamp = wrapper.readInt();
        this._hasActiveSession = wrapper.readBoolean();
        this._paused = wrapper.readBoolean();
        this._sessionStartedAt = wrapper.readInt();
        this._currentSessionSeconds = wrapper.readInt();
        this._weekSeconds = wrapper.readInt();
        this._weekYear = wrapper.readInt();
        this._weekNumber = wrapper.readInt();
        this._feedbackType = wrapper.readString();
        this._feedbackMessage = wrapper.readString();

        const totalRows = wrapper.readInt();
        this._reportRows = [];

        for (let index = 0; index < totalRows; index++)
        {
            this._reportRows.push({
                userId: wrapper.readInt(),
                username: wrapper.readString(),
                rankName: wrapper.readString(),
                figure: wrapper.readString(),
                totalSeconds: wrapper.readInt()
            });
        }

        return true;
    }

    public get enabled(): boolean
    {
        return this._enabled;
    }

    public get eligible(): boolean
    {
        return this._eligible;
    }

    public get serverTimestamp(): number
    {
        return this._serverTimestamp;
    }

    public get hasActiveSession(): boolean
    {
        return this._hasActiveSession;
    }

    public get paused(): boolean
    {
        return this._paused;
    }

    public get sessionStartedAt(): number
    {
        return this._sessionStartedAt;
    }

    public get currentSessionSeconds(): number
    {
        return this._currentSessionSeconds;
    }

    public get weekSeconds(): number
    {
        return this._weekSeconds;
    }

    public get weekYear(): number
    {
        return this._weekYear;
    }

    public get weekNumber(): number
    {
        return this._weekNumber;
    }

    public get feedbackType(): string
    {
        return this._feedbackType;
    }

    public get feedbackMessage(): string
    {
        return this._feedbackMessage;
    }

    public get reportRows(): IStaffShiftReportRow[]
    {
        return this._reportRows;
    }
}
