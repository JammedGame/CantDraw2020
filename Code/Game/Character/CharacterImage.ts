export { CharacterImage }

import * as TBX from "toybox-engine";

const OFFSET = 200;
const DEFAULT_EXPRESSION = "Idle";
const CHARACTERS_WITH_ART = [
    "Bubbles",
    "Faith",
    "Becky"
];

class CharacterImage extends TBX.UI.Panel
{
    private _Character: string;
    private _Expression: string;
    public constructor()
    {
        super();
        this.Dock = TBX.UI.DockType.Right;
        this.Position = new TBX.Vertex(-1024, 0, 2);
        this.Size = new TBX.Vertex(1024, 1024, 1);
        this.Style.Values.transition = "0.2s right";
        this.BackColor = TBX.Color.Empty;
    }
    public Init(Character: string, Expression: string) : void
    {
        if (!Character || CHARACTERS_WITH_ART.indexOf(Character) === -1)
        {
            let PreviousCharacter: string = null;
            this.Position = new TBX.Vertex(-1024, 0, 2);
            this.Update();
            setTimeout(() =>
            {
                this.Active = false;
                this.Update();
            }, 200);
            return;
        }
        this.Active = true;
        let PreviousCharacter: string = this._Character;
        this._Character = Character;
        if(!Expression) this._Expression = DEFAULT_EXPRESSION;
        else this._Expression = Expression;
        if(PreviousCharacter && PreviousCharacter != this._Character)
        {
            this.Position = new TBX.Vertex(-1024, 0, 2);
            this.Update();
            setTimeout(() =>
            {
                this.SetImage(this._Character, this._Expression);
                this.Position = new TBX.Vertex(OFFSET, 0, 2);
                this.Update();
            }, 200);
        }
        else if(PreviousCharacter && PreviousCharacter == this._Character)
        {
            this.SetImage(this._Character, this._Expression);
            this.Update();
        }
        else
        {
            this.Position = new TBX.Vertex(OFFSET, 0, 2);
            this.SetImage(this._Character, this._Expression);
            this.Update();
        }
    }
    private SetImage(Character: string, Expression: string) : void
    {
        console.log(Character, Expression);
        this.Style.Values.backgroundImage = "url(Resources/Textures/Characters/"+Character+"/"+Expression+".png)";
    }
}