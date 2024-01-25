
export type Info = {
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
    popularity:        Popularity;
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
    name:       string;
    image:      string;
    voiceActor: VoiceActor;
}

export type VoiceActor = {
    name:  string;
    image: null | string;
}

export type Episodes = {
    data:   Datum[];
    latest: Latest;
}

export type Datum = {
    episodes:   Episode[];
    providerId: string;
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

export type Mapping = {
    id:           string;
    providerId:   string;
    similarity:   number;
    providerType: string;
}

export type Popularity = {
    anidb:   number;
    anilist: number;
}

export type Rating = {
    anidb:   number;
    kitsu:   number;
    anilist: number;
}

export type Relation = {
    id:           string;
    type:         RelationType;
    title:        Title;
    format:       null | string;
    relationType: RelationTypeEnum;
}

export enum RelationTypeEnum {
    Alternative = "ALTERNATIVE",
    Character = "CHARACTER",
    Other = "OTHER",
    Prequel = "PREQUEL",
    SideStory = "SIDE_STORY",
    Source = "SOURCE",
    Summary = "SUMMARY",
}

export type Title = {
    native:  string;
    romaji:  string;
    english: null | string;
}

export enum RelationType {
    Anime = "ANIME",
    Manga = "MANGA",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toInfo(json: string): Info {
        return cast(JSON.parse(json), r("Info"));
    }

    public static infoToJson(value: Info): string {
        return JSON.stringify(uncast(value, r("Info")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Info": o([
        { json: "id", js: "id", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "coverImage", js: "coverImage", typ: "" },
        { json: "bannerImage", js: "bannerImage", typ: "" },
        { json: "trailer", js: "trailer", typ: "" },
        { json: "status", js: "status", typ: "" },
        { json: "season", js: "season", typ: "" },
        { json: "title", js: "title", typ: r("Title") },
        { json: "currentEpisode", js: "currentEpisode", typ: 0 },
        { json: "mappings", js: "mappings", typ: a(r("Mapping")) },
        { json: "synonyms", js: "synonyms", typ: a("") },
        { json: "countryOfOrigin", js: "countryOfOrigin", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "duration", js: "duration", typ: 0 },
        { json: "color", js: "color", typ: "" },
        { json: "year", js: "year", typ: 0 },
        { json: "rating", js: "rating", typ: r("Rating") },
        { json: "popularity", js: "popularity", typ: r("Popularity") },
        { json: "type", js: "type", typ: r("RelationType") },
        { json: "format", js: "format", typ: "" },
        { json: "relations", js: "relations", typ: a(r("Relation")) },
        { json: "totalEpisodes", js: "totalEpisodes", typ: 0 },
        { json: "genres", js: "genres", typ: a("") },
        { json: "tags", js: "tags", typ: a("") },
        { json: "episodes", js: "episodes", typ: r("Episodes") },
        { json: "averageRating", js: "averageRating", typ: 3.14 },
        { json: "averagePopularity", js: "averagePopularity", typ: 3.14 },
        { json: "artwork", js: "artwork", typ: a(r("Artwork")) },
        { json: "characters", js: "characters", typ: a(r("Character")) },
    ], false),
    "Artwork": o([
        { json: "img", js: "img", typ: "" },
        { json: "type", js: "type", typ: r("ArtworkType") },
        { json: "providerId", js: "providerId", typ: r("ProviderID") },
    ], false),
    "Character": o([
        { json: "name", js: "name", typ: "" },
        { json: "image", js: "image", typ: "" },
        { json: "voiceActor", js: "voiceActor", typ: r("VoiceActor") },
    ], false),
    "VoiceActor": o([
        { json: "name", js: "name", typ: "" },
        { json: "image", js: "image", typ: u(null, "") },
    ], false),
    "Episodes": o([
        { json: "data", js: "data", typ: a(r("Datum")) },
        { json: "latest", js: "latest", typ: r("Latest") },
    ], false),
    "Datum": o([
        { json: "episodes", js: "episodes", typ: a(r("Episode")) },
        { json: "providerId", js: "providerId", typ: "" },
    ], false),
    "Episode": o([
        { json: "id", js: "id", typ: "" },
        { json: "img", js: "img", typ: u(null, "") },
        { json: "title", js: "title", typ: "" },
        { json: "hasDub", js: "hasDub", typ: true },
        { json: "number", js: "number", typ: 0 },
        { json: "rating", js: "rating", typ: null },
        { json: "isFiller", js: "isFiller", typ: true },
        { json: "updatedAt", js: "updatedAt", typ: 0 },
        { json: "description", js: "description", typ: null },
    ], false),
    "Latest": o([
        { json: "updatedAt", js: "updatedAt", typ: 0 },
        { json: "latestTitle", js: "latestTitle", typ: "" },
        { json: "latestEpisode", js: "latestEpisode", typ: 0 },
    ], false),
    "Mapping": o([
        { json: "id", js: "id", typ: "" },
        { json: "providerId", js: "providerId", typ: "" },
        { json: "similarity", js: "similarity", typ: 3.14 },
        { json: "providerType", js: "providerType", typ: "" },
    ], false),
    "Popularity": o([
        { json: "anidb", js: "anidb", typ: 0 },
        { json: "anilist", js: "anilist", typ: 0 },
    ], false),
    "Rating": o([
        { json: "anidb", js: "anidb", typ: 3.14 },
        { json: "kitsu", js: "kitsu", typ: 3.14 },
        { json: "anilist", js: "anilist", typ: 3.14 },
    ], false),
    "Relation": o([
        { json: "id", js: "id", typ: "" },
        { json: "type", js: "type", typ: r("RelationType") },
        { json: "title", js: "title", typ: r("Title") },
        { json: "format", js: "format", typ: u(null, "") },
        { json: "relationType", js: "relationType", typ: r("RelationTypeEnum") },
    ], false),
    "Title": o([
        { json: "native", js: "native", typ: "" },
        { json: "romaji", js: "romaji", typ: "" },
        { json: "english", js: "english", typ: u(null, "") },
    ], false),
    "ProviderID": [
        "anilist",
        "kitsu",
        "tvdb",
    ],
    "ArtworkType": [
        "banner",
        "clear_art",
        "clear_logo",
        "icon",
        "poster",
        "top_banner",
    ],
    "RelationTypeEnum": [
        "ALTERNATIVE",
        "CHARACTER",
        "OTHER",
        "PREQUEL",
        "SIDE_STORY",
        "SOURCE",
        "SUMMARY",
    ],
    "RelationType": [
        "ANIME",
        "MANGA",
    ],
};
