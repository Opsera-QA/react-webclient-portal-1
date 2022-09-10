import { useEffect, useRef } from "react";
import axios from "axios";

export default function useCancelTokenStateReference() {
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  return (cancelTokenSource);
}
