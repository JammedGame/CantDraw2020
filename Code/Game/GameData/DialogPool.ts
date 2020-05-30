export { DialogPool }

import * as GameData from "./GameData.json";
import { DialogEntry } from "./DialogEntry";

class DialogPool
{
    private static _Current: DialogPool;
    public static get All() : DialogPool { return DialogPool._Current; }
    private _Hash: any;
    private _Pool: DialogEntry[];
    public constructor()
    {
        DialogPool._Current = this;
        this.LoadData();
    }
    private LoadData() : void
    {
        this._Hash = { };
        this._Pool = GameData.map(Entry => new DialogEntry(Entry));
        this._Pool.forEach(Entry => this._Hash[Entry.ID] = Entry);
    }
    public FindAtIndex(Index: number) : DialogEntry
    {
        return this._Pool[Index];
    }
    public Find(ID: string) : DialogEntry
    {
        return this._Hash[ID];
    }
}