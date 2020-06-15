import { message, notification } from 'antd';

export const displaySuccessNotification = (message, description) => {
  return notification['success']({
    message,
    description,
    placement: 'topRight',
    style: {
      marginTop: 80,
    },
  });
};

export const displayErrorMessage = (error) => {
  return message.error(error);
};

export const formatListingPrice = (price, round = true) => {
  const formattedListingPrice = round ? Math.round(price / 100) : price / 100;
  return `$${formattedListingPrice}`;
};
