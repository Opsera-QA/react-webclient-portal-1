import {useEffect, useState} from "react";
import axios from "axios";

export default function useAxiosCancelToken() {
  const [cancelTokenSource, setCancelTokenSource] = useState(axios.CancelToken.source());

  useEffect(() => {}, []);

  const getNewCancelToken = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource({...source});
    return source;
  };

  return {
    cancelTokenSource: cancelTokenSource,
    getNewCancelToken: getNewCancelToken,
  };
}
