import React from 'react';
import AnimatedLoader from './AnimatedLoader';

const LoadingScreen = ({ styles, message = "Loading..." }) => {
  return (
    <AnimatedLoader message={message} />
  );
};

export default LoadingScreen;
