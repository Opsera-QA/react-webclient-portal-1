import React, {useState, useEffect, useContext, useRef} from 'react';
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Environment1 from "./Environment1";
import Environment2 from "./Environment2";
import Environment3 from "./Environment3";

function OverallReleaseTraceabilityMetrics() {
  const toastContext = useContext(DialogToastContext);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  // TODO: If these are separate data pulls,
  //  put the pulls inside the relevant data block components to keep concerns properly separated.
  //  Each data block component should be a separate react component and use the new base ones to keep everything consistent.
  //  If you need something different, feel free to ask me (Noah).
  //  I can also work with you to get this wired up properly once I have an example if needed
  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      // await getOverallReleaseTraceabilityMetrics(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  // const getOverallReleaseTraceabilityMetrics = async (cancelSource = cancelTokenSource) => {
    // const kpiResponse = await KpiActions.getKpisV2(getAccessToken, cancelSource, filterModel);
    // const kpis = kpiResponse?.data?.data;
    //
    // if (isMounted?.current === true && kpiResponse && kpis) {
    //   setKpis(kpis);
    //   let newFilterDto = filterModel;
    //   newFilterDto.setData("totalCount", kpiResponse?.data?.count);
    //   newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
    //   setMarketplaceFilterDto({...newFilterDto});
    // }
  // };

  if (isLoading === true) {
    return (<LoadingDialog message={"Loading Metrics"} />);
  }

  return (
    <div className={"mt-2"}>
      {<Environment1 ></Environment1>}
      {<Environment2 ></Environment2>}
      {<Environment3 ></Environment3>}
    </div>
  );
}

OverallReleaseTraceabilityMetrics.propTypes = {
  dashboardId: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default OverallReleaseTraceabilityMetrics;
