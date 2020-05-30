export { DialogPanel }

import * as TBX from "toybox-engine";
import { DialogEntry } from "../GameData/DialogEntry";
import { DialogOptionsPanel } from "./DialogOptions";
import { CharacterIndicator } from "./CharacterIndicator";

class DialogPanel extends TBX.UI.Panel
{
    public Next: Function;
    private _Entry: DialogEntry;
    private _Text: TBX.UI.Label;
    private _Character: CharacterIndicator;
    private _Options: DialogOptionsPanel;
    public constructor()
    {
        super();
        this.Dock = TBX.UI.DockType.Bottom;
        this.Position = new TBX.Vertex(0, 30, 1);
        this.Size = new TBX.Vertex(1800, 360, 1);
        this.Style.Border.Color = TBX.Color.FromRGBA(244,208,63,255);
        this.Style.Border.Width = 8;
        this.Style.Border.Radius = 30;
        this.BackColor = TBX.Color.FromRGBA(0,0,30,150);
        this._Text = new TBX.UI.Label();
        this._Text.Dock = TBX.UI.DockType.Top;
        this._Text.Size = new TBX.Vertex(1700, 80, 1);
        this._Text.Position = new TBX.Vertex(0, 0, 0);
        this._Text.Style.Text.Size = 36;
        this._Text.Style.Values.borderWidth = "0 0 2px 0";
        this.Attach(this._Text);
        this._Options = new DialogOptionsPanel();
        this._Options.Next = OptionIndex => this.Next(this._Entry.Options[OptionIndex].NextID);
        this.Attach(this._Options);
        this._Character = new CharacterIndicator();
        this.Attach(this._Character);
    }
    public Init(Entry: DialogEntry) : void
    {
        this._Entry = Entry;
        this._Text.Text = Entry.Text;
        if(this._Entry.Options.length < 2) this._Text.Size.Y = 240;
        else this._Text.Size.Y = 80;
        this._Text.Update();
        this._Options.Init(Entry.Options);
        this._Character.Init(Entry.CharacterID);
        if(Entry.CharacterID)
        {
            this._Character.Active = true;
            this.Style.Values.borderRadius = "30px 0 30px 30px";
        }
        else
        {
            this._Character.Active = false;
            this.Style.Values.borderRadius = "30px";
        }
        this._Character.Update();
        this.Update();
    }
}