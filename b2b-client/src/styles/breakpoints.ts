export const size = {
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560
};

export const customSize = {
  1265: 1265,
  950: 950,
  550: 550
};

export const device = {
  minMobileL: `(min-width: ${size.mobileL}px)`,
  maxMobileL: `(max-width: ${size.mobileL}px)`,
  minTablet: `(min-width: ${size.tablet}px)`,
  maxTablet: `(max-width: ${size.tablet}px)`,
  minLaptop: `(min-width: ${size.laptop}px)`,
  maxLaptop: `(max-width: ${size.laptop}px)`,
  minLaptopL: `(min-width: ${size.laptopL}px)`,
  maxLaptopL: `(max-width: ${size.laptopL}px)`,
  desktop: `(min-width: ${size.desktop}px)`,
  desktopL: `(min-width: ${size.desktop}px)`,
  custom1265: `(max-width: ${customSize[1265]}px)`,
  custom550: `(max-width: ${customSize[550]}px)`,
  custom950: `(max-width: ${customSize[950]}px)`
};
