export type Schedule = {
    [key: string]: Day[];
    sunday:    Day[];
    monday:    Day[];
    tuesday:   Day[];
    wednesday: Day[];
    thursday:  Day[];
    friday:    Day[];
    saturday:  Day[];
}
export type Day = {
providerId(providerId: any): unknown;
    id:                string;
    slug:              string;
    coverImage:        string;
    bannerImage:       string;
    trailer:           string;
    status:            string;
    season:            string;
    title:             Title;
    currentEpisode:    number;
    mappings:          Mapping[];
    synonyms:          string[];
    countryOfOrigin:   string;
    description:       string;
    duration:          number;
    color:             string;
    year:              number;
    rating:            Rating;
    popularity:        Rating;
    type:              RelationType;
    format:            string;
    relations:         Relation[];
    totalEpisodes:     number;
    genres:            string[];
    tags:              string[];
    episodes:          Episodes;
    averageRating:     number;
    averagePopularity: number;
    artwork:           Artwork[];
    characters:        Character[];
    airingAt:          number;
    airingEpisode:     number;
}


export type Artwork = {
    [x: string]: string | undefined;
        img:        string;
        type:       ArtworkType;
        providerId: ProviderID;
    }
    
    export enum ProviderID {
        Anilist = "anilist",
        Kitsu = "kitsu",
        Tvdb = "tvdb",
    }
    
    
    export enum ArtworkType {
        Banner = "banner",
        ClearArt = "clear_art",
        ClearLogo = "clear_logo",
        Icon = "icon",
        Poster = "poster",
        TopBanner = "top_banner",
    }
    
export type Character = {
    name:       null | string;
    image:      null | string;
    voiceActor: VoiceActor;
}

export type VoiceActor = {
    name:  null | string;
    image: null | string;
}

export type CountryOfOrigin = "CN" | "JP";

export type Episodes = {
    data:   Datum[];
    latest: Latest;
}

export type Datum = {
    episodes:   Episode[];
    providerId: ProviderID;
}

export type Episode = {
    id:          string;
    img:         null | string;
    title:       string;
    hasDub:      boolean;
    number:      number;
    rating:      null;
    isFiller:    boolean;
    updatedAt:   number;
    description: null;
}

export type Latest = {
    updatedAt:     number;
    latestTitle:   string;
    latestEpisode: number;
}

export type Format = "ONA" | "TV" | "UNKNOWN" | "TV_SHORT" | "MANGA" | "MOVIE" | "SPECIAL" | "OVA" | "ONE_SHOT" | "MUSIC" | "NOVEL";

export type Mapping = {
    id:           string;
    providerId:   ProviderID;
    similarity:   number;
    providerType: ProviderTypeEnum;
}

export type ProviderTypeEnum = "ANIME" | "META";

export type RatingClass = {
    anilist?: number;
    anidb?:   number;
    tmdb?:    number;
    mal?:     number;
    kitsu?:   number;
}

export type Relation = {
    id:           string;
    type:         RelationType;
    title:        Title;
    format:       Format | null;
    relationType: RelationTypeEnum;
}

export type RelationTypeEnum = "SOURCE" | "PREQUEL" | "ALTERNATIVE" | "SIDE_STORY" | "SUMMARY" | "OTHER" | "ADAPTATION" | "PARENT" | "CHARACTER" | "SPIN_OFF" | "SEQUEL";

export type Title = {
    native:  string;
    romaji:  string;
    english: null | string;
}

export type RelationType = "MANGA" | "ANIME";

export type Season = "UNKNOWN" | "FALL" | "SUMMER" | "SPRING" | "WINTER";

export type Status = "RELEASING" | "FINISHED" | "NOT_YET_RELEASED";


export type TuesdayPopularity = {
    anilist: number;
    tmdb?:   number;
}

export type Rating = {
    anilist: number;
}