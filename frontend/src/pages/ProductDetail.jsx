import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetail = () => {
  const id = useParams().id; 
  const [productDetails, setProductDetails] = useState(null); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  const handleNextImage = () => {
    if (productDetails && productDetails.images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % productDetails.images.length,
      );
    }
  };
  const handlePrevImage = () => {
    if (productDetails && productDetails.images) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + productDetails.images.length) %
          productDetails.images.length,
      );
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/product/${id}`);
        const data = response.data;
        console.log("Détails du produit :", data); 
        setProductDetails(data); 
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du produit :",
          error,
        );
      }
    };
    fetchProductDetails();
  }, [id]);

  return (
    <div className="p-4">
      {productDetails ? (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">{productDetails.title}</h2>
          <div className="relative items-center justify-center mb-4">
            <img
              src={productDetails.images?.[currentImageIndex]}
              alt={productDetails.title}
              className="w-full h-auto"
            />
            {productDetails.images && productDetails.images.length > 1 && (
              <>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productDetails.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white scale-125"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handlePrevImage}
                  className=" absolute top-1/2 -translate-y-1/2 left-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 -translate-y-1/2 right-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          <p className="text-gray-700 mb-2">{productDetails.description}</p>
          <p className="text-xl font-bold text-padel">
            {productDetails.price} €
          </p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetail;
