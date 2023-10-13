import { ThemeProvider } from "styled-components";
import { DAppProvider } from "@usedapp/core";
import WalletAuthProvider from "./providers/WalletConnectProvider";
import THEME_TYPES from "src/constants/themeTypes";
import useThemeStore from "src/hooks/useThemeStore";
import getThemeFormat from "src/utils/getThemeFormat";
import { darkModeColors, lightModeColors } from "src/tokens/colors/color";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router";
import packageJson from "src/../package.json";

const dappConfig = {
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
  autoConnect: false,
};

function App() {
  const theme = useThemeStore((state: { theme: any }) => state.theme);
  return (
    <DAppProvider config={dappConfig}>
      <WalletAuthProvider>
        <ThemeProvider
          theme={
            theme === THEME_TYPES.THEME_LIGHT
              ? getThemeFormat(theme, lightModeColors)
              : getThemeFormat(theme, darkModeColors)
          }
        >
          <RouterProvider router={router} />
          <span style={{ marginLeft: "2rem", fontSize: 12 }}>
            Version {packageJson.version}
          </span>
        </ThemeProvider>
      </WalletAuthProvider>
    </DAppProvider>
  );
}

export default App;
