export { DialogOptionsPanel }

import * as TBX from "toybox-engine";
import { DialogOption } from "../GameData/DialogEntry";

const MAX_OPTIONS = 3;

class DialogOptionsPanel extends TBX.UI.Panel
{
    public Next: Function;
    private _Options: TBX.UI.Label[];
    public constructor()
    {
        super();
        this.Dock = TBX.UI.DockType.Bottom;
        this.Position = new TBX.Vertex(0, 20, 0);
        this.Size = new TBX.Vertex(1700, 240, 1);
        this.BackColor = TBX.Color.FromRGBA(0,0,0,0);
        this._Options = [];
        for(let i = 0; i < MAX_OPTIONS; i++)
        {
            let Option: TBX.UI.Label = this.CreateOption(i);
            this._Options.push(Option);
            this.Attach(Option);
        }
    }
    public Init(Options: DialogOption[]) : void
    {
        let Passed = 0;
        if (Options.length < 2) this.Size.Y = 80;
        else this.Size.Y = 240;
        this.Update();
        Options.forEach((Option, i) =>
        {
            Passed++;
            this._Options[i].Active = true;
            this._Options[i].Text = Option.Text;
        });
        for(let i = Passed; i < MAX_OPTIONS; i++)
        {
            this._Options[i].Active = false;
        }
        this._Options.forEach(Option => Option.Update());
    }
    private CreateOption(Index: number) : TBX.UI.Label
    {
        let Option: TBX.UI.Label = new TBX.UI.Label();
        Option.Position = new TBX.Vertex(0, 20 + 80 * Index, 0);
        Option.Dock = TBX.UI.DockType.Top;
        Option.Style.Text.Size = 24;
        Option.Data["Index"] = Index;
        Option.Style.Values.cursor = "pointer";
        Option.Style.Values.transition = "0.5s all";
        Option.Events.Click.push((g,a) => this.OptionChosen(a.Sender.Data["Index"]));
        Option.Events.MouseEnter.push((g,a) => this.OptionMouseEnter(a.Sender));
        Option.Events.MouseLeave.push((g,a) => this.OptionMouseLeave(a.Sender));
        return Option;
    }
    private OptionChosen(Index: number) : void
    {
        if(this.Next)
        {
            this.Next(Index);
        }
    }
    private OptionMouseEnter(Sender: TBX.UI.Label) : void
    {
        Sender.Style.Text.Size = 30;
        Sender.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        Sender.Update();
    }
    private OptionMouseLeave(Sender: TBX.UI.Label) : void
    {
        Sender.Style.Text.Size = 24;
        Sender.ForeColor = TBX.Color.White;
        Sender.Update();
    }
}