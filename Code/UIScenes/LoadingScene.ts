export { LoadingScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene";
import { MenuScene } from "./MenuScene";
import { SettingsScene } from "./SettingsScene";
import { CreditsScene } from "./CreditsScene";
import { GameScene } from "../Game/GameScene";
import { DialogPool } from "../Game/GameData/DialogPool";

const USED_IMAGES = [
    "Resources/Textures/Backgrounds/A1.1.png",
    "Resources/Textures/Backgrounds/A1.2.png",
    "Resources/Textures/Backgrounds/A1.2.1.png",
    "Resources/Textures/Backgrounds/A1.2.2.1.png",
    "Resources/Textures/Backgrounds/A1.2.2.2.png",
    "Resources/Textures/Backgrounds/A1.3.png",
    "Resources/Textures/Backgrounds/A1.4.png",
    "Resources/Textures/Backgrounds/A1.5.png",
    "Resources/Textures/Backgrounds/A1.6.png",
    "Resources/Textures/Backgrounds/A1.7.png",
    "Resources/Textures/Backgrounds/A1.8.png",
    "Resources/Textures/Backgrounds/A2.1.png",
    "Resources/Textures/Backgrounds/A2.2.png",
    "Resources/Textures/Backgrounds/A2.3.png",
    "Resources/Textures/Backgrounds/A2.4.png",
    "Resources/Textures/Backgrounds/A3.1.png",
    "Resources/Textures/Backgrounds/A3.2.png",
    "Resources/Textures/Characters/Bubbles/Idle.png",
    "Resources/Textures/Characters/Bubbles/Sparkle.png",
    "Resources/Textures/Characters/Bubbles/Worried.png",
    "Resources/Textures/Characters/Bubbles/HappyClosed.png",
    "Resources/Textures/Characters/Bubbles/HappySide.png",
    "Resources/Textures/Characters/Faith/Idle.png",
    "Resources/Textures/Characters/Faith/Blush.png",
    "Resources/Textures/Characters/Faith/Side.png",
    "Resources/Textures/Characters/Faith/SideBlush.png",
    "Resources/Textures/Characters/Faith/Angry.png",
    "Resources/Textures/Characters/Becky/Idle.png",
    "Resources/Textures/Characters/Becky/Side.png",
    "Resources/Textures/Characters/Becky/Suprised.png",
    "Resources/Textures/Characters/Becky/ReallySuprised.png",
    "Resources/Textures/Characters/Becky/Silent.png",
    "Resources/Textures/Characters/Becky/Sad.png",
    "Resources/Textures/Characters/Becky/Pervert.png",
    "Resources/Textures/Characters/Becky/Happy.png",
    "Resources/Textures/Characters/Goldenfish/Idle.png",
    "Resources/Textures/Characters/Goldengish/Evil.png",
];

class LoadingScene extends UIScene
{
    private _PreloadedImages: any[];
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
        this.PreloadImages();
        let DP: DialogPool = new DialogPool();
        this.InitLoadingScene();
    }
    private PreloadImages() : void
    {
        this._PreloadedImages = [];
        USED_IMAGES.forEach(url => {
            let NewImage = new Image();
            NewImage.src = url;
            this._PreloadedImages.push(NewImage);
        });
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