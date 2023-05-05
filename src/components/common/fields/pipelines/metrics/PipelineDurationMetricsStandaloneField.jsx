import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {parseError} from "components/common/helpers/error-helpers";
import pipelineActivityLogsActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineActivityLogs.actions";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import InfoText from "components/common/inputs/info_text/InfoText";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateHelper from "@opsera/persephone/helpers/date/date.helper";

function PipelineDurationMetricsStandaloneField({ pipelineId, pipelineRunCount, className }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRunDurationText, setLastRunDurationText] = useState("");
  const [lastFiveRunsDurationText, setLastFiveRunsDurationText] = useState("");
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
    setErrorMessage("");
    setLastRunDurationText("");
    setLastFiveRunsDurationText("");

    if (isMongoDbId(pipelineId) && numberHelpers.isNumberGreaterThan(0, pipelineRunCount) === true) {
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
    const lastRunDurationMs = DataParsingHelper.parseNestedInteger(response, "data.data.lastRunDurationInMs");
    const lastFiveRunsDurationAverageInMs = DataParsingHelper.parseNestedInteger(response, "data.data.lastFiveRunsDurationAverageInMs");
    // const totalAverageInMs = DataParsingHelper.parseNestedInteger(response, "data.data.totalAverageInMs");

    setLastRunDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(lastRunDurationMs), ""));
    setLastFiveRunsDurationText(DataParsingHelper.parseString(DateHelper.humanizeDurationForMilliseconds(lastFiveRunsDurationAverageInMs), ""));
  };

  const getLastRunDurationText = () => {
    if (hasStringValue(lastRunDurationText) === true) {
      return lastRunDurationText;
    }

    return isLoading ? "" : "No Valid Metrics to Display";
  };

  const getLastFiveRunsDurationText = () => {
    if (hasStringValue(lastFiveRunsDurationText) === true) {
      return lastFiveRunsDurationText;
    }

    return isLoading ? "" : "No Valid Metrics to Display";
  };

  if (isMongoDbId(pipelineId) !== true || numberHelpers.isNumberGreaterThan(0, pipelineRunCount) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <StandaloneTextFieldBase
        text={getLastRunDurationText()}
        label={"Last Pipeline Run Duration"}
        className={"py-2"}
        isBusy={isLoading}
        visible={pipelineRunCount >= 5}
      />
      <StandaloneTextFieldBase
        text={getLastFiveRunsDurationText()}
        label={"Last Five Pipeline Runs Average Duration"}
        className={"py-2"}
        isBusy={isLoading}
      />
      <InfoText errorMessage={errorMessage} />
    </div>
  );
}

PipelineDurationMetricsStandaloneField.propTypes = {
  pipelineId: PropTypes.string,
  className: PropTypes.string,
  pipelineRunCount: PropTypes.number,
};

export default PipelineDurationMetricsStandaloneField;