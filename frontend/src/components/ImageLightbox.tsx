interface ImageLightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

const ImageLightbox = ({ src, alt = 'Full view', onClose }: ImageLightboxProps) => {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={onClose}
          className="btn-tactile absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200 transition text-2xl font-bold text-gray-800 leading-none w-10 h-10 flex items-center justify-center"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageLightbox;
