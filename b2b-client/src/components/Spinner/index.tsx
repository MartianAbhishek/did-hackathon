import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: block;
  border: 3px solid ${({ theme }) => theme.colors.black[1000]};
  border-radius: 50%;
  border-top: 3px solid ${({ theme }) => theme.colors.black[100]};
  border-left: 3px solid ${({ theme }) => theme.colors.black[100]};
  width: 16px;
  height: 16px;
  -webkit-animation: ${Spin} 0.6s linear infinite;
  animation: ${Spin} 0.6s linear infinite;
`;

export default Spinner;
