import {useContext, useEffect} from "react";
import {AuthContext} from "contexts/AuthContext";
import {THEMES} from "temp-library-components/theme/theme.constants";
import {lightThemeConstants} from "temp-library-components/theme/light.theme.constants";
import {darkThemeConstants} from "temp-library-components/theme/dark.theme.constants";

const getThemeConstants = (theme) => {
  switch (theme) {
    case THEMES.LIGHT:
      return lightThemeConstants;
    case THEMES.NIGHT:
      return darkThemeConstants;
    default:
      return lightThemeConstants;
  }
};

export default function useTheme() {
  const { theme } = useContext(AuthContext);
  const themeConstants = getThemeConstants(theme);

  useEffect(() => {}, [theme]);

  return {
    themeConstants: themeConstants,
  };
}
