import React, { useEffect, useRef } from 'react';
import ApiResponseHelper from "@opsera/persephone/helpers/responses/apiResponse.helper";

export default function usePollingInterval(callback, delay, error, enabled = true) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const errorResponseStatus = ApiResponseHelper.parseResponseStatus(error);

    const tick = () => {
      savedCallback.current();
    };

    if (delay != null && [404, 403].includes(errorResponseStatus) !== true && enabled === true) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, error, enabled]);
}