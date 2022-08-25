import { useEffect, useState } from "react";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { useLocation } from "react-router-dom";
import useLocationReference from "hooks/useLocationReference";

export const PUBLIC_PATHS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  REGISTRATION: "/registration",
  FREE_TRIAL_REGISTRATION: "/trial/registration",
  LDAP_ACCOUNT_REGISTRATION: "/account/registration",
  AWS_MARKETPLACE_REGISTRATION: "/signup/awsmarketplace",
};

const isPathPublic = (path) => {
  if (hasStringValue(path) === false) {
    return false;
  }

  return (
    path === "/login" ||
    path === "/signup" ||
    path === "/registration" ||
    path === "/trial/registration" ||
    path.includes("/account/registration") ||
    path.includes("/signup/awsmarketplace")
  );
};

export default function useBackgroundColorReference(themeConstants, customBackgroundColor) {
  const { isPublicPathState } = useLocationReference();
  const [backgroundColor, setBackgroundColor] = useState(undefined);

  useEffect(() => {
    if (hasStringValue(customBackgroundColor) === true) {
      setBackgroundColor(customBackgroundColor)
    }

    if (isPublicPathState === true) {
      setBackgroundColor(themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE);
    }

    setBackgroundColor(themeConstants.COLOR_PALETTE.WHITE);

    return () => {
      setBackgroundColor(undefined);
    };
  }, []);

  return ({
    backgroundColor: backgroundColor,
  });
}
