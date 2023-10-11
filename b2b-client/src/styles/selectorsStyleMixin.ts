import { css } from 'styled-components';

const selectorStyleMixin = css`
  background: ${({ theme }) => theme.colors.black[100]};
  border: 1px solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 100px;
  padding: 18px 14px;
  gap: 5px;
  justify-content: flex-start;
  cursor: pointer;

  transition: all 0.3s;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.black[600]};
  }
`;

export default selectorStyleMixin;
