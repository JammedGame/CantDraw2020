export { SoundManager }

import * as TBX from "toybox-engine";

const VOLUME_FACTOR = 100;
const DEFAULT_MASTER_VOLUME = 1.0;
const DEFAULT_MUSIC_VOLUME = 0.4;
const DEFAULT_SOUND_VOLUME = 0.8;
const DEFAULT_MUSIC_NAME = "Default";

class SoundManager
{
    private static Current:SoundManager;
    private _Sounds:any;
    private _SoundsPaths:any[];
    private _Music:any;
    private _MusicPaths:any[];
    private _CurrentMusicName:string;
    private _MasterVolume:number;
    private _MusicVolume:number;
    private _SoundVolume:number;
    public get MasterVolume():number { return this._MasterVolume; }
    public set MasterVolume(Value:number) { this._MasterVolume = Value; this.UpdateVolumes(); }
    public static get MasterVolume():number { return this.Current._MasterVolume; }
    public static set MasterVolume(Value:number) { this.Current._MasterVolume = Value; this.Current.UpdateVolumes(); }
    public get MusicVolume():number { return this._MusicVolume; }
    public set MusicVolume(Value:number) { this._MusicVolume = Value; this.UpdateVolumes(); }
    public static get MusicVolume():number { return this.Current._MusicVolume; }
    public static set MusicVolume(Value:number) { this.Current._MusicVolume = Value; this.Current.UpdateVolumes(); }
    public get SoundVolume():number { return this._SoundVolume; }
    public set SoundVolume(Value:number) { this._SoundVolume = Value; this.UpdateVolumes(); }
    public static get SoundVolume():number { return this.Current._SoundVolume; }
    public static set SoundVolume(Value:number) { this.Current._SoundVolume = Value; this.Current.UpdateVolumes(); }
    public constructor(Old?:SoundManager)
    {
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Init();
            SoundManager.Current = this;
        }
    }
    private Init() : void
    {
        this._MasterVolume = DEFAULT_MASTER_VOLUME;
        this._MusicVolume = DEFAULT_MUSIC_VOLUME;
        this._SoundVolume = DEFAULT_SOUND_VOLUME;
        this._MusicPaths = [
            { Name:DEFAULT_MUSIC_NAME, File:"Music.mp3", Looped:true },
            { Name:"Dark", File:"DarkMusic.mp3", Looped:true }
        ];
        this._Music = {};
        for(let i in this._MusicPaths)
        {
            let Music:TBX.SoundObject = new TBX.SoundObject("Resources/Sounds/"+this._MusicPaths[i].File);
            Music.Autoplay = !!this._MusicPaths[i].Autoplay;
            Music.Looped = !!this._MusicPaths[i].Looped;
            Music.Volume = this._MusicPaths[i].Volume || VOLUME_FACTOR * DEFAULT_MUSIC_VOLUME;
            this._Music[this._MusicPaths[i].Name] = Music;
        }
        this.PlayMusic(DEFAULT_MUSIC_NAME);
        this._SoundsPaths = [
            { Name:"Special", File:"Special.wav" }
        ];
        this._Sounds = {};
        for(let i in this._SoundsPaths)
        {
            let Sound:TBX.SoundObject = new TBX.SoundObject("Resources/Sounds/"+this._SoundsPaths[i].File);
            Sound.Autoplay = !!this._SoundsPaths[i].Autoplay;
            Sound.Looped = !!this._SoundsPaths[i].Looped;
            Sound.Volume = this._SoundsPaths[i].Volume || VOLUME_FACTOR * DEFAULT_SOUND_VOLUME;
            this._Sounds[this._SoundsPaths[i].Name] = Sound;
        }
    }
    public Play(SoundName:string) : void
    {
        this._Sounds[SoundName].Play();
    }
    public static Play(SoundName:string) : void
    {
        this.Current.Play(SoundName);
    }
    public PlayMusic(MusicName:string) : void
    {
        if (!!MusicName && MusicName != this._CurrentMusicName)
        {
            if (this._Music.hasOwnProperty(this._CurrentMusicName))
            {
                this._Music[this._CurrentMusicName].Sound.stop();
            }
            if (this._Music.hasOwnProperty(MusicName))
            {
                this._Music[MusicName].Play();
            }
            this._CurrentMusicName = MusicName;
        }
    }
    public static PlayMusic(MusicName:string) : void
    {
        this.Current.PlayMusic(MusicName);
    }
    private UpdateVolumes() : void
    {
        for(let i in this._MusicPaths)
        {
            this._Music[this._MusicPaths[i].Name].Volume = this._MasterVolume * this._MusicVolume;
        }
        for(let i in this._SoundsPaths)
        {
            this._Sounds[this._SoundsPaths[i].Name].Volume = this._MasterVolume * this._SoundVolume;
        }
    }
    public static UpdateVolumes() : void
    {
        this.Current.UpdateVolumes();
    }
}