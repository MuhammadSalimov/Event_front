import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(7);

  const images = [
    './public/img/hero1.jpg',
    './public/img/hero2.jpg',
    './public/img/hero3.jpg',
    './public/img/hero4.jpg',
    './public/img/hero5.jpg',
    './public/img/hero6.jpg',
    './public/img/hero7.jpg',
    './public/img/hero8.jpg',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <section
      style={{ background: `url(${images[currentImageIndex]}) top/cover no-repeat`, }}
      className={`relative bg-cover bg-top bg-no-repeat overflow-hidden`}
    >
      {/* Mask box */}
      <div
        className="absolute z-100 hero-gradient h-screen w-screen flex justify-center items-center z-100 inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
      >
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl hero-h1 font-extrabold sm:text-5xl">
            Host, Connect, Celebrate:Your Events, Our Platform!
          </h1>

          <p className="mt-4 max-w-lg text-xl font-semibold sm:text-xl/relaxed">
            Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <button
              className="block px-4 py-2 md:px-8 md:py-3 rounded btn-color  text-sm font-medium text-white shadow hover:btn-hover-color focus:outline-none  sm:w-auto"
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
