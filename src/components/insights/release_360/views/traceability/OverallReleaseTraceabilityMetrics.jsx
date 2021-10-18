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
import HorizontalDataBlocksContainer
  from "../../../../common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";

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

  const getMetricBlocks1 = () => {
    return (
      <HorizontalDataBlocksContainer
        title={"E1 Summary"}
        // onClick={() => onRowSelect()}
      >
      <div className={"d-flex"}>
        <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
          <ThreeLineDataBlockBase
            className={"p-4"}
            topText={"Builds"}
            middleText={<MetricScoreText score={120} />}
            bottomText={<MetricScoreText score={78 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
            showBorder={true}
          />
        </DataBlockBoxContainer>
        <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
          <ThreeLineDataBlockBase
            className={"p-4"}
            topText={"Security"}
            middleText={<MetricScoreText score={52} />}
            bottomText={<MetricScoreText score={91 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS} />}
            showBorder={true}
          />
        </DataBlockBoxContainer>
        <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
          <ThreeLineDataBlockBase
            topText={"Testing"}
            className={"p-4"}
            middleText={<MetricScoreText score={88} />}
            bottomText={<MetricScoreText score={88 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
            showBorder={true}
          />
        </DataBlockBoxContainer>
        <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
          <ThreeLineDataBlockBase
            topText={"Deployments"}
            className={"p-4"}
            middleText={<MetricScoreText score={138} />}
            bottomText={<MetricScoreText score={92 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS} />}
            showBorder={true}
          />
        </DataBlockBoxContainer>
      </div>
      </HorizontalDataBlocksContainer>
    );
  };

  const getMetricBlocks2 = () => {
    return (
      <HorizontalDataBlocksContainer
        title={"E2 Summary"}
        // onClick={() => onRowSelect()}
      >
        <div className={"d-flex"}>
          <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
            <ThreeLineDataBlockBase
              className={"p-4"}
              topText={"Total Builds"}
              middleText={<MetricScoreText score={150} />}
              bottomText={<MetricScoreText score={89 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
              showBorder={true}
            />
          </DataBlockBoxContainer>
          <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
            <ThreeLineDataBlockBase
              className={"p-4"}
              topText={"Total Scans"}
              middleText={<MetricScoreText score={66} />}
              bottomText={<MetricScoreText score={90 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS} />}
              showBorder={true}
            />
          </DataBlockBoxContainer>
          <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
            <ThreeLineDataBlockBase
              topText={"Total Tests"}
              className={"p-4"}
              middleText={<MetricScoreText score={101} />}
              bottomText={<MetricScoreText score={77 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
              showBorder={true}
            />
          </DataBlockBoxContainer>
          <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
            <ThreeLineDataBlockBase
              topText={"Total Deploys"}
              className={"p-4"}
              middleText={<MetricScoreText score={145} />}
              bottomText={<MetricScoreText score={93 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS} />}
              showBorder={true}
            />
          </DataBlockBoxContainer>
        </div>
      </HorizontalDataBlocksContainer>
    );
  };

  const getMetricBlocks3 = () => {
    return (
      <HorizontalDataBlocksContainer
        title={"E3 Summary"}
        // onClick={() => onRowSelect()}
      >
        <div className={"d-flex"}>
          <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
            <ThreeLineDataBlockBase
              className={"p-4"}
              topText={"Total Builds"}
              middleText={<MetricScoreText score={201} />}
              bottomText={<MetricScoreText score={79+"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
              showBorder={true}
            />
          </DataBlockBoxContainer>
          <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
            <ThreeLineDataBlockBase
              className={"p-4"}
              topText={"Total Scans"}
              middleText={<MetricScoreText score={78} />}
              bottomText={<MetricScoreText score={91 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS} />}
              showBorder={true}
            />
          </DataBlockBoxContainer>
          <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
            <ThreeLineDataBlockBase
              topText={"Total Tests"}
              className={"p-4"}
              middleText={<MetricScoreText score={112} />}
              bottomText={<MetricScoreText score={87 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.DANGER} />}
              showBorder={true}
            />
          </DataBlockBoxContainer>
          <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
            <ThreeLineDataBlockBase
              topText={"Total Deploys"}
              className={"p-4"}
              middleText={<MetricScoreText score={167}  />}
              bottomText={<MetricScoreText score={95 +"% Passed"} qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS} />}
              showBorder={true}
            />
          </DataBlockBoxContainer>
        </div>
      </HorizontalDataBlocksContainer>
    );
  };

  if (isLoading === true) {
    return (<LoadingDialog message={"Loading Metrics"} />);
  }

  return (
    <div className={"mt-2"}>
      {getMetricBlocks1()}
      {getMetricBlocks2()}
      {getMetricBlocks3()}
    </div>
  );
}

OverallReleaseTraceabilityMetrics.propTypes = {
  dashboardId: PropTypes.string
};

export default OverallReleaseTraceabilityMetrics;
