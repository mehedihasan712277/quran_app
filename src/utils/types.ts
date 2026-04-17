// surah------------------------
export interface Juz {
    index: string;
    verse: {
        start: string;
        end: string;
    };
}

export interface Surah {
    _id: string;

    index: string;
    name: string;

    verse: Record<string, string>;

    count: number;

    juz: {
        index: string;
        verse: {
            start: string;
            end: string;
        };
    }[];

    createdAt?: string;
    updatedAt?: string;
}

export interface SurahResponse {
    success: boolean;
    data: Surah;
}

export interface AllSurahResponse {
    success: boolean;
    count: number;
    data: Surah[];
}

// translation------------------------
export interface Translation {
    _id: string;
    name: string;
    index: string;

    verse: Record<string, string>;

    count: number;

    createdAt?: string;
    updatedAt?: string;
}

export interface TranslationResponse {
    success: boolean;
    data: Translation;
}

export interface AllTranslationResponse {
    success: boolean;
    count: number;
    data: Translation[];
}

//surah names------------------------
export interface SurahName {
    _id: string;

    place: string;
    type: string;
    count: number;

    title: string;
    titleAr: string;

    index: string;
    pages: string;

    juz: {
        index: string;
        verse: {
            start: string;
            end: string;
        };
    }[];

    createdAt?: string;
    updatedAt?: string;
}

export interface SurahNameResponse {
    success: boolean;
    data: SurahName;
}

export interface AllSurahNameResponse {
    success: boolean;
    count: number;
    data: SurahName[];
}
