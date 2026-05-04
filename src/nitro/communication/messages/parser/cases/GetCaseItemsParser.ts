// GetCaseItemsParser.ts
import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class CaseItemData
{
    public id: number;
    public case_id: number;
    public name: string;
    public chance: number;
    public pointsType: number;
    public pointsAmount: number;
    public credits: number;
    public itemId: number;
    public image: string;
    public color: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this.id = wrapper.readInt();           // 1
        this.case_id = wrapper.readInt();      // 2
        this.name = wrapper.readString();      // 3
        this.chance = wrapper.readInt();       // 4
        this.pointsType = wrapper.readInt();   // 5
        this.pointsAmount = wrapper.readInt(); // 6
        this.credits = wrapper.readInt();      // 7
        this.itemId = wrapper.readInt();       // 8
        this.image = wrapper.readString();     // 9
        this.color = wrapper.readString();     // 10
    }
}


export class GetCaseItemsParser implements IMessageParser
{
    private _items: CaseItemData[];

    public flush(): boolean
    {
        this._items = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const total = wrapper.readInt();
        this._items = [];

        for(let i = 0; i < total; i++)
        {
            this._items.push(new CaseItemData(wrapper));
        }

        return true;
    }

    public get items(): CaseItemData[]
    {
        return this._items;
    }
}
