import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { HabboGroupEntryData } from '../HabboGroupEntryData';

export class UserProfileParser implements IMessageParser
{
    private _id: number;
    private _username: string;
    private _figure: string;
    private _motto: string;
    private _registration: string;
    private _achievementPoints: number;
    private _friendsCount: number;
    private _isMyFriend: boolean;
    private _requestSent: boolean;
    private _isOnline: boolean;
    private _groups: HabboGroupEntryData[];
    private _secondsSinceLastVisit: number;
    private _openProfileWindow: boolean;
    private _customBanner: string;
    private _spotifyEnabled: boolean;
    private _spotifyConnected: boolean;
    private _spotifyCurrentlyPlaying: boolean;
    private _spotifyAuthUrl: string;
    private _spotifyTrackName: string;
    private _spotifyTrackArtists: string;
    private _spotifyAlbumImageUrl: string;
    private _spotifyTrackUrl: string;
    private _spotifyTrackDurationMs: number;
    private _spotifyTrackProgressMs: number;
    private _spotifyLastUpdated: number;

    public flush(): boolean
    {
        this._id = 0;
        this._username = null;
        this._figure = null;
        this._motto = null;
        this._registration = null;
        this._achievementPoints = 0;
        this._friendsCount = 0;
        this._isMyFriend = false;
        this._requestSent = false;
        this._isOnline = false;
        this._groups = [];
        this._secondsSinceLastVisit = 0;
        this._openProfileWindow = false;
        this._customBanner = null;
        this._spotifyEnabled = false;
        this._spotifyConnected = false;
        this._spotifyCurrentlyPlaying = false;
        this._spotifyAuthUrl = null;
        this._spotifyTrackName = null;
        this._spotifyTrackArtists = null;
        this._spotifyAlbumImageUrl = null;
        this._spotifyTrackUrl = null;
        this._spotifyTrackDurationMs = 0;
        this._spotifyTrackProgressMs = 0;
        this._spotifyLastUpdated = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id = wrapper.readInt();
        this._username = wrapper.readString();
        this._figure = wrapper.readString();
        this._motto = wrapper.readString();
        this._registration = wrapper.readString();
        this._achievementPoints = wrapper.readInt();
        this._friendsCount = wrapper.readInt();
        this._isMyFriend = wrapper.readBoolean();
        this._requestSent = wrapper.readBoolean();
        this._isOnline = wrapper.readBoolean();
        const groupsCount = wrapper.readInt();

        for(let i = 0; i < groupsCount; i++)
        {
            this._groups.push(new HabboGroupEntryData(wrapper));
        }

        this._secondsSinceLastVisit = wrapper.readInt();
        this._openProfileWindow = wrapper.readBoolean();
        this._customBanner = wrapper.readString();
        this._spotifyEnabled = wrapper.readBoolean();
        this._spotifyConnected = wrapper.readBoolean();
        this._spotifyCurrentlyPlaying = wrapper.readBoolean();
        this._spotifyAuthUrl = wrapper.readString();
        this._spotifyTrackName = wrapper.readString();
        this._spotifyTrackArtists = wrapper.readString();
        this._spotifyAlbumImageUrl = wrapper.readString();
        this._spotifyTrackUrl = wrapper.readString();
        this._spotifyLastUpdated = wrapper.readInt();
        this._spotifyTrackDurationMs = wrapper.readInt();
        this._spotifyTrackProgressMs = wrapper.readInt();

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get username(): string
    {
        return this._username;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get motto(): string
    {
        return this._motto;
    }

    public get registration(): string
    {
        return this._registration;
    }

    public get achievementPoints(): number
    {
        return this._achievementPoints;
    }

    public get friendsCount(): number
    {
        return this._friendsCount;
    }

    public get isMyFriend(): boolean
    {
        return this._isMyFriend;
    }

    public get requestSent(): boolean
    {
        return this._requestSent;
    }

    public get isOnline(): boolean
    {
        return this._isOnline;
    }

    public get groups(): HabboGroupEntryData[]
    {
        return this._groups;
    }

    public get secondsSinceLastVisit(): number
    {
        return this._secondsSinceLastVisit;
    }

    public get openProfileWindow(): boolean
    {
        return this._openProfileWindow;
    }
    public get customBanner(): string
    {
        return this._customBanner;
    }

    public set customBanner(banner: string)
    {
        this._customBanner = banner;
    }

    public get spotifyEnabled(): boolean
    {
        return this._spotifyEnabled;
    }

    public get spotifyConnected(): boolean
    {
        return this._spotifyConnected;
    }

    public get spotifyCurrentlyPlaying(): boolean
    {
        return this._spotifyCurrentlyPlaying;
    }

    public get spotifyAuthUrl(): string
    {
        return this._spotifyAuthUrl;
    }

    public get spotifyTrackName(): string
    {
        return this._spotifyTrackName;
    }

    public get spotifyTrackArtists(): string
    {
        return this._spotifyTrackArtists;
    }

    public get spotifyAlbumImageUrl(): string
    {
        return this._spotifyAlbumImageUrl;
    }

    public get spotifyTrackUrl(): string
    {
        return this._spotifyTrackUrl;
    }

    public get spotifyTrackDurationMs(): number
    {
        return this._spotifyTrackDurationMs;
    }

    public get spotifyTrackProgressMs(): number
    {
        return this._spotifyTrackProgressMs;
    }

    public get spotifyLastUpdated(): number
    {
        return this._spotifyLastUpdated;
    }
}
