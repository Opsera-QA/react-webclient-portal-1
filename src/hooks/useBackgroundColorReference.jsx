import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function useBackgroundColorReference(usePurpleBackground, customBackgroundColor) {
  const {
    themeConstants,
    backgroundColor,
    setBackgroundColor,
  } = useContext(AuthContext);

  useEffect(() => {
    if (hasStringValue(customBackgroundColor) === true) {
      setBackgroundColor(customBackgroundColor);
    } else if (usePurpleBackground === true) {
      setBackgroundColor(themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE);
    } else {
      setBackgroundColor(themeConstants.COLOR_PALETTE.WHITE);
    }

    return () => {
      setBackgroundColor(themeConstants.COLOR_PALETTE.WHITE);
    };
  }, []);

  return ({
    backgroundColor: backgroundColor,
    setBackgroundColor: setBackgroundColor,
  });
}
