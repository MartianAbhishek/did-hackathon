import type { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components';

import { device } from 'src/styles/breakpoints';

const textStyleMixin = (
  size: number,
  family: string,
  letterSpacing: number,
  lineHeight: number
) => {
  return css`
    font-size: ${size}px;
    font-family: var(--${family}-font);
    letter-spacing: ${letterSpacing}px;
    line-height: ${lineHeight}px;

    @media ${device.maxMobileL} {
      font-size: ${family === 'pp-regular' ? `${size - 4}px` : `${size}px`};
    }
  `;
};

export const fontNameSpace: { [key: string]: FlattenSimpleInterpolation } = {
  ts12r: textStyleMixin(12, 'system85-regular', -0.01, 18),
  ts12b: textStyleMixin(12, 'system85-medium', -0.01, 18),
  ts14r: textStyleMixin(14, 'system85-regular', 0.01, 20),
  ts14b: textStyleMixin(14, 'system85-medium', 0.01, 20),
  ts16r: textStyleMixin(16, 'system85-regular', 0.01, 24),
  ts16b: textStyleMixin(16, 'system85-medium', 0, 24),
  ts20r: textStyleMixin(20, 'system85-regular', 0, 30),
  ts20b: textStyleMixin(20, 'system85-medium', 0, 30),
  ts24r: textStyleMixin(24, 'system85-regular', 0, 36),
  ts24b: textStyleMixin(24, 'system85-medium', 0, 36),
  ts28r: textStyleMixin(28, 'system85-regular', 0, 42),
  ts28b: textStyleMixin(28, 'system85-medium', 0, 42),
  ts48r: textStyleMixin(48, 'system85-regular', 0, 60),
  tspp28r: textStyleMixin(28, 'pp-regular', 0.01, 0),
  tspp48r: textStyleMixin(48, 'pp-regular', 0.03, 72)
};
