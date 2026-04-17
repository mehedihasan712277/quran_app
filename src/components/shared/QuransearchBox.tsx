"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Translation, SurahName } from "@/utils/types";

// ── Types ────────────────────────────────────────────────────────────────────

interface VerseResult {
    surahIndex: string;
    surahTitle: string;
    surahTitleAr: string;
    verseKey: string; // e.g. "verse_1"
    verseNumber: number; // 1-based
    translationText: string;
}

interface QuranSearchBoxProps {
    isOpen: boolean;
    onClose: () => void;
}

// ── Highlight helper ──────────────────────────────────────────────────────────

const highlightMatch = (text: string, term: string): React.ReactNode => {
    if (!term) return text;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) ? (
            <mark key={i} className="bg-yellow-200 text-gray-900 font-semibold not-italic rounded-sm px-0.5">
                {part}
            </mark>
        ) : (
            part
        ),
    );
};

// ── Component ─────────────────────────────────────────────────────────────────

const QuranSearchBox: React.FC<QuranSearchBoxProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [surahNames, setSurahNames] = useState<SurahName[]>([]);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const router = useRouter();

    // ── Fetch all translations + surah names once ──
    useEffect(() => {
        if (!isOpen) return;

        const load = async () => {
            setLoading(true);
            try {
                const [transRes, namesRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/translations`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahnames`),
                ]);
                const [transData, namesData] = await Promise.all([transRes.json(), namesRes.json()]);
                if (transData.success) setTranslations(transData.data);
                if (namesData.success) setSurahNames(namesData.data);
            } catch (err) {
                console.error("QuranSearchBox: failed to load data", err);
            } finally {
                setLoading(false);
            }
        };

        load();
        const id = setTimeout(() => inputRef.current?.focus(), 60);
        return () => clearTimeout(id);
    }, [isOpen]);

    // ── Build flat verse list from all translations ──
    const allVerses = useMemo<VerseResult[]>(() => {
        if (!translations.length || !surahNames.length) return [];

        const nameMap = new Map(surahNames.map((s) => [s.index, s]));
        const results: VerseResult[] = [];

        for (const translation of translations) {
            const surahName = nameMap.get(translation.index);
            if (!surahName) continue;

            for (const [key, text] of Object.entries(translation.verse)) {
                // key format: "verse_1", "verse_2", ...
                const verseNumber = parseInt(key.replace("verse_", ""), 10);
                results.push({
                    surahIndex: translation.index,
                    surahTitle: surahName.title,
                    surahTitleAr: surahName.titleAr,
                    verseKey: key,
                    verseNumber,
                    translationText: text,
                });
            }
        }

        return results;
    }, [translations, surahNames]);

    // ── Filter & rank results ──
    const filteredResults = useMemo<VerseResult[]>(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term || !allVerses.length) return [];

        const scored = allVerses
            .filter((v) => v.translationText.toLowerCase().includes(term))
            .map((v) => {
                const lower = v.translationText.toLowerCase();
                let score = 0;
                if (lower === term) score = 100;
                else if (lower.startsWith(term)) score = 80;
                else if (new RegExp(`\\b${term}`).test(lower)) score = 60;
                else score = 20;
                return { v, score };
            });

        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, 10).map((s) => s.v);
    }, [searchTerm, allVerses]);

    // ── Keep selected item scrolled into view ──
    useEffect(() => {
        if (selectedIndex < 0 || !listRef.current) return;
        const item = listRef.current.children[selectedIndex] as HTMLElement | undefined;
        item?.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((p) => (filteredResults.length === 0 ? -1 : p < filteredResults.length - 1 ? p + 1 : 0));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((p) => (filteredResults.length === 0 ? -1 : p > 0 ? p - 1 : filteredResults.length - 1));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
                    navigate(filteredResults[selectedIndex]);
                }
                break;
            case "Escape":
                onClose();
                break;
        }
    };

    const navigate = (verse: VerseResult) => {
        onClose();
        // Navigate to surah page and anchor to the specific ayah
        router.push(`/surah/${verse.surahIndex}#${verse.verseKey}`);
    };

    if (!isOpen) return null;

    const hasQuery = searchTerm.trim() !== "";

    return (
        <>
            {/* ── Backdrop ── */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]" onClick={onClose} aria-hidden="true" />

            {/* ── Search Panel ── */}
            <div className="fixed top-0 left-0 right-0 z-[120] flex justify-center px-4 pt-6 sm:pt-16 animate-qsb-down">
                <div className="w-full max-w-2xl bg-bg-main rounded-2xl shadow-2xl overflow-hidden border border-border">
                    {/* ── Input row ── */}
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                        {/* Quran / search icon */}
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5 text-brand shrink-0"
                        >
                            <path d="m21 21-4.34-4.34" />
                            <circle cx="11" cy="11" r="8" />
                        </svg>

                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search by translation…"
                            className="flex-1 text-base text-text-primary placeholder:text-text-muted outline-none bg-transparent"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setSelectedIndex(-1);
                            }}
                            onKeyDown={handleKeyDown}
                            aria-label="Search Quran by translation"
                            aria-autocomplete="list"
                            aria-activedescendant={selectedIndex >= 0 ? `qsb-result-${selectedIndex}` : undefined}
                            role="combobox"
                            aria-expanded={filteredResults.length > 0}
                        />

                        {searchTerm ? (
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedIndex(-1);
                                    inputRef.current?.focus();
                                }}
                                className="text-text-muted hover:text-text-primary transition-colors shrink-0"
                                aria-label="Clear search"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-[18px] h-[18px]"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors shrink-0 border border-border rounded px-2 py-0.5"
                                aria-label="Close"
                            >
                                ESC
                            </button>
                        )}
                    </div>

                    {/* ── Loading ── */}
                    {loading && (
                        <div className="py-10 text-center text-text-muted">
                            <div className="inline-block w-5 h-5 border-2 border-border border-t-brand rounded-full animate-spin mb-2" />
                            <p className="text-sm">Loading translations…</p>
                        </div>
                    )}

                    {/* ── Results list ── */}
                    {!loading && hasQuery && (
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar" role="listbox">
                            {filteredResults.length > 0 ? (
                                <>
                                    <div className="px-5 pt-3 pb-1 text-xs text-text-muted font-medium tracking-widest uppercase">
                                        {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""}
                                    </div>
                                    <ul ref={listRef} className="pb-2">
                                        {filteredResults.map((verse, i) => {
                                            const isActive = i === selectedIndex;
                                            return (
                                                <li
                                                    key={`${verse.surahIndex}-${verse.verseKey}`}
                                                    id={`qsb-result-${i}`}
                                                    role="option"
                                                    aria-selected={isActive}
                                                >
                                                    <button
                                                        className={`w-full text-left flex items-start gap-4 px-5 py-3.5 transition-colors ${
                                                            isActive ? "bg-brand text-white" : "hover:bg-bg-soft text-text-primary"
                                                        }`}
                                                        onClick={() => navigate(verse)}
                                                        onMouseEnter={() => setSelectedIndex(i)}
                                                    >
                                                        {/* Verse number badge */}
                                                        <div
                                                            className={`shrink-0 w-10 h-10 rounded-lg flex flex-col items-center justify-center text-xs font-bold leading-none ${
                                                                isActive ? "bg-white/20 text-white" : "bg-brand/10 text-brand"
                                                            }`}
                                                        >
                                                            <span className="text-[10px] font-medium opacity-70">{verse.surahIndex}</span>
                                                            <span className="text-base">{verse.verseNumber}</span>
                                                        </div>

                                                        {/* Text content */}
                                                        <div className="flex-1 min-w-0">
                                                            {/* Surah name row */}
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <span
                                                                    className={`text-xs font-semibold tracking-wide ${
                                                                        isActive ? "text-white/80" : "text-brand"
                                                                    }`}
                                                                >
                                                                    {verse.surahTitle}
                                                                </span>
                                                                <span className={`text-xs ${isActive ? "text-white/40" : "text-text-disabled"}`}>
                                                                    ·
                                                                </span>
                                                                <span
                                                                    className={`text-xs font-arabic-naskh ${
                                                                        isActive ? "text-white/70" : "text-text-muted"
                                                                    }`}
                                                                >
                                                                    {verse.surahTitleAr}
                                                                </span>
                                                                <span
                                                                    className={`ml-auto shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                                                        isActive ? "bg-white/15 text-white/70" : "bg-bg-soft text-text-muted"
                                                                    }`}
                                                                >
                                                                    Ayah {verse.verseNumber}
                                                                </span>
                                                            </div>

                                                            {/* Translation snippet */}
                                                            <p
                                                                className={`text-sm leading-relaxed line-clamp-2 ${
                                                                    isActive ? "text-white/90" : "text-text-secondary"
                                                                }`}
                                                            >
                                                                {highlightMatch(verse.translationText, searchTerm)}
                                                            </p>
                                                        </div>

                                                        {/* Arrow */}
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className={`w-4 h-4 mt-1 shrink-0 ${isActive ? "text-white/60" : "text-text-disabled"}`}
                                                        >
                                                            <path d="M9 18l6-6-6-6" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            ) : (
                                /* ── Empty state ── */
                                <div className="py-14 text-center text-text-muted">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-10 h-10 mx-auto mb-3 opacity-40"
                                    >
                                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <p className="text-sm font-medium">No verses found for &ldquo;{searchTerm}&rdquo;</p>
                                    <p className="text-xs mt-1 text-text-disabled">Try different words from the translation</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Idle hint ── */}
                    {!loading && !hasQuery && (
                        <div className="py-10 text-center">
                            <p className="text-sm text-text-muted">Type a phrase from any Quranic translation…</p>
                            <p className="text-xs text-text-disabled mt-1">e.g. &ldquo;Most Gracious, Most Merciful&rdquo;</p>
                        </div>
                    )}

                    {/* ── Keyboard hint footer ── */}
                    {!loading && filteredResults.length > 0 && (
                        <div className="border-t border-border px-5 py-2 flex items-center gap-4 text-[11px] text-text-disabled">
                            <span>
                                <kbd className="font-mono">↑↓</kbd> navigate
                            </span>
                            <span>
                                <kbd className="font-mono">↵</kbd> open
                            </span>
                            <span>
                                <kbd className="font-mono">Esc</kbd> close
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes qsb-down {
                    from {
                        opacity: 0;
                        transform: translateY(-14px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-qsb-down {
                    animation: qsb-down 0.2s ease-out both;
                }
            `}</style>
        </>
    );
};

export default QuranSearchBox;
