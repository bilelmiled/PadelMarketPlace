import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import des modules nécessaires
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// --- CRITIQUE : Import des styles Swiper ---
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Absolument nécessaire pour le fondu !

const Banner = ({ slides }) => {
  return (
    <div className="w-full mb-10 rounded-xl overflow-hidden shadow-lg">
      <Swiper
        // Configuration de l'effet
        effect={'fade'} 
        fadeEffect={{ crossFade: true }} // Rend la transition plus propre
        
        // Configuration de la boucle infinie
        loop={true} 
        slidesPerView={1}
        
        // Configuration de l'autoplay
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        
        // Configuration des contrôles
        pagination={{ clickable: true }}
        navigation={true}
        
        // Ajout des modules dans Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        
        className="h-[300px] md:h-[500px] lg:h-[700px] w-full"
      >
        {(slides || []).map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              
              <div className="relative text-center text-white px-4">
                <h2 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-2xl uppercase tracking-tighter">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-3xl font-medium drop-shadow-lg mb-8">
                  {slide.subtitle}
                </p>
                <button className="bg-yellow-400 text-black px-10 py-4 rounded-full font-black text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all shadow-xl">
                  SHOP NOW
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;