import { useState, useEffect, useRef } from 'react';
import CardFlip from 'react-card-flip';
import a from '../assets/Photos/a.webp';
import b from '../assets/Photos/b.webp';
import c from '../assets/Photos/c.webp';

export default function PhotoAlbum() {
  const images = [
    { src: a, date: '2023-11-01', description: 'Güneşli bir gün sahilde.' },
    { src: b, date: '2023-10-15', description: 'Ormanda yürüyüş keyfi.' },
    { src: c, date: '2023-09-10', description: 'Dağlarda huzurlu bir an.' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });

  const frontRef = useRef(null);
  const touchStartRef = useRef(null); // Kaydırma başlangıç pozisyonunu tutar

  const getRandomImage = () => {
    let randomIndex = Math.floor(Math.random() * images.length);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * images.length);
    }
    setCurrentIndex(randomIndex);
  };

  const handleDoubleClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      getRandomImage();
      setIsRotating(false);
      setIsFlipped(false);
    }, 600);
  };

  const handleTouchStart = (e) => {
    // Dokunma başlangıç pozisyonunu kaydet
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;

    // Sola veya sağa kaydırma hareketini algıla
    if (Math.abs(deltaX) > 100) {
      // Flip hareketini tetikle
      if (frontRef.current) {
        const { offsetWidth: width, offsetHeight: height } = frontRef.current;
        setCardDimensions({ width, height });
      }
      setIsFlipped((prev) => !prev);
      touchStartRef.current = null; // Kaydırma işlemi tamamlandı
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null; // Kaydırma başlangıcını sıfırla
  };

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

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [currentIndex]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full"
      onDoubleClick={handleDoubleClick}
      onContextMenu={(e) => e.preventDefault()} // Sağ tıklamayı devre dışı bırak
      style={{ userSelect: 'none' }} // Yazı seçimini devre dışı bırak
    >
      <CardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Ön Yüz */}
        <div
          ref={frontRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`p-6 bg-white rounded-3xl shadow-2xl text-center transform transition-transform duration-500 ${
            isRotating ? 'rotate-y-180' : ''
          }`}
        >
          <img
            src={images[currentIndex].src}
            alt="Random"
            className={`rounded-lg border-4 border-gray-300 shadow-lg w-full h-auto max-h-[500px] transform transition-opacity duration-500 ${
              isRotating ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>

        {/* Arka Yüz */}
        <div
          style={{
            width: cardDimensions.width || 'auto',
            height: cardDimensions.height || 'auto',
          }}
          className="p-6 bg-white rounded-3xl shadow-2xl text-center flex flex-col items-center justify-center"
        >
          <p className="text-lg font-semibold text-gray-700">
            {images[currentIndex].date}
          </p>
          <p className="text-sm text-gray-500">
            {images[currentIndex].description}
          </p>
        </div>
      </CardFlip>
    </div>
  );
}
