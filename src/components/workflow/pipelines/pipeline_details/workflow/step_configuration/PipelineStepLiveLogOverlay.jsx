import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { faSync } from "@fortawesome/pro-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";
import ConsoleLogOverlay from "components/common/overlays/log/ConsoleLogOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Rewrite
function PipelineStepLiveLogOverlay(
  {
    pipelineId,
    stepId,
    runCount,
    tool_identifier,
    itemState,
  }) {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [data, setData] = useState("");
  const [timer, setTimer] = useState();
  const {
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (!pipelineId || !stepId || !tool_identifier || !runCount) {
      setData("Error: Unable to load tool activity due to missing attributes.");
      setData("");
      clearInterval(timer);
      return;
    }

    setLoading(true);

    //first do a delayed call to get initial data (rather than waiting 30 seconds)
    setTimeout(async function() {
      await loadFormData(pipelineId, stepId, tool_identifier, runCount);
    }, 5000);

    const timerInterval = startTimer();
    setTimer(timerInterval);

  }, []);

  useEffect(() => {
    if (itemState !== "running") {
      //shut it down
      console.debug("entering a shutdown sequence on timer: ", timer);
      clearInterval(timer);

      setTimeout(async function() {
        await loadFormData(pipelineId, stepId, tool_identifier, runCount);
        setLoading(false);
      }, 10000);
    }
  }, [itemState]);


  const loadFormData = async (pipelineId, stepId, tool_identifier, runCount) => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const apiUrl = `/pipelines/${pipelineId}/tool-activity/${stepId}`;
      const urlParams = { params: { tool: tool_identifier, run_count: runCount } };
      const response = await axiosApiService(accessToken).get(apiUrl, urlParams);

      if (response.data && response.data.length > 0) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
    //setLoading(false);
  };

  const startTimer = () => {
    let counter = 0;
    const timerInterval = setInterval(async function() {
      counter++;
      console.log("checking data round ", counter);
      await loadFormData(pipelineId, stepId, tool_identifier, runCount);
      if (counter > 9) {
        clearInterval(timerInterval);
        setLoading(false);
      }
    }, 30 * 1000); // 60 * 1000 milsec
    return timerInterval;
  };

  const getBody = () => {
    return (
      <>
        <div style={{minHeight: "15px"}}>
          <IconBase
            isLoading={isLoading}
            icon={faSync}
            onClickFunction={() => {
              loadFormData(pipelineId, stepId, tool_identifier);
            }}
          />
        </div>
        {data && data.length > 0 ? data : <>Loading tool activity, please stand by...</>}
      </>
    );
  };


  return (
    <ConsoleLogOverlay
      handleCloseFunction={toastContext?.clearOverlayPanel}
      body={getBody()}
    />
  );
}

PipelineStepLiveLogOverlay.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  tool_identifier: PropTypes.string,
  runCount: PropTypes.number,
  itemState: PropTypes.string,
};

export default PipelineStepLiveLogOverlay;