export { LoadingScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene";
import { MenuScene } from "./MenuScene";
import { SettingsScene } from "./SettingsScene";
import { CreditsScene } from "./CreditsScene";
import { GameScene } from "../Game/GameScene";
import { DialogPool } from "../Game/GameData/DialogPool";

class LoadingScene extends UIScene
{
    private _Progress:TBX.ProgressBar;
    public constructor(Old?:LoadingScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitGameData();
        }
    }
    private InitGameData() : void
    {
        let DP: DialogPool = new DialogPool();
        this.InitLoadingScene();
    }
    private InitLoadingScene() : void
    {
        this.Name = "Loading";
        this.BackColor = TBX.Color.Black;
        this.CreateBackground("Dark");
        this._Title.Text = TBX.Runner.Current.Game.Name;
        this._Title.Style.Text.Size = 70;
        this._OverColor = TBX.Color.FromRGBA(23,38,49,255);
        this._Progress = new TBX.ProgressBar();
        this._Progress.ChangeTargetScene(MenuScene.Current);
        this._Progress.Indicator.Paint = TBX.Color.FromRGBA(244,208,63,255);
        this.Attach(this._Progress);
        MenuScene.Current.Events.LoadComplete.push(this.LoadMenuSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Menu");
    }
    private LoadMenuSceneFinished() : void
    {
        this._Progress.ChangeTargetScene(SettingsScene.Current);
        SettingsScene.Current.Events.LoadComplete.push(this.LoadSettingsSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Settings");
    }
    private LoadSettingsSceneFinished() : void
    {
        this._Progress.ChangeTargetScene(CreditsScene.Current);
        CreditsScene.Current.Events.LoadComplete.push(this.LoadCreditsSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Credits");
    }
    private LoadCreditsSceneFinished() : void
    {
        GameScene.Current.InitData();
        this._Progress.ChangeTargetScene(GameScene.Current);
        GameScene.Current.Events.LoadComplete.push(this.LoadGameSceneFinished.bind(this));
        TBX.Runner.Current.PreloadScene("Game");
    }
    private LoadGameSceneFinished() : void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}