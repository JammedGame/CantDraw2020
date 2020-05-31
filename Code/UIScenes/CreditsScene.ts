export { CreditsScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene"; 

class CreditsScene extends UIScene
{
    public static Current:CreditsScene;
    private _Back:TBX.UI.Button;
    private _Panel:TBX.UI.Panel;
    public constructor(Old?:CreditsScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitCreditsScene();
            CreditsScene.Current = this;
        }
    }
    private InitCreditsScene() : void
    {
        this.Name = "Credits";
        this._Title.Text = "Credits";
        this.CreateBackground("Beach");
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Panel = new TBX.UI.Panel();
        this._Panel.Dock = TBX.UI.DockType.Center;
        this._Panel.Size = new TBX.Vertex(450, 480, 1);
        this._Panel.Position = new TBX.Vertex(0, -50, 0);
        this._Panel.BackColor = TBX.Color.FromRGBA(0,0,30,150);
        this._Panel.Style.Border.Radius = 25;
        this._Panel.Style.Border.Color = TBX.Color.FromRGBA(244,208,63,255);
        this._Panel.Style.Border.Width = 8;
        this.Attach(this._Panel);
        this.CreateLabel("JammedGame", -1);
        this.CreateLabel("Ivan Plavsic", 1);
        this.CreateLabel("Aleksandra Zdravkovic", 2);
        this.CreateLabel("Djordje Cvijic", 3);
        this.CreateLabel("Milos Manojlovic", 4);
        this._Back = this.CreateButton("Back", 3);
        this._Back.Events.Click.push(this.BackClick);
    }
    protected CreateLabel(Text:string, Order:number) : TBX.UI.Label
    {
        // Override
        let Label:TBX.UI.Label = super.CreateLabel(Text, Order);
        Label.ForeColor = TBX.Color.White;
        return Label;
    }
    private BackClick() : void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}