import React, {useState, useEffect, useContext, useRef} from 'react';
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import {faAbacus} from "@fortawesome/pro-light-svg-icons";

function OverallReleaseDurationMetrics() {
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
      // await getOverallReleaseDurationMetrics(cancelSource);
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

  // const getOverallReleaseDurationMetrics = async (cancelSource = cancelTokenSource) => {
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

  const getMetricBlocks = () => {
    return (
      <div className={"d-flex"}>
        <DataBlockBoxContainer className={"mr-2"}>
          <ThreeLineDataBlockBase
            icon={faAbacus}
            className={"p-2"}
            topText={"Successful Builds"}
            middleText={<MetricScoreText score={120} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
            bottomText={"6% Decrease"}
          />
        </DataBlockBoxContainer>
        <DataBlockBoxContainer className={"mr-2"}>
          <ThreeLineDataBlockBase
            className={"p-2"}
            topText={"Failed Builds"}
            middleText={<MetricScoreText score={52} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
            bottomText={"24% Increase"}
          />
        </DataBlockBoxContainer>
        <DataBlockBoxContainer className={"mr-2"}>
          <ThreeLineDataBlockBase
            topText={"Success Percentage"}
            className={"p-2"}
            middleText={<MetricPercentageText percentage={88} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
            bottomText={"Goal: 95%"}
          />
        </DataBlockBoxContainer>
      </div>
    );
  };

  if (isLoading === true) {
    return (<LoadingDialog message={"Loading Metrics"} />);
  }

  return (
    <div className={"mt-2"}>
      {getMetricBlocks()}
    </div>
  );
}

OverallReleaseDurationMetrics.propTypes = {
  dashboardId: PropTypes.string
};

export default OverallReleaseDurationMetrics;
