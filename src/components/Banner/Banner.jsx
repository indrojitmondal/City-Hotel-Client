import React, { useEffect, useState } from 'react';
import image1 from '../Banner/images/1.jpg'
import image2 from '../Banner/images/2.jpg'
import image3 from '../Banner/images/3.jpg'
import image4 from '../Banner/images/4.jpg'
import image5 from '../Banner/images/5.jpg'
const images = [
  `${image1}`,
  `${image2}`,
  `${image3}`,
  `${image4}`,
  `${image5}`,
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearTimeout(interval);
  }, [index]);

  return (
    <div className="">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          className={`w-full ${index === i ? 'block' : 'hidden'} h-[600px] object-cover`}
        />
      ))}
    </div>
  );
};

export default Banner;
