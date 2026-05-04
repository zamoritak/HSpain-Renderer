import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class CaseData
{
    public id: number;
    public name: string;
    public price: number;
    public image: string;
    public pointsType: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this.id = wrapper.readInt();
        this.name = wrapper.readString();
        this.price = wrapper.readInt();
        this.image = wrapper.readString();
        this.pointsType = wrapper.readInt();
    }
}

export class GetCasesListParser implements IMessageParser
{
    private _cases: CaseData[];

    public flush(): boolean
    {
        this._cases = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if (!wrapper) return false;

        const total = wrapper.readInt();
        this._cases = [];

        for (let i = 0; i < total; i++)
        {
            this._cases.push(new CaseData(wrapper));
        }

        return true;
    }

    public get cases(): CaseData[]
    {
        return this._cases;
    }
}
