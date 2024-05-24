import React from 'react';
import styled from 'styled-components';

const SlideDownWrapper = ({ isVisible, children }) => {
  return <Wrapper $isVisible={isVisible}>{children}</Wrapper>;
};

export default SlideDownWrapper;

const Wrapper = styled.div`
  backdrop-filter: blur(7px);
  max-height: ${props => (props.$isVisible ? '50px' : '0')}; 
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;