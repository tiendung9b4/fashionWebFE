import React from "react";
import background from "../assets/image/bg2.jpg";
import BannerSlide from "./banner";

const data = {
  slide: {
    data: [
      {
        image_url: "/images/background.jpg",
      },
      {
        image_url: "/images/background2.jpg",
      },
      {
        image_url: "/images/bg3.png",
      },
      {
        image_url: "/images/bg4.jpg",
      },
      {
        image_url: "/images/bg5.jpg",
      },
      {
        image_url: "/images/bg6.jpg",
      },
      {
        image_url: "/images/bg7.jpg",
      },
    ]
  }
}

export default function Home() {
  return (
    <>
      <BannerSlide
        banners={data?.slide?.data}
        className="hidden md:block z-0"
        isFullPage
        isHead
      />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: 'cover'
        }}
        className="bg-gray-100 min-h-screen flex justify-center items-center"
      >
        <div className="max-w-xl text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Our E-commerce Store
          </h1>
          <p className="text-lg mb-6">
            Discover amazing products at great prices!
          </p>
          <a
            href="/products"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Shop Now
          </a>
        </div>
      </div>
    </>
  );
}
