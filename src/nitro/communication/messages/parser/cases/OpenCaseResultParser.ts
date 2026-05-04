import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

interface CaseItemResult {
    id: number;
    name: string;
    image: string;
}

export class OpenCaseResultParser implements IMessageParser {
    private _success: boolean = false;
    private _item: CaseItemResult | null = null;
    private _message: string = '';

    public flush(): boolean {
        this._success = false;
        this._item = null;
        this._message = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._success = wrapper.readBoolean();

        if (this._success) {
            const id = wrapper.readInt();
            const name = wrapper.readString();
            const image = wrapper.readString();
            this._item = { id, name, image };
        } else {
            this._message = wrapper.readString();
            this._item = null;
        }

        return true;
    }

    public get success(): boolean {
        return this._success;
    }

    public get item(): CaseItemResult | null {
        return this._item;
    }

    public get message(): string {
        return this._message;
    }
}
