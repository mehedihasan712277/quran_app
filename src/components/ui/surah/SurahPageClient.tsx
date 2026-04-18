"use client";

import { useState } from "react";
import AyahSearchBox from "./AyahSearchBox";
import AyathCard from "./AyathCard";
interface Props {
    verses: [string, string][];
    translations: Record<string, string>;
    surahName: string;
}

const SurahPageClient = ({ verses, translations, surahName }: Props) => {
    const [query, setQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);

    const isSearchActive = searchFocused || query.trim().length > 0;

    const displayVerses = query.trim() ? verses.filter(([key]) => translations[key]?.toLowerCase().includes(query.toLowerCase())) : verses;

    return (
        <>
            {/* ── Search input (hero) ── */}
            <AyahSearchBox
                query={query}
                onQueryChange={setQuery}
                onFocusChange={setSearchFocused}
                translations={translations}
                surahName={surahName}
            />

            {/* ── Verse list ── */}
            <section className="py-4 space-y-4">
                {displayVerses.length === 0 && query.trim() ? (
                    <div className="flex flex-col items-center gap-2 py-10 text-center text-text-muted">
                        <p className="text-sm">No verses matched &ldquo;{query}&rdquo;</p>
                    </div>
                ) : (
                    displayVerses.map(([key, text], i) => (
                        <AyathCard
                            key={key}
                            verseNumber={i + 1}
                            surahName={surahName}
                            verseKey={key}
                            arabicText={text}
                            translation={translations[key]}
                            forceShowTranslation={isSearchActive}
                            hideToggle={isSearchActive}
                            highlightQuery={query}
                        />
                    ))
                )}
            </section>
        </>
    );
};

export default SurahPageClient;
