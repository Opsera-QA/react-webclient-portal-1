import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";

function useComponentStateReference() {
  const isMounted = useRef(false);
  const [cancelTokenSource] = useState(axios.CancelToken.source());
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      cancelTokenSource.cancel();
      isMounted.current = false;
    };
  }, []);

  return ({
    isMounted: isMounted,
    cancelTokenSource: cancelTokenSource,
    getAccessToken: getAccessToken,
    toastContext: toastContext,
  });
}

export default useComponentStateReference;
