import type { CSSProperties } from 'react';
import React from 'react';

import styled from 'styled-components';

import { fontNameSpace } from 'src/tokens/textStyling';
import type { ColorCodeTypes } from 'src/types/colorStylesTypes';

interface IStyledTypographyType {
  variant: string;
  colorCode?: ColorCodeTypes;
}

const StyledTypography = styled.p<IStyledTypographyType>`
  ${(props) => fontNameSpace[props.variant]};
  color: ${(props) =>
    props.colorCode
      ? props.theme.colors[props.colorCode[0]][props.colorCode[1]]
      : props.theme.colors.black[1000]};
`;

interface TypographyProps {
  children: React.ReactNode;
  variant: string;
  colorCode?: ColorCodeTypes;
  style?: CSSProperties;
}
export default function Typography(props: TypographyProps) {
  return (
    <StyledTypography className="typography" {...props}>
      {props.children}
    </StyledTypography>
  );
}
