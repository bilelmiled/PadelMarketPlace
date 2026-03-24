import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Banner from "../components/Banner";
import adidas from "../assets/banner/adidas.jpg";
import head from "../assets/banner/head.jpg";
import nox from "../assets/banner/nox.jpg";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// SWIPER
import "swiper/css";
import "swiper/css/autoplay";

const Home = () => {
  const bannerSlides = [
    { url: adidas, title: "Adidas Collection", subtitle: "Dominate the court" },
    { url: head, title: "Head Padel", subtitle: "Power & Control" },
    {
      url: nox,
      title: "Nox Pro Series",
      subtitle: "Official World Padel Tour",
    },
  ];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products/all");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full py-10">
      <Banner slides={bannerSlides} />
      <div className="px-12">
        {products.length > 0 && (
          <Swiper
            key={products.length}
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            spaceBetween={30}
            slidesPerView={3}
            speed={800}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="bg-gray-100 rounded-xl shadow p-4 hover:shadow-lg transition">
                    <div className="h-[350px] flex items-center justify-center">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="h-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-6 right-6 bg-[#00acc1] text-white px-5 py-2 rounded-full font-bold text-lg shadow-xl">
                        {product.price} €
                      </div>
                    </div>

                    <div className="p-10 text-center bg-gray-100">
                      <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 text-xl font-medium mb-8">
                        Padel Elite Series
                      </p>
                      <button className="w-full bg-black text-white font-extrabold py-5 rounded-2xl hover:bg-[#00acc1] hover:scale-[1.02] transition-all duration-300 uppercase tracking-[0.2em] text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Home;
