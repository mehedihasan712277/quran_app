import { SurahSettingsProvider } from "@/components/shared/Surahsettingscontext";
import AllSurahList from "@/components/ui/AllSurahList";
import MobileSettingsToggle from "@/components/ui/Mobilesettingstoggle";
import SettingsDrawer from "@/components/ui/Settingsdrawer";

const SurahLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SurahSettingsProvider>
            <div className="relative grid h-[calc(100vh-100px)] lg:grid-cols-4 px-4">
                {/* ── Surah list sidebar — desktop only ── */}
                <aside className="hidden overflow-y-auto custom-scrollbar lg:block lg:col-span-1 lg:pr-1">
                    <AllSurahList classes="grid grid-cols-1 gap-2" />
                </aside>

                {/* ── Main content ── */}
                <div className="col-span-4 overflow-y-auto custom-scrollbar lg:col-span-2 px-1">{children}</div>

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
