import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class GetLatestMentionsParser implements IMessageParser
{
    private _mentions: {
        senderId: number;
        senderName: string;
        senderLook: string;
        message: string;
        timestamp: number;
    }[];

    public flush(): boolean
    {
        this._mentions = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if (!wrapper) return false;

        const total = wrapper.readInt();
        this._mentions = [];

        for (let i = 0; i < total; i++)
        {
            this._mentions.push({
                senderId: wrapper.readInt(),
                senderName: wrapper.readString(),
                senderLook: wrapper.readString(),
                message: wrapper.readString(),
                timestamp: wrapper.readInt()
            });
        }

        return true;
    }

    public get mentions()
    {
        return this._mentions;
    }
}
