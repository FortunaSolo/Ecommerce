import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] bg-primary-dark text-text-light flex justify-center items-center">
      {/* Background Image */}
      <Image
        src="/banner.jpg" // Change to the actual image file name
        alt="Shop the Best Products"
        fill
        style ={{objectFit: "cover"}}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      {/* Overlay Content */}
      <div className="relative z-10 text-center p-6">
        <h1 className="text-3xl md:text-5xl font-bold">Discover Amazing Deals</h1>
        <p className="mt-2 text-lg md:text-xl">Shop the best products at unbeatable prices!</p>
        <Link href = "/products" >  
        <button className="mt-4 px-6 py-3 bg-accent text-text-light rounded-lg hover:bg-primary-light transition">
          Shop Now
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
