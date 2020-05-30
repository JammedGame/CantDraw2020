export { Slider }

import * as TBX from "toybox-engine";

class Slider extends TBX.UI.Panel
{
    private _Percent:number;
    private _Pointer:TBX.UI.Panel;
    private _Label:TBX.UI.Label;
    private _OnChange:Function[];
    public get Change():Function[] { return this._OnChange; }
    public constructor(Old?:Slider, Text?:string, Value?:number)
    {
        super(Old);
        this._OnChange = [];
        if(Old)
        {
            //TODO
        }
        else
        {
            this._Percent = 0.5;
            this.Init(Text, Value);
        }
    }
    public Init(Text?:string, Value?:number) : void
    {
        this._Percent = Value;
        this.Dock = TBX.UI.DockType.Top;
        this.Size = new TBX.Vertex(800, 80, 1);
        this.BackColor = TBX.Color.FromString("#444444");
        this.Style.Border.Width = 0;
        this.Style.Border.Radius = 40;
        this.Style.Values.overflow = "hidden";
        this._Pointer = new TBX.UI.Panel();
        this._Pointer.Dock = TBX.UI.DockType.Left;
        this._Pointer.Size = new TBX.Vertex(800, 80, 1);
        this._Pointer.BackColor = TBX.Color.FromRGBA(244,208,63,255);
        this._Pointer.Style.Values.transition = "0.1s all";
        this.Attach(this._Pointer);
        this.Events.Click.push(this.Click.bind(this));
        this._Label = new TBX.UI.Label(null, Text);
        this._Label.Dock = TBX.UI.DockType.Top;
        this._Label.Position = new TBX.Vertex(0, -40, 0);
        this._Label.ForeColor = TBX.Color.FromString("#222");
        this._Label.Size = new TBX.Vertex(960, 45);
        this._Label.Style.Text.Size = 30;
        this._Label.Style.Border.Width = 0;
    }
    public OnAttach(Args:any) : void
    {
        super.OnAttach(Args);
        this.UpdatePointer();
        this._Label.Position = this.Position.Copy().Add(new TBX.Vertex(0, -50, 0));
        Args.Scene.Attach(this._Label);
    }
    private UpdatePointer() : void
    {
        this._Pointer.Size.X = this._Percent * this.Size.X;
        this._Pointer.Update();
    }
    public Toggle(Toggled:boolean) : void
    {
        this.Active = Toggled;
        this._Pointer.Active = Toggled;
        this._Label.Active = Toggled;
    }
    private Click(G:TBX.Game, Args:any) : void
    {
        let Value:number = Args.Location.X;
        Value /= (this.Size.X * this.Scale.Y);
        this._Percent = Value;
        this.UpdatePointer();
        for(let i in this._OnChange)
        {
            this._OnChange[i](Value);
        }
        this.Update();
    }
}