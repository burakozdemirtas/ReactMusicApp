import React, { useEffect, useState } from 'react';
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volumeValue, setVolumeValue] = useState(80);
  const [seekbarValue, setSeekbarValue] = useState(0);

  const openNav = () => {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const widthPercentage = screenWidth <= 768 ? "100%" : "20%";

    document.getElementById("mySidenav").style.width = widthPercentage;
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const handleWheel = (event) => {
    const slides = document.querySelectorAll(".slide");
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

  const handlePlay = () => {
    const music = document.querySelector('.music-element');
    const playBtn = document.querySelector('.play');

    if (music.paused) {
      music.play();
      playBtn.innerHTML = '<i class="material-icons">pause</i>';
    } else {
      music.pause();
      playBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
    }

    music.addEventListener('ended', () => {
      playBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
      music.currentTime = 0;
    });
  };

  const handleVolume = () => {
    const volIcon = document.querySelector('.volume');
    const volBox = document.querySelector('.volume-box');
    volIcon.classList.toggle('active');
    volBox.classList.toggle('active');
  };

  

  const handleRepeat = () => {
    const music = document.querySelector('.music-element');
    const repIcon = document.querySelector('.repeat');

    if (music.loop == true) {
      music.loop = false;
    } else {
      music.loop = true;
    }

    repIcon.classList.toggle('active');
  };

  const handleFavorite = () => {
    const favIcon = document.querySelector('.favorite');
    favIcon.classList.toggle('active');
  };

  const handleVolumeDown = () => {
    const volumeRange = document.querySelector('.volume-range');
    setVolumeValue((prevValue) => prevValue - 20);
    const music = document.querySelector('.music-element');
    music.volume = volumeValue / 100;
  };

  const handleVolumeUp = () => {
    const volumeRange = document.querySelector('.volume-range');
    setVolumeValue((prevValue) => prevValue + 20);
    const music = document.querySelector('.music-element');
    music.volume = volumeValue / 100;
  };

  const handleVolumeChange = (e) => {
    setVolumeValue(e.target.value);
    const music = document.querySelector('.music-element');
    music.volume = e.target.value / 100;
  };

  const handleSeekBarChange = (e) => {
    setSeekbarValue(e.target.value);
    const music = document.querySelector('.music-element');
    music.currentTime = (e.target.value / 100) * music.duration;
  };

  useEffect(() => {
    openNav();
    const slides = document.querySelectorAll(".slide");
    slides[currentIndex].classList.add("active");

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex]);

  return (
    <>
      <div className="wrapper">
        <div className="menu-scope" id="mySidenav">
          <div className="menu-container">
            <a href="javascript:void(0);" className="closebtn" onClick={closeNav}>&times;</a>
            <div className="logo">Just Music</div>
            <div className="menu-inner">
              <ul>
                <li className='home'>Home</li>
                <li>Event</li>
                <li>New Album</li>
              </ul>
            </div>
            <div className="menu-social ">
              <div className="instagram">
                <a href="#" target="_self" rel="noopener noreferrer"> <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', fontSize: '24px' }} /></a>
              </div>
              <div className="twitter">
                <a href="#" target="_self" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} style={{ color: 'white', fontSize: '24px' }} /></a>
              </div>
              <div className="youtube">
                <a href="#" target="_self" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} style={{ color: 'white', fontSize: '24px' }} /></a>
              </div>
              <div className="spotify">
                <a href="#" target="_self" rel="noopener noreferrer"><FontAwesomeIcon icon={faSpotify} style={{ color: 'white', fontSize: '24px' }} /></a>
              </div>
            </div>
          </div>
        </div>

        <span className='open' onClick={openNav} >&#9776; open</span>

        <div className='slider-container'>
          <div className={`slide slider1 ${currentIndex === 0 ? 'active' : ''}`}>
            <div className="deneme-text">Live Music</div>
          </div>
          <div className={`slide slider2 ${currentIndex === 1 ? 'active' : ''}`}>
            <div className="player">
              <div className="cover">
                <img src="https://hosseinghanbari.ir/other/music-player/autumn.jpg" alt="" />
              </div>
              <div className="info">
                <div className="title">Autumn</div>
                <div className="singer">Instrumental Music</div>
              </div>
              <div className="volume-box">
                <span className="volume-down" onClick={handleVolumeDown}><i className="material-icons">remove</i></span>
                <input
                  type="range"
                  className="volume-range"
                  step="1"
                  value={volumeValue}
                  min="0"
                  max="100"
                  onChange={(e) => handleVolumeChange(e)}
                />
                <span className="volume-up" onClick={handleVolumeUp}><i className="material-icons">add</i></span>
              </div>
              <div className="btn-box">
                <i className="material-icons repeat" onClick={handleRepeat}>repeat</i>
                <i className="material-icons favorite active" onClick={handleFavorite}>favorite</i>
                <i className="material-icons volume" onClick={handleVolume}>volume_up</i>
              </div>
              <div className="music-box">
                <input
                  type="range"
                  step="1"
                  className="seekbar"
                  value={seekbarValue}
                  min="0"
                  max="100"
                  onChange={(e) => handleSeekBarChange(e)}
                />

                <audio className="music-element">
                <source src="https://hosseinghanbari.ir/other/music-player/autumn.mp3" type="audio/mp3" />

                </audio>
                <span className="current-time"></span><span className="duration"></span>
                <span className="play" onClick={handlePlay}>
                  <i className="material-icons">play_arrow</i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
