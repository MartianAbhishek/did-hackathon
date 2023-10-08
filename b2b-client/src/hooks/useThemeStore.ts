import { createStore } from 'zustand/vanilla';

import THEME_TYPES from 'src/constants/themeTypes';
import createBoundedUseStore from 'src/utils/createBoundedUseStore';

const { THEME_LIGHT, THEME_DARK } = THEME_TYPES;

interface IThemeStore {
  theme: string;
  toggleTheme: () => void;
}

// using createStore from zustand/vanilla instead of store because we want to use this state outside of react components
export const themeStore = createStore<IThemeStore>()((set) => ({
  // TODO (theme): change this to dark once completed
  theme: THEME_LIGHT,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
    }))
}));

// Create a hook to be used inside react components (needed because we need to switch theme from inside a react component)
const useThemeStore = createBoundedUseStore(themeStore);

export default useThemeStore;
