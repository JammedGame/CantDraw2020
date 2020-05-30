export { DialogOption, DialogEntry }

const DEFAULT_EXPRESSION = "Idle";
const DEFAULT_BACKGROUND = "Beach";

class DialogOption
{
    public Text: string;
    public NextID: string;
    public constructor(Data?: any, ParentNextID?: string)
    {
        if(Data)
        {
            this.Text = Data.text;
            if(Data.to) this.NextID = Data.to;
            else this.NextID = ParentNextID;
        }
    }
}

class DialogEntry
{
    public ID: string;
    public Text: string;
    public Background: string;
    public CharacterID: string;
    public NextID: string;
    public Expression: string;
    public Options: DialogOption[];
    public constructor(Data?: any)
    {
        this.Background = DEFAULT_BACKGROUND;
        this.Expression = DEFAULT_EXPRESSION;
        this.Options = [];
        if(Data)
        {
            this.ID = Data.id;
            this.Text = Data.text;
            this.Background = Data.background;
            this.CharacterID = Data.character;
            this.NextID = Data.to;
            this.Expression = Data.expression;
            if(Data.options)
            {
                this.Options = Data.options.map(option => new DialogOption(option, this.NextID));
            }
            else
            {
                let NextOption: DialogOption = new DialogOption(null);
                NextOption.Text = "< Next >";
                NextOption.NextID = this.NextID;
                this.Options = [NextOption];
            }
        }
    }
}