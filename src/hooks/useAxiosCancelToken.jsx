import {useEffect, useState} from "react";
import axios from "axios";

export default function useAxiosCancelToken() {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setCancelTokenSource({...source});

    return () => {
      source.cancel();
    };
  }, []);

  const resetCancelToken = () => {
    cancelTokenSource.cancel();
    const source = axios.CancelToken.source();
    setCancelTokenSource({...source});
    return source;
  };

  return {
    cancelTokenSource: cancelTokenSource,
    resetCancelToken: resetCancelToken,
  };
}
