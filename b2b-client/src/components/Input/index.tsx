import React from 'react';

import styled from 'styled-components';

import selectorStyleMixin from 'src/styles/selectorsStyleMixin';
import { fontNameSpace } from 'src/tokens/textStyling';

interface IPropType {
  placeholder: string;
  width?: string;
  height?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const StyledInput = styled.input<{ width?: string; height?: string }>`
  ${selectorStyleMixin}
  outline: none;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '56px'};
  border-radius: 10px;
  padding: 0px 12px;

  color: ${({ theme }) => theme.colors.black[800]};
  ${fontNameSpace.ts16r}

  &:focus {
    border-color: ${({ theme }) => theme.colors.black[600]};
  }

  &:placeholder {
    color: ${({ theme }) => theme.colors.black[500]};
    ${fontNameSpace.ts16r}
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const Input = (props: IPropType) => {
  const { onChange, type, onClick } = props;

  return (
    <StyledInput
      {...props}
      onChange={(e) => onChange(e.target.value)}
      type={type || 'text'}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    />
  );
};

export default Input;
