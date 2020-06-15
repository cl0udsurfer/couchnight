import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { ProductCard } from 'lib/components';
import { formatListingPrice } from 'lib/utils';
import { MapContainer, MapMarker, ProductContainer } from './Map.style';

export const Map = ({ location, listing, listings }) => {
  const [viewport, setViewport] = useState({
    latitude: location.lat ? location.lat : 40.758896,
    longitude: location.lng ? location.lng : -73.98513,
    width: '100%',
    height: '100%',
    zoom: 10,
  });
  const [selectedListing, setSelectedListing] = useState(null);

  return (
    <MapContainer>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiZGF0YWtvYnMiLCJhIjoiY2s4bTFrc2FsMDU2czNscGNycmIzZ3gzcyJ9.1c9Yt3-kFIjOZeHSGaGF2w'
        mapStyle='mapbox://styles/datakobs/ck8m1dipe17nl1iodxujhhx1x'
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        style={{
          position: 'relative',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        {listings &&
          listings.map((item) => (
            <Marker
              key={item.id}
              latitude={item.location.lat}
              longitude={item.location.lng}
            >
              <MapMarker
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedListing(item);
                }}
              >
                {formatListingPrice(item.price)}
              </MapMarker>
            </Marker>
          ))}

        {selectedListing ? (
          <Popup
            tipSize={0}
            dynamicPosition={true}
            latitude={selectedListing.location.lat}
            longitude={selectedListing.location.lng}
            onClose={() => {
              setSelectedListing(null);
            }}
            closeOnClick={false}
          >
            <ProductContainer>
              <ProductCard listing={selectedListing} />
            </ProductContainer>
          </Popup>
        ) : null}
      </ReactMapGL>
    </MapContainer>
  );
};
