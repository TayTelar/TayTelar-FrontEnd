import { useState, useEffect } from "react";
import "../../assets/sass/dashboard/_slider.scss";
import img from "../../assets/images/products1.avif";

const Slider = () => {
  const cards = [
    { id: 1, content: "Card 1" },
    { id: 2, content: "Card 2" },
    { id: 3, content: "Card 3" },
    { id: 4, content: "Card 4" },
    { id: 5, content: "Card 5" },
  ];
  
  const [numVisibleCards, setNumVisibleCards] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateVisibleCards = () => {
    setNumVisibleCards(window.innerWidth < 450 ? 1 : 3);
  };

  useEffect(() => {
    updateVisibleCards(); // Initial check
    window.addEventListener('resize', updateVisibleCards);
    
    return () => {
      window.removeEventListener('resize', updateVisibleCards);
    };
  }, []);

  const extendedCards = [...cards, ...cards.slice(0, numVisibleCards - 1)];

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? extendedCards.length - numVisibleCards : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === extendedCards.length - numVisibleCards ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextSlide, 3000);
    
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentIndex * (100 / numVisibleCards)}%)`,
          transition: 'transform 0.5s ease-in-out', // Add transition for smooth sliding
        }}
      >
        {extendedCards.map((card) => (
          <div key={card.id} className="card">
            <img src={img} alt="Product" className="card-image" />
            <div className="card-content">
              <h3>{card.content}</h3>
              <p>Percentage 20%</p>
              <div className="actionbuttons">
                <button className="btn buy-btn">Buy</button>
                <button className="btn share-btn">Share</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow left" onClick={handlePrevSlide}>
        &#10094;
      </button>
      <button className="arrow right" onClick={handleNextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
