import httpClient from '../../api/http-client';

const checkGamePin = (gamePin) => {
  return httpClient.get('/public/pin-verification', {
    params: {
      gamePin,
    },
  });
};

const checkUsername = (username, gameSessionUUID) => {
  return httpClient.get('/public/username-verification', {
    params: {
      username,
      gameSessionUUID,
    },
  });
};

const service = {
  checkGamePin,
  checkUsername,
};

export default service;
