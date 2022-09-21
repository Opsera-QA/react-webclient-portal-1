import React, { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function MyCurrentToken() {
  const [token, setToken] = useState("");
  const {
    getAccessToken,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    getAccessToken()
      .then((newToken) => {
        setToken(hasStringValue(newToken) === true ? newToken : undefined);
      }).catch((error) => console.error("could not get token", error));

  }, [userData]);

  return (
    <div className="px-3">
      <div>{JSON.stringify(token)}</div>
    </div>
  );
}

