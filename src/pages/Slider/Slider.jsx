

import React, { useEffect, useState } from 'react';
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';


const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slides = document.querySelectorAll(".slide");
    slides[currentIndex].classList.add("active");

    const handleWheel = (event) => {
      slides[currentIndex].classList.remove("active");

      if (event.deltaY > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      } else if (event.deltaY < 0) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
      }

      slides[currentIndex].classList.remove("active");
      slides[currentIndex].classList.add("active");

      const text = document.querySelector(".deneme-text");
      text.style.animation = "none"; // Animasyonu sıfırla
      void text.offsetWidth; // Yeniden çizim için zorla
      text.style.animation = null; // Animasyonu tekrar başlat

      
      




    };

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex]);

  return (
    <>
      <div className="wrapper">
        <div className="menu-scope">
          <div className="menu-container">
            <div className="logo">Just Music</div>
            <div className="menu-inner">
              <ul>
                <li className='home'>Home</li>
                <li>Event</li>
                <li>New Album</li>
              </ul>
            </div>
            <div className="menu-social">
              <div className="instagram">
             <a href="#" target="_self" rel="noopener noreferrer"> <FontAwesomeIcon icon={faInstagram} style={{color:'white', fontSize:'24px'}} /></a>
              </div>
              <div className="twitter">
              <a href="#" target="_self" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} style={{color:'white', fontSize:'24px'}} /></a>
              </div>
              <div className="youtube">
              <a href="#" target="_self" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} style={{color:'white', fontSize:'24px'}} /></a>
              </div>
              <div className="spotify">
              <a href="#" target="_self" rel="noopener noreferrer"><FontAwesomeIcon icon={faSpotify} style={{color:'white', fontSize:'24px'}} /></a>
              </div>

            </div>
          </div>
        </div>

        <div className='slider-container'>
          <div className={`slide slider1 ${currentIndex === 0 ? 'active' : ''}`}>
            <div className="deneme-text">Live Music</div>
          </div>
          <div className={`slide slider2 ${currentIndex === 1 ? 'active' : ''}`}>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
