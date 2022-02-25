import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {metricHelpers} from "components/insights/metric.helpers";

function SupportedMetricFilterInputContainer({ children, supportedFilters, filterType }) {
  const [unpackedSupportedFilters, setUnpackedSupportedFilters] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setUnpackedSupportedFilters([]);

    if (hasStringValue(filterType) === true && Array.isArray(supportedFilters)) {
      unpackSupportedFilters().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [supportedFilters, filterType]);

  const unpackSupportedFilters = async () => {
    const unpackedFilterTypes = metricHelpers.unpackSupportedFilterTypes(supportedFilters);

    if (Array.isArray(unpackedFilterTypes)) {
      setUnpackedSupportedFilters([...unpackedFilterTypes]);
    }
  };

  if (!Array.isArray(unpackedSupportedFilters) || !unpackedSupportedFilters?.includes(filterType) || children == null) {
    return <></>;
  }

  return (children);
}

SupportedMetricFilterInputContainer.propTypes = {
  children: PropTypes.any,
  supportedFilters: PropTypes.array,
  filterType: PropTypes.string,
};

export default SupportedMetricFilterInputContainer;
