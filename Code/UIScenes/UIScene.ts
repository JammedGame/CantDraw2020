export { UIScene }; 

import * as TBX from "toybox-engine";

import { Slider } from "./Elements/Slider";

class UIScene extends TBX.Scene2D 
{ 
    protected _Title:TBX.UI.Label;
    protected _OverColor:TBX.Color;
    public constructor(Old?:UIScene) 
    { 
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitUIScene(); 
        }
    } 
    private InitUIScene() : void
    { 
        this.Name = "UI";
        this._OverColor = TBX.Color.Black;
        this._Title = new TBX.UI.Label(null, "Title");
        this._Title.Size = new TBX.Vertex(1920,200,1);
        this._Title.Position = new TBX.Vertex(0,100);
        this._Title.BackColor = TBX.Color.FromRGBA(255,255,255,0);
        this._Title.ForeColor = TBX.Color.FromString("#222");
        this._Title.Dock = TBX.UI.DockType.Top;
        this._Title.Style.Border.Width = 0;
        this._Title.Style.Text.Size = 60;
        this.Attach(this._Title);
    }
    protected CreateBackground(Name:string) : void
    {
        let Back:TBX.Tile = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/"+Name+".png"], new TBX.Vertex(960,540), new TBX.Vertex(1920, 1080, 1));
        this.Attach(Back);
    }
    protected CreateButton(Text:string, Order:number) : TBX.UI.Button
    {
        let Button:TBX.UI.Button = new TBX.UI.Button(null, Text);
        Button.Name = Text;
        Button.Size = new TBX.Vertex(250, 90, 1);
        Button.Position = new TBX.Vertex(0, -50 + 120 * Order, 0.2);
        Button.ForeColor = this._OverColor;
        Button.BackColor = TBX.Color.FromRGBA(244,208,63,255);
        Button.Dock = TBX.UI.DockType.Center;
        Button.Style.Padding.All = 0;
        Button.Style.Border.Width = 0;
        Button.Style.Border.Radius = 15;
        this.Attach(Button);
        return Button;
    }
    protected CreateLabel(Text:string, Order:number) : TBX.UI.Label
    {
        let Label:TBX.UI.Label = new TBX.UI.Label(null, Text);
        Label.Name = Text;
        Label.Size = new TBX.Vertex(800, 50);
        Label.Position = new TBX.Vertex(0, -150 + 60 * Order, 0.2);
        Label.ForeColor = TBX.Color.FromString("#222");
        Label.Dock = TBX.UI.DockType.Center;
        Label.Style.Text.Size = 30;
        Label.Style.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
    protected CreateSlider(Text:string, Value:number, Order:number) : Slider
    {
        let NewSlider:Slider = new Slider(null, Text, Value);
        NewSlider.Name = Text;
        NewSlider.Position = new TBX.Vertex(0, 340 + 160 * Order, 0.2);
        this.Attach(NewSlider);
        return NewSlider;
    }
}