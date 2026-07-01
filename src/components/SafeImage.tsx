import type { ImgHTMLAttributes } from 'react';

const fallbackImage =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';

type SafeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function SafeImage({ fallbackSrc = fallbackImage, onError, ...props }: SafeImageProps) {
  return (
    <img
      {...props}
      onError={(event) => {
        const image = event.currentTarget;
        if (image.src !== fallbackSrc) {
          image.src = fallbackSrc;
        }
        onError?.(event);
      }}
    />
  );
}
