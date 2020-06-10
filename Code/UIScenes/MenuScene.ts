export { MenuScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene";
import { SoundManager } from "../SoundManager";

class MenuScene extends UIScene
{
    public static Current:MenuScene;
    private _Play:TBX.UI.Button;
    private _Settings:TBX.UI.Button;
    private _Credits:TBX.UI.Button;
    public constructor(Old?:MenuScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitMenuScene();
            MenuScene.Current = this;
        }
    }
    private InitMenuScene() : void
    {
        this.Name = "Menu";
        this.CreateBackground("Beach");
        this._Title.Text = TBX.Runner.Current.Game.Name;
        this._Title.Style.Text.Size = 70;
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Play = this.CreateButton("Play", 0);
        this._Play.Events.Click.push(this.PlayClick.bind(this));
        this._Settings = this.CreateButton("Settings", 1);
        this._Settings.Events.Click.push(this.SettingsClick.bind(this));
        this._Credits = this.CreateButton("Credits", 2);
        this._Credits.Events.Click.push(this.CreditsClick.bind(this));
        this.Events.Click.push(this.ClickAnywhere);
    }
    private PlayClick() : void
    {
        TBX.Runner.Current.SwitchScene("Game");
        this.ClickAnywhere();
    }
    private SettingsClick() : void
    {
        TBX.Runner.Current.SwitchScene("Settings");
        this.ClickAnywhere();
    }
    private CreditsClick() : void
    {
        TBX.Runner.Current.SwitchScene("Credits");
        this.ClickAnywhere();
    }
    private ClickAnywhere() : void
    {
        // gotta trigger volume update on click so that chrome unblocks audio: https://goo.gl/7K7WLu
        SoundManager.UpdateVolumes();
    }
}