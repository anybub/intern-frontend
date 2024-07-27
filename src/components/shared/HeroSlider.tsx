import React from 'react';
import Slider from 'react-slick';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'public/assets/National_Institute_Of_Technology_Silchar_Logo.png',
    title: 'Slide 1 Title',
    description: 'Slide 1 Description',
  },
  {
    id: 2,
    image: 'public/assets/National_Institute_Of_Technology_Silchar_Logo.png',
    title: 'Slide 2 Title',
    description: 'Slide 2 Description',
  },
  {
    id: 3,
    image: 'public/assets/National_Institute_Of_Technology_Silchar_Logo.png',
    title: 'Slide 3 Title',
    description: 'Slide 3 Description',
  },
];

const HeroSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-96 flex items-center justify-center">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-center p-8 text-white">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
