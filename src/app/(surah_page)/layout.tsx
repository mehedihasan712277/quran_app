import AllSurahList from "@/components/ui/AllSurahList";

const SurahLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-4 h-[calc(100vh-100px)]">
            <div className="col-span-1  overflow-y-auto custom-scrollbar ">
                <AllSurahList classes="grid grid-cols-1 gap-4"></AllSurahList>
            </div>
            <div className="col-span-2  overflow-y-auto custom-scrollbar">{children}</div>
            <div className="bg-bg-soft col-span-1  overflow-y-auto custom-scrollbar">hi</div>
        </div>
    );
};

export default SurahLayout;
