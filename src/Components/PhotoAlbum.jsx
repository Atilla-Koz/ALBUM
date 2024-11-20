import { useState, useEffect } from 'react';
import a from '../assets/Photos/a.webp';
import b from '../assets/Photos/b.webp';
import c from '../assets/Photos/c.webp';

export default function PhotoAlbum() {
  // Resim listesi ve açıklamaları
  const images = [
    { src: a, date: '2023-11-01', description: 'Güneşli bir gün sahilde.' },
    { src: b, date: '2023-10-15', description: 'Ormanda yürüyüş keyfi.' },
    { src: c, date: '2023-09-10', description: 'Dağlarda huzurlu bir an.' },
  ];

  // Şu anki resmin indexini tutan state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animasyon durumu için state
  const [isRotating, setIsRotating] = useState(false);

  // Rasgele bir resim seç
  const getRandomImage = () => {
    let randomIndex = Math.floor(Math.random() * images.length);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * images.length);
    }
    setCurrentIndex(randomIndex);
  };

  // Çift tıklama eventi
  const handleDoubleClick = () => {
    setIsRotating(true); // Döndürme animasyonunu başlat
    setTimeout(() => {
      getRandomImage(); // Yeni fotoğrafı getir
      setIsRotating(false); // Animasyonu sıfırla
    }, 600); // Animasyon süresine uygun zaman ayarı
  };

  // Telefona sallama eventi
  useEffect(() => {
    const handleMotion = (event) => {
      const { acceleration } = event;
      if (
        acceleration &&
        (Math.abs(acceleration.x) > 15 ||
          Math.abs(acceleration.y) > 15 ||
          Math.abs(acceleration.z) > 15)
      ) {
        handleDoubleClick();
      }
    };

    window.addEventListener('devicemotion', handleMotion);

    // Event'i kaldırmayı unutma
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [currentIndex]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full"
      onDoubleClick={handleDoubleClick}
    >
      <div
        className={`p-6 bg-white rounded-3xl shadow-2xl text-center transform transition-transform duration-500 ${
          isRotating ? 'rotate-y-180' : ''
        }`}
      >
        <img
          src={images[currentIndex].src}
          alt="Random"
          className={`rounded-lg border-4 border-gray-300 shadow-lg max-w-full max-h-[500px] transform transition-opacity duration-500 ${
            isRotating ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-700">
            {images[currentIndex].date}
          </p>
          <p className="text-sm text-gray-500">
            {images[currentIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}
