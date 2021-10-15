import { React, useEffect, useState, useRef, useContext } from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";
import { AuthContext } from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";

function RequirementCreationToCodeCommit() {
  const { getAccessToken } = useContext(AuthContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);

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

    return () => {};
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "gitlabRequirementCreationToCodeCommit"
      );
      let dataObject = response?.data ? response?.data?.data[0]?.gitlabRequirementCreationToCodeCommit?.data : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
  };

  return (
    <ThreeLineDataBlockBase
      className={"p-2"}
      topText={"Requirement to Code Commit"}
      middleText={
        <MetricScoreText
          score={metrics.averageReqCreationToCodeCommitTimeMins}
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
        />
      }
      //   bottomText={"7% Decrease"}
    />
  );
}

RequirementCreationToCodeCommit.propTypes = {};

export default RequirementCreationToCodeCommit;
