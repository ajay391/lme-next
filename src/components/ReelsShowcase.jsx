'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

import c1 from "../../public/images/products/c1.jpeg";
import c2 from "../../public/images/products/c2.jpg";
import c3 from "../../public/images/products/c3.jpg";
import c4 from "../../public/images/products/c4.png";
import c5 from "../../public/images/products/c5.png";
import c6 from "../../public/images/products/c6.png";
import c7 from "../../public/images/products/c7.png";
import c8 from "../../public/images/products/c8.png";
import c9 from "../../public/images/products/c9.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaInstagram } from 'react-icons/fa';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Carousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
      image: c6,
      title: "Redline",
    },
    {
      image: c5,
      title: "Slipstream",
    },
    {
      image: c4,
      title: "Blackout Grid",
    },
    {
      image: c3,
      title: "Trackside",
    },
    {
      image: c7,
      title: "Livery Line",
    },
    {
      image: c8,
       title: "Overtake",
    },
    {
      image: c9,
      title: "Ghost Driver",
    },
  
  ];

  return (
    <div className="carousel-container">
      {/* Section Heading */}
      <section className="py-16 px-3 sm:px-2 md:px-14 lg:px-14 xl:px-14">
        <div className="max-w-3xl text-start">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-4 uppercase">
            Featured Drops <br /> <span className="text-primary text-red-500">Stand Out, Stay Ahead</span>
          </h1>
          <p className="text-base sm:text-base text-gray-600">
            Use prebuilt templates and components for a professional, stunning look. Save time and focus on content with our user-friendly, customizable design solutions.
          </p>
        </div>
      </section>

      {/* Carousel */}
      <Slider {...settings} ref={sliderRef}>
        {carData.map((car, idx) => (
          <div key={idx} className="p-4">
            <div className="relative overflow-hidden rounded-2xl shadow-md">
              <Image
                src={car.image}
                alt={car.title}
                width={500}
                height={500}
                className="w-full h-[400px] md:h-[400px] lg:h-[400px] object-cover"
              />
              {/* <video
                src={car.video}
                className="w-full h-[400px] md:h-[400px] lg:h-[400px] object-cover"
                autoPlay
                muted
                loop
                playsInline
              /> */}

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent text-white p-4 flex flex-col justify-end">
                <h2 className="text-2xl font-semibold mb-2 px-2">{car.title}</h2>
                {/* <p className="text-sm mb-4 px-2">{car.description}</p> */}
                <a
                  href="https://www.instagram.com/lastmanonearth.in?igsh=eXBrcWN6YjBvZWpv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit px-2 py-2 bg-transparent text-white font-medium rounded-sm hover:text-red-500 transition flex items-center gap-2"
                >
                  <FaInstagram className="text-xl" />
                  {/* <span>Explore Our Instagram</span> */}
                </a>

              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Arrows */}
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
          <IoIosArrowForward className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
