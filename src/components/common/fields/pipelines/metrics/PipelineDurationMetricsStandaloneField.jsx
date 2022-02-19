import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {parseError} from "components/common/helpers/error-helpers";
import pipelineActivityLogsActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineActivityLogs.actions";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";

function PipelineDurationMetricsStandaloneField({ pipelineId, pipelineRunCount, className }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineDurationMetrics, setPipelineDurationMetrics] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setPipelineDurationMetrics(undefined);
    setErrorMessage("");


    if (isMongoDbId(pipelineId)) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineId, pipelineRunCount]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadPipelineDurationMetrics(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setErrorMessage(`Error pulling Pipeline Duration Metrics: ${parsedError}`);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadPipelineDurationMetrics = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActivityLogsActions.getPipelineDurationMetricsV2(getAccessToken, cancelSource, pipelineId);
    const pipelineDurationMetrics = response?.data;

    if (pipelineDurationMetrics) {
      setPipelineDurationMetrics(pipelineDurationMetrics);
    }
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <LoadingDialog
          size={"sm"}
          message={"Loading Pipeline Duration Metrics"}
        />
      );
    }

    return (
      <>
        <StandaloneTextFieldBase
          text={pipelineDurationMetrics?.humanizedLastRunDuration}
          label={"Last Pipeline Run Duration"}
          className={"py-2"}
        />
        <StandaloneTextFieldBase
          text={pipelineDurationMetrics?.humanizedLastFiveRunsAverageDuration}
          label={"Last Five Pipeline Runs Average Duration"}
          className={"py-2"}
        />
      </>
    );
  };


  if (isMongoDbId(pipelineId) !== true || typeof pipelineRunCount !== "number" || pipelineRunCount <= 0) {
    return null;
  }

  return (
    <div className={className}>
      {getBody()}
    </div>
  );
}

PipelineDurationMetricsStandaloneField.propTypes = {
  pipelineId: PropTypes.string,
  className: PropTypes.string,
  pipelineRunCount: PropTypes.number,
};

export default PipelineDurationMetricsStandaloneField;