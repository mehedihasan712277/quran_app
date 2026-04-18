"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";

interface AyahSearchBoxProps {
    query: string;
    onQueryChange: (q: string) => void;
    onFocusChange: (focused: boolean) => void;
    translations: Record<string, string>;
    surahName: string;
}

const AyahSearchBox = ({ query, onQueryChange, onFocusChange, translations }: AyahSearchBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const matchCount = query.trim() ? Object.values(translations).filter((t) => t?.toLowerCase().includes(query.toLowerCase())).length : null;

    return (
        <div className="space-y-3">
            <div className="relative">
                <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={2} />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    onFocus={() => onFocusChange(true)}
                    onBlur={() => onFocusChange(false)}
                    placeholder="Search by translation…"
                    className="w-full rounded-xl border border-border bg-bg-soft py-2.5 pl-9 pr-9 text-sm text-text-primary placeholder:text-text-muted focus:border-brand/40 focus:bg-bg-main focus:outline-none focus:ring-1 focus:ring-brand/20"
                />
                {query && (
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onQueryChange("");
                            inputRef.current?.focus();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-muted hover:text-text-primary"
                    >
                        <X size={14} strokeWidth={2} />
                    </button>
                )}
            </div>

            {matchCount !== null && (
                <div className="text-xs">
                    {matchCount === 0 ? (
                        <span className="text-red-400">No verses matched</span>
                    ) : (
                        <span className="text-green-500">
                            {matchCount} verse{matchCount !== 1 ? "s" : ""} matched
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default AyahSearchBox;
