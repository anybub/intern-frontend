import { useState, useEffect } from "react";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "assets/imagebg.png",
    title: "Slide 1 Title",
    description: "Slide 1 Description",
  },
  {
    id: 2,
    image: "assets/National_Institute_Of_Technology_Silchar_Logo.png",
    title: "Slide 2 Title",
    description: "Slide 2 Description",
  },
  {
    id: 3,
    image: "assets/vote.jpg",
    title: "Slide 3 Title",
    description: "Slide 3 Description",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative max-w-screen-xl mx-auto overflow-hidden">
      <div className="relative h-96">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-1000 ${
              index === currentSlide
                ? "transform translate-x-0"
                : "transform translate-x-full"
            } ${index < currentSlide ? "transform -translate-x-full" : ""}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "contain", // Ensures the image covers the entire slide
              backgroundPosition: "center", // Centers the image within the slide
              backgroundRepeat: "no-repeat", // Prevents the image from repeating
            }}
          ></div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
