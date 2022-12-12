import { useEffect, useState } from "react";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { useLocation } from "react-router-dom";
import constantsHelper from "@opsera/definitions/constants/constants.helper";

export const PUBLIC_PATHS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FREQUENTLY_ASKED_QUESTIONS: "/faq",
  HELP_DOCUMENTATION: "/help-documentation",
  REGISTRATION: "/registration",
  FREE_TRIAL_REGISTRATION: "/trial/registration",
  LDAP_ACCOUNT_REGISTRATION: "/account/registration",
  AWS_MARKETPLACE_REGISTRATION: "/signup/awsmarketplace",
};

const isPathPublic = (path) => {
  if (hasStringValue(path) === false) {
    return false;
  }

  if (constantsHelper.isValueValid(PUBLIC_PATHS, path) === true) {
    return true;
  }

  return (
    path.includes(PUBLIC_PATHS.LDAP_ACCOUNT_REGISTRATION)
    || path.includes(PUBLIC_PATHS.AWS_MARKETPLACE_REGISTRATION)
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
    location: location,
    currentPath: location.pathname,
    currentUrl: `${process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL}${location.pathname}`,
    locationKey: location.key,
  });
}
