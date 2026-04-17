"use client";

import { SlidersHorizontal } from "lucide-react";
import { useSurahSettings } from "../shared/Surahsettingscontext";

const MobileSettingsToggle = () => {
    const { setDrawerOpen } = useSurahSettings();

    return (
        <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open display settings"
            className="fixed bottom-6 right-5 z-20 flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand/30 transition-transform duration-150 active:scale-95 lg:hidden"
        >
            <SlidersHorizontal size={14} strokeWidth={2.5} />
            Settings
        </button>
    );
};

export default MobileSettingsToggle;
