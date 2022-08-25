import { useEffect, useState } from "react";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { useLocation } from "react-router-dom";

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

export default function useLocationReference() {
  const location = useLocation();
  const [isPublicPath, setIsPublicPath] = useState(undefined);

  useEffect(() => {
    setIsPublicPath(isPathPublic(location.pathname));

    return () => {
      setIsPublicPath(undefined);
    };
  }, [location]);

  return ({
    isPublicPathState: isPublicPath,
    currentPath: location.pathname,
  });
}
