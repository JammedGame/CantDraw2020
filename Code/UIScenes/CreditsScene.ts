export { CreditsScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene"; 

class CreditsScene extends UIScene
{
    public static Current:CreditsScene;
    private _Back:TBX.UI.Button;
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
        this.CreateLabel("JammedGame", -1);
        this.CreateLabel("Ivan Plavšić", 1);
        this.CreateLabel("Aleksandra Zdravković", 2);
        this.CreateLabel("Đorđe Cvijić", 3);
        this.CreateLabel("Miloš Manojlović", 4);
        this._Back = this.CreateButton("Back", 3);
        this._Back.Events.Click.push(this.BackClick);
    }
    private BackClick() : void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}