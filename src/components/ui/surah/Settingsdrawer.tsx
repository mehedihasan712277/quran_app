"use client";

import { FontFamily, useSurahSettings } from "@/components/shared/Surahsettingscontext";
import { X, Type, Languages, SlidersHorizontal } from "lucide-react";

const SectionLabel = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
        <Icon size={11} strokeWidth={2.5} />
        {label}
    </div>
);

const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-5 w-9 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${
            checked ? "bg-brand" : "bg-border"
        }`}
    >
        <span
            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                checked ? "translate-x-4" : "translate-x-0"
            }`}
        />
    </button>
);

const SizeStepRow = ({
    steps,
    value,
    min,
    max,
    onChange,
}: {
    steps: { label: string; value: number }[];
    value: number;
    min: number;
    max: number;
    onChange: (v: number) => void;
}) => (
    <>
        <div className="flex gap-1.5">
            {steps.map(({ label, value: stepVal }) => (
                <button
                    key={stepVal}
                    onClick={() => onChange(stepVal)}
                    className={`flex-1 rounded-lg border py-1.5 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                        value === stepVal
                            ? "border-brand/40 bg-brand/5 text-brand ring-1 ring-brand/20"
                            : "border-border bg-bg-soft text-text-muted hover:border-brand/20"
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-brand"
        />
    </>
);

const SettingsDrawer = () => {
    const {
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
        translationFontSize,
        setTranslationFontSize,
        showAllTranslations,
        setShowAllTranslations,
        drawerOpen,
        setDrawerOpen,
    } = useSurahSettings();

    const fontOptions: { value: FontFamily; label: string; preview: string; className: string }[] = [
        { value: "naskh", label: "Naskh", preview: "نَسْخ", className: "font-arabic-naskh" },
        { value: "kufi", label: "Kufi", preview: "كُوفِي", className: "font-arabic-kufi" },
    ];

    const arabicSizeSteps = [
        { label: "XS", value: 18 },
        { label: "S", value: 22 },
        { label: "M", value: 26 },
        { label: "L", value: 30 },
        { label: "XL", value: 36 },
    ];

    const translationSizeSteps = [
        { label: "XS", value: 11 },
        { label: "S", value: 13 },
        { label: "M", value: 15 },
        { label: "L", value: 17 },
        { label: "XL", value: 20 },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {drawerOpen && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden" onClick={() => setDrawerOpen(false)} />
            )}

            <div
                className={`
                    fixed right-0 top-0 z-40 h-full w-72 overflow-y-auto custom-scrollbar
                    border-l border-border bg-bg-main
                    transition-transform duration-300 ease-in-out
                    ${drawerOpen ? "translate-x-0 px-4" : "translate-x-full"}
                    lg:relative lg:right-auto lg:top-auto lg:z-auto
                    lg:h-full lg:w-full lg:translate-x-0 lg:border-none
                `}
            >
                {/* ── Header ── */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-bg-main py-4">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal size={14} strokeWidth={2.5} className="text-brand" />
                        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-text-primary">Display Settings</h3>
                    </div>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-bg-soft hover:text-text-primary lg:hidden"
                    >
                        <X size={15} />
                    </button>
                </div>

                <div className="space-y-7 py-6">
                    {/* ── Font Family ── */}
                    <div className="space-y-3">
                        <SectionLabel icon={Type} label="Arabic Font" />
                        <div className="grid grid-cols-2 gap-2">
                            {fontOptions.map(({ value, label, preview, className }) => (
                                <button
                                    key={value}
                                    onClick={() => setFontFamily(value)}
                                    className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-3.5 transition-colors ${
                                        fontFamily === value
                                            ? "border-brand/40 bg-brand/5 ring-1 ring-brand/20"
                                            : "border-border bg-bg-soft hover:border-brand/20 hover:bg-bg-main"
                                    }`}
                                >
                                    <span dir="rtl" lang="ar" className={`text-xl leading-none text-text-primary ${className}`}>
                                        {preview}
                                    </span>
                                    <span
                                        className={`text-[10px] font-semibold uppercase tracking-wide ${
                                            fontFamily === value ? "text-brand" : "text-text-muted"
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Arabic Font Size ── */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <SectionLabel icon={Type} label="Arabic Size" />
                            <span className="text-[11px] font-semibold text-brand">{fontSize}px</span>
                        </div>
                        <SizeStepRow steps={arabicSizeSteps} value={fontSize} min={18} max={38} onChange={setFontSize} />
                    </div>

                    {/* ── Translation Font Size ── */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <SectionLabel icon={Languages} label="Translation Size" />
                            <span className="text-[11px] font-semibold text-brand">{translationFontSize}px</span>
                        </div>
                        <SizeStepRow steps={translationSizeSteps} value={translationFontSize} min={11} max={22} onChange={setTranslationFontSize} />
                    </div>

                    {/* ── Translation toggle ── */}
                    <div className="space-y-3">
                        <SectionLabel icon={Languages} label="Translation" />
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setShowAllTranslations(!showAllTranslations)}
                            onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? setShowAllTranslations(!showAllTranslations) : undefined)}
                            className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                                showAllTranslations ? "border-brand/40 bg-brand/5" : "border-border bg-bg-soft hover:border-brand/20"
                            }`}
                        >
                            <div className="text-left">
                                <p className={`text-sm font-medium ${showAllTranslations ? "text-brand" : "text-text-secondary"}`}>
                                    Show all translations
                                </p>
                                <p className="mt-0.5 text-[11px] text-text-muted">
                                    {showAllTranslations ? "Shown for every verse" : "Click per verse to reveal"}
                                </p>
                            </div>
                            <span onClick={(e) => e.stopPropagation()}>
                                <ToggleSwitch checked={showAllTranslations} onChange={() => setShowAllTranslations(!showAllTranslations)} />
                            </span>
                        </div>
                    </div>

                    {/* ── Live preview ── */}
                    <div className="space-y-2.5 rounded-xl border border-border bg-bg-soft p-4">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-text-disabled">Preview</span>
                        <p
                            dir="rtl"
                            lang="ar"
                            style={{ fontSize: `${fontSize}px` }}
                            className={`text-right leading-loose text-text-primary ${
                                fontFamily === "naskh" ? "font-arabic-naskh" : "font-arabic-kufi"
                            }`}
                        >
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </p>
                        {showAllTranslations && (
                            <p
                                style={{ fontSize: `${translationFontSize}px` }}
                                className="border-t border-border pt-2.5 leading-relaxed text-text-secondary"
                            >
                                In the name of Allah, the Entirely Merciful, the Especially Merciful.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsDrawer;
