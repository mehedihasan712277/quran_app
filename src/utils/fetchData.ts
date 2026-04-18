import {
    Surah,
    AllSurahResponse,
    SurahResponse,
    SurahName,
    AllSurahNameResponse,
    SurahNameResponse,
    Translation,
    AllTranslationResponse,
    TranslationResponse,
} from "./types";

// ---------------------------------------surah-------------------------------------------------

export const getSurahs = async (): Promise<Surah[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch surahs");

    const result: AllSurahResponse = await res.json();
    return result.data;
};

export const getSingleSurah = async (index: string): Promise<Surah> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs/${index}`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch surah");

    const result: SurahResponse = await res.json();
    return result.data;
};

// ---------------------------------------Translation--------------------------------------------

export const getTranslations = async (): Promise<Translation[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translations`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch surahs");

    const result: AllTranslationResponse = await res.json();
    return result.data;
};

export const getSingleTranslation = async (index: string): Promise<Translation> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translations/${index}`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch surah");

    const result: TranslationResponse = await res.json();
    return result.data;
};

// ---------------------------------------surah names--------------------------------------------

export const getSurahNames = async (): Promise<SurahName[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahnames`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch surahs");

    const result: AllSurahNameResponse = await res.json();
    return result.data;
};

export const getSingleSurahName = async (index: string): Promise<SurahName> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahnames/${index}`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch surah");

    const result: SurahNameResponse = await res.json();
    return result.data;
};
