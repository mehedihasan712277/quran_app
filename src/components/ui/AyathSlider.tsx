"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";

const ayahs = [
    {
        id: 1,
        arabic: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ",
        translation:
            "Allah does not burden a soul beyond what it can bear. It will have the reward of what good it has earned, and bear the burden of what evil it has done.",
        surah: "Al-Baqarah",
        ayah: 286,
    },
    {
        id: 2,
        arabic: "وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥ",
        translation:
            "And whoever fears Allah — He will make for him a way out, and provide for him from where he does not expect. And whoever relies upon Allah — then He is sufficient for him.",
        surah: "At-Talaq",
        ayah: 2,
    },
    {
        id: 3,
        arabic: "وَٱصْبِرْ وَمَا صَبْرُكَ إِلَّا بِٱللَّهِ وَلَا تَحْزَنْ عَلَيْهِمْ وَلَا تَكُ فِى ضَيْقٍ مِّمَّا يَمْكُرُونَ إِنَّ ٱللَّهَ مَعَ ٱلَّذِينَ ٱتَّقَوا۟ وَّٱلَّذِينَ هُم مُّحْسِنُونَ",
        translation:
            "Be patient, and your patience is only through Allah. Do not grieve over them, nor be distressed by what they plot. Indeed, Allah is with those who are mindful of Him and those who do good.",
        surah: "An-Nahl",
        ayah: 127,
    },
    {
        id: 4,
        arabic: "قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ",
        translation:
            "Say, O My servants who have transgressed against themselves: do not despair of Allah's mercy, for Allah forgives all sins. He is indeed the Forgiver, the Most Merciful.",
        surah: "Az-Zumar",
        ayah: 53,
    },
];

const AyathSlider = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop
            modules={[Autoplay]}
            className="mySwiper w-70! sm:w-150! mx-auto!"
        >
            {ayahs.map((item) => (
                <SwiperSlide key={item.id} className="w-full!">
                    <div className="space-y-3 w-70 sm:w-150">
                        <p className="text-center font-arabic-naskh line">{item.arabic}</p>

                        <p className="text-center">{item.translation}</p>

                        <p className="text-center text-sm text-text-muted">
                            {item.surah} ({item.ayah})
                        </p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default AyathSlider;
