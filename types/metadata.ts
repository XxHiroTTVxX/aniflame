export type Metadata = {
    filter: any;
    providerId?: string;
    data?:       Datum[];
}

export type Datum = {
    id?:          string;
    description?: string;
    hasDub?:      boolean;
    img?:         string;
    isFiller?:    boolean;
    number?:      number;
    title?:       string;
    rating?:      null;
    updatedAt?:   number;
}