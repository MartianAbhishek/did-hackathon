import React, { useEffect, useState } from 'react';

import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import FallbackIcon from 'src/components/Icon/icons/fallback.png';

interface IPropType {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  borderRadius?: string;
  css?: any;
  priority?: boolean;
}

interface IStyledIconPropType {
  borderradius?: string;
  margintop?: string;
  marginbottom?: string;
  marginright?: string;
  marginleft?: string;
}

const StyledIcon = styled.img<IStyledIconPropType>`
  border-radius: ${(props) => (props.borderradius ? props.borderradius : '0')};
  object-fit: cover;
`;

const StyledImg = styled.img<
  IStyledIconPropType & { height?: number; width?: number }
>`
  border-radius: ${(props) => (props.borderradius ? props.borderradius : '0')};
  object-fit: cover;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

const Icon = (props: IPropType) => {
  const { borderRadius: borderradius, src, ...rest } = props;

  const [imgSrc, setImgSrc] = useState<string>(
    src || FallbackIcon
  );

  useEffect(() => {
    if (src) setImgSrc(src);
  }, [src]);

  // This is done because sui coin icons from cetus url give a 500 when used with next/image
  if (
    typeof src === 'string' &&
    src?.startsWith('https://archive.cetus.zone/assets')
  ) {
    return (
      <StyledImg src={src as string} borderradius={borderradius} {...rest} />
    );
  }

  return (
    // @ts-ignore
    <StyledIcon
      onError={() => {
        setImgSrc(FallbackIcon);
      }}
      src={imgSrc}
      borderradius={borderradius}
      {...rest}
    />
  );
};

export default Icon;
