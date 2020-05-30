export { GameScene };

import * as TBX from "toybox-engine";
import { DialogEntry } from "./GameData/DialogEntry";
import { DialogPool } from "./GameData/DialogPool";
import { DialogPanel } from "./Dialog/DialogPanel";

class GameScene extends TBX.Scene2D
{
    public static Current:GameScene;
    private _Back: TBX.UI.Panel;
    private _Home: TBX.UI.Button;
    private _Entry: DialogEntry;
    private _Dialog: DialogPanel;
    public constructor(Old?:GameScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitGameScene();
            GameScene.Current = this;
        }
    }
    private InitGameScene() : void
    {
        this.Name = "Game";
        this.BackColor = TBX.Color.Black;
        this.CreateBackground();
        this._Home = new TBX.UI.Button(null, "Home");
        this._Home.Dock = TBX.UI.DockType.TopRight;
        this._Home.Position = new TBX.Vertex(30, 30, 0);
        this._Home.Size = new TBX.Vertex(150, 80);
        this._Home.ForeColor = TBX.Color.Black;
        this._Home.BackColor = TBX.Color.FromRGBA(244,208,63,255);
        this._Home.Style.Border.Radius = 20;
        this._Home.Events.Click.push(() => TBX.Runner.Current.SwitchScene("Menu"));
        this.Attach(this._Home);
        this._Dialog = new DialogPanel();
        this._Dialog.Next = EntryID => this.OnEntryChanged(EntryID);
        this.Attach(this._Dialog);
    }
    public InitData() : void
    {
        this._Entry = DialogPool.All.FindAtIndex(0);
        this._Dialog.Init(this._Entry);
        this.SetBackground(this._Entry.Background);
    }
    private CreateBackground() : void
    {
        this._Back = new TBX.UI.Panel();
        this._Back.Dock = TBX.UI.DockType.Center;
        this._Back.Size = new TBX.Vertex(1920, 1080, 1);
        this._Back.Style.Values.transition = "0.5s background";
        this._Back.Style.Values.backgroundSize = "cover";
        this.Attach(this._Back);
    }
    private SetBackground(URL: string) : void
    {
        this._Back.Style.Values.backgroundImage = "url(Resources/Textures/Backgrounds/"+URL+".png)";
        this._Back.Update();
    }
    public OnEntryChanged(EntryID: string) : void
    {
        this._Entry = DialogPool.All.Find(EntryID);
        this._Dialog.Init(this._Entry);
        this.SetBackground(this._Entry.Background);
    }
}