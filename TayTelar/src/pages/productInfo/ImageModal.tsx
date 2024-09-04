import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomLeftArrow, CustomRightArrow } from "./customArrows";

interface ImageModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  images: string[];
}

const imageSliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <CustomLeftArrow />,
  nextArrow: <CustomRightArrow />,
};

const ImageModal: React.FC<ImageModalProps> = ({ isModalOpen, toggleModal, images }) => {
  const [mouseY, setMouseY] = useState<number>(50); // Start at the center
  const modalRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (modalRef.current && imageRef.current) {
      const modal = modalRef.current;
      const image = imageRef.current;
      const rect = modal.getBoundingClientRect();
      const mouseYPosition = e.clientY - rect.top; // Mouse position relative to the modal
      const offsetY = ((mouseYPosition / rect.height) * 100); // Convert to percentage

      // Invert the movement direction
      const invertedY = 100 - offsetY;

      // Constrain the movement so that the image doesn't move out of bounds
      const minTranslateY = 0; // Top of the modal
      const maxTranslateY = 100 - (rect.height / image.offsetHeight) * 100; // Bottom of the modal

      const constrainedY = Math.min(Math.max(invertedY, minTranslateY), maxTranslateY);
      setMouseY(constrainedY);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      const mouseMoveHandler = (e: MouseEvent) => {
        handleMouseMove(e);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      return () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
      };
    }
  }, [isModalOpen]);

  return (
    isModalOpen ? (
      <div className="modal" ref={modalRef} onClick={toggleModal}>
        <div className="image-slider-container">
          <Slider {...imageSliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="image-slide">
                <img
                  ref={imageRef}
                  src={image}
                  alt={`Enlarged Image ${index + 1}`}
                  className="enlarged-image enlarged-image-move"
                  style={{ transform: `translateY(${mouseY - 50}%)` }} // Apply constrained movement with inversion
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    ) : null
  );
};

export default ImageModal;
