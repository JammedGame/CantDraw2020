export { CharacterIndicator }

import * as TBX from "toybox-engine";

class CharacterIndicator extends TBX.UI.Panel
{
    private _Text: TBX.UI.Label;
    public constructor()
    {
        super();
        this.Dock = TBX.UI.DockType.TopRight;
        this.Position = new TBX.Vertex(-8, -80, 0);
        this.Size = new TBX.Vertex(180, 80, 1);
        this.Style.Border.Color = TBX.Color.FromRGBA(244,208,63,255);
        this.Style.Border.Width = 8;
        this.Style.Border.Radius = 30;
        this.Style.Values.borderRadius = "30px 30px 0 0";
        this.BackColor = TBX.Color.FromRGBA(0,0,30,150);
        this._Text = new TBX.UI.Label();
        this._Text.Dock = TBX.UI.DockType.Center;
        this._Text.Size = new TBX.Vertex(180, 80, 1);
        this._Text.Position = new TBX.Vertex(0, 0, 0);
        this._Text.Style.Text.Size = 24;
        this.Attach(this._Text);
    }
    public Init(CharacterName: string) : void
    {
        this._Text.Text = CharacterName;
    }
}