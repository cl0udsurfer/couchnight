import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGalleryWrapper from './Gallery.style';

export const Gallery = ({ image }) => {
  const images = image.map(img => ({
    original: img.url,
    thumbnail: img.url
  }));

  return (
    <ImageGalleryWrapper>
      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={false}
        showIndex={true}
        lazyLoad={true}
        slideDuration={550}
      />
    </ImageGalleryWrapper>
  );
};
