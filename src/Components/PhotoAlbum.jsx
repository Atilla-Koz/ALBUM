import photo1 from '../assets/Photos/a.webp';

const photos = [
  {
    src: photo1,
    title: 'İlk Resim',
    description: 'Bu benim ilk fotoğrafım.',
  },
  {
    src: photo1,
    title: 'İkinci Resim',
    description: 'Bu benim ikinci fotoğrafım.',
  },
  {
    src: photo1,
    title: 'İkinci Resim',
    description: 'Bu benim ikinci fotoğrafım.',
  },
  {
    src: photo1,
    title: 'İkinci Resim',
    description: 'Bu benim ikinci fotoğrafım.',
  },
  {
    src: photo1,
    title: 'İkinci Resim',
    description: 'Bu benim ikinci fotoğrafım.',
  },
  {
    src: photo1,
    title: 'İkinci Resim',
    description: 'Bu benim ikinci fotoğrafım.',
  },
  {
    src: photo1,
    title: 'İkinci Resim',
    description: 'Bu benim ikinci fotoğrafım.',
  },
];

export default function PhotoAlbum() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ${
            index % 2 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
          }`}
          style={{
            border: '15px solid #8B4513',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#f9f5e6',
          }}
        >
          <div className="p-2 bg-gray-200">
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-auto object-cover"
              style={{ padding: '10px' }}
            />
          </div>
          <div className="p-4 bg-white border-t-8 border-solid border-gray-700">
            <h2 className="text-xl font-semibold">{photo.title}</h2>
            <p className="text-gray-600">{photo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
