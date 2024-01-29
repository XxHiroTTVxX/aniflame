export type Sources = {
    sources?:   Source[];
    subtitles?: Subtitle[];
    audio?:     Audio[];
    intro?:     Tro;
    outro?:     Tro;
}

export type Audio = {
    url?:      string;
    name?:     string;
    language?: string;
}

export type Tro = {
    start?: string;
    end?:   string;
}

export type Source = {
    url?:     string;
    quality?: string;
}

export type Subtitle = {
    url?:  string;
    lang?: string;
}
