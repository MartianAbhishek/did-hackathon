import type { MouseEvent, ReactNode } from 'react';
import React from 'react';

import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import Typography from 'src/components/Typography';

interface IPropType {
  children: ReactNode;
  height?: string;
  width?: string;
  css?: any;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  buttonType?: 'secondary' | 'primary';
  borderColor?: string;
}

const ButtonContainer = styled.button<IPropType>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ disabled, theme, buttonType }) =>
    disabled
      ? theme.colors.black[600]
      : buttonType === 'secondary'
      ? theme.colors.black[100]
      : theme.colors.black[1000]};
  padding: 5px 20px;

  height: ${({ height }) => height || '48px'};
  width: ${({ width }) => width || '100%'};

  font-weight: 500;
  border-radius: 6px;
  text-transform: uppercase;

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  &:before {
    content: '';
    display: block;
    position: absolute;
    height: calc(100% - 6px);
    top: 50%;
    transform: translateY(-50%);
    left: 14px;
    right: 14px;
    box-sizing: border-box;
    z-index: 4;
    transition: all 0.3s;
  }

  &:hover {
    &:before {
      left: 18px;
      right: 18px;
    }

    &:after {
      top: 16px;
      bottom: 16px;
    }
  }

  p {
    color: ${({ theme, buttonType }) =>
      buttonType === 'secondary'
        ? theme.colors.black[900]
        : theme.colors.black[100]} !important;
  }
`;

const InnerDiv = styled.div<{ buttonType?: 'secondary' | 'primary' }>`
  border-radius: 2px;
  position: absolute;
  left: 5px;
  right: 5px;
  top: 5px;
  bottom: 5px;
`;

function PrimaryButton(props: IPropType) {
  return (
    <ButtonContainer {...props} onClick={props.onClick}>
      <InnerDiv buttonType={props.buttonType} />
      {typeof props.children === 'string' ? (
        <Typography variant="ts16b">{props.children}</Typography>
      ) : (
        props.children
      )}
    </ButtonContainer>
  );
}

export default PrimaryButton;
