import { SurahSettingsProvider } from "@/components/shared/Surahsettingscontext";
import AllSurahList from "@/components/ui/home/AllSurahList";
import MobileSettingsToggle from "@/components/ui/surah/Mobilesettingstoggle";
import SettingsDrawer from "@/components/ui/surah/Settingsdrawer";

const SurahLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SurahSettingsProvider>
            <div className="relative grid h-[calc(100vh-100px)] lg:grid-cols-3 xl:grid-cols-4 lg:px-4 py-2">
                {/* ── Surah list sidebar — desktop only ── */}
                <aside className="hidden overflow-y-auto custom-scrollbar xl:block xl:col-span-1 xl:pr-1">
                    <AllSurahList classes="grid grid-cols-1 gap-2" />
                </aside>

                {/* ── Main content ── */}
                <div className="col-span-4 overflow-y-auto custom-scrollbar lg:col-span-2 pl-4 pr-4 lg:pl-0 lg:pr-1 xl:px-1">{children}</div>

                {/* ── Settings drawer — right col on desktop, overlay on mobile ── */}
                <aside className="lg:col-span-1 lg:overflow-y-auto lg:custom-scrollbar lg:pl-1">
                    <SettingsDrawer />
                </aside>
            </div>

            {/* ── Mobile floating toggle button ── */}
            <MobileSettingsToggle />
        </SurahSettingsProvider>
    );
};

export default SurahLayout;
