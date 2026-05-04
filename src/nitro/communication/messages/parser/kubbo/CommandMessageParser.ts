import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { CommandMessageData } from './CommandMessageData';

export class CommandMessageParser implements IMessageParser
{
    private _commands: CommandMessageData[];

    public flush(): boolean
    {
        this._commands = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalCommands = wrapper.readInt();

        while(totalCommands > 0)
        {
            this._commands.push(new CommandMessageData(wrapper));
            totalCommands--;
        }

        return true;
    }

    public get commands(): CommandMessageData[]
    {
        return this._commands;
    }
}
