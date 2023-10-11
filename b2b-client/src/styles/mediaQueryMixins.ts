import { device } from './breakpoints';

export const FormsResponsiveQuery = `
  @media ${device.maxTablet} {
    height: 100%;
    border-radius: 16px;
    justify-content: flex-start;
  }

  @media ${device.maxMobileL} {
    padding: 32px 12px;
  }
`;
