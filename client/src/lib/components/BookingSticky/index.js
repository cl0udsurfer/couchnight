import React from 'react';
import useWindowSize from 'lib/hooks/useWindowSize';
import StickyBookingWrapper, {
  HotelInfo,
  InfoArea,
  Title,
  Logo,
  HotelAction,
  Price,
  ActionBtn,
} from './BookingSticky.style';

export const BookingSticky = ({ logo, title, price, action, className }) => {
  const addAllClasses = ['sticky_booking'];
  const windowSize = useWindowSize();
  const windowInnerWidth = process.browser && windowSize.innerWidth;

  if (className) {
    addAllClasses.push(className);
  }

  return (
    <StickyBookingWrapper className={addAllClasses.join(' ')}>
      <HotelInfo className='hotel_info'>
        {windowInnerWidth > 767 && (
          <>{logo && <Logo src={logo} alt={title} />}</>
        )}

        {title || price ? (
          <InfoArea>
            {windowInnerWidth > 767 ? (
              <>{title && <Title>{'title'}</Title>}</>
            ) : (
              <Price>
                <span>{price}</span> / Night
              </Price>
            )}
          </InfoArea>
        ) : (
          ''
        )}
      </HotelInfo>

      <HotelAction className='hotel_action'>
        {windowInnerWidth > 767 && (
          <Price>
            <span>${price}</span> / Night
          </Price>
        )}
        <ActionBtn>{action}</ActionBtn>
      </HotelAction>
    </StickyBookingWrapper>
  );
};
