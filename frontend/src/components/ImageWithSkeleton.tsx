import { useState, type ImgHTMLAttributes } from 'react';

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

const ImageWithSkeleton = ({ wrapperClassName = '', className = '', onLoad, ...imgProps }: ImageWithSkeletonProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      <img
        {...imgProps}
        loading={imgProps.loading ?? 'lazy'}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
};

export default ImageWithSkeleton;
