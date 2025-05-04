import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import carOne from "../../public/images/products/category-5.avif";
import carTwo from "../../public/images/products/category-4.avif";
import carThree from "../../public/images/products/category-3.avif";
import carFour from "../../public/images/products/category-1.avif";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaInstagram } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Carousel: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const nextButton = () => sliderRef.current?.slickNext();
  const prevButton = () => sliderRef.current?.slickPrev();

  const carData = [
    {
      image: carOne,
      title: "Sporty Coupe",
      description: "Sleek design, high performance — built for speed lovers.",
    },
    {
      image: carTwo,
      title: "Luxury Sedan",
      description: "Comfort meets class with top-notch features and elegance.",
    },
    {
      image: carThree,
      title: "Urban SUV",
      description: "Spacious and powerful — perfect for families and city drives.",
    },
    {
      image: carFour,
      title: "Electric Future",
      description: "Eco-friendly innovation with futuristic design and tech.",
    },
  ];

  return (
    <div className="carousel-container px-4">
       <section className="py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <div className="max-w-3xl text-start">
          <h1 className="text-5xl sm:text-4xl md:text-5xl font-bold mb-4 uppercase">
            Featured Drops: <span className="text-primary">Stand Out, Stay Ahead</span>
          </h1>
          <p className="text-base sm:text-base text-gray-600">
            Use prebuilt templates and components for a professional, stunning look. Save time and focus on content with our user-friendly, customizable design solutions.
          </p>
        </div>
      </section>

      <Slider {...settings} ref={sliderRef}>
        {carData.map((car, idx) => (
          <div key={idx} className="p-4">
            <div className="relative overflow-hidden rounded-2xl shadow-md">
              <Image
                src={car.image}
                alt={car.title}
                width={500}
                height={500}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent text-white p-4 flex flex-col justify-end">
                <h2 className="text-2xl font-semibold mb-2 px-2">{car.title}</h2>
                <p className="text-sm mb-4  px-2">{car.description}</p>
                <button className="w-fit px-4 py-2 bg-white text-black font-medium rounded-3xl hover:bg-red-500 hover:text-white transition flex items-center gap-2">
                  <FaInstagram className="text-xl" />
                  <span>Explore Our Instagram</span> {/* Change the text here */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom controls */}
      
      <div className="flex justify-start gap-4 pt-10 pb-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <button
          onClick={prevButton}
          className="px-4 py-4 bg-black text-white rounded-full hover:bg-red-500 flex items-center gap-2"
        >
          <IoIosArrowBack className="text-xl" />
        </button>
        <button
          onClick={nextButton}
          className="px-4 py-4 bg-black text-white rounded-full hover:bg-red-500 flex items-center gap-2"
        >
          <IoIosArrowForward  className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
