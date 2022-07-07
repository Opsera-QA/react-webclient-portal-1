import { useEffect, useRef, useState } from "react";
import axios from "axios";

function useComponentStateReference() {
  const isMounted = useRef(false);
  const [cancelTokenSource] = useState(axios.CancelToken.source());

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
  });
}

export default useComponentStateReference;
