import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { faTimes, faSpinner, faSync } from "@fortawesome/free-solid-svg-icons";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";

function StepToolActivityView({ pipelineId, stepId, runCount, tool_identifier, handleClose, itemState }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [data, setData] = useState("");
  const [timer, setTimer] = useState();

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

  const handleCloseWindow = () => {
    console.log(timer);
    handleClose(false);
    clearInterval(timer);
    setLoading(false);
  };


  return (
    <>
      <div className="console-text workflow-tool-activity-container">
        <div style={{ minHeight: "15px" }}>
          {isLoading ?
            <LoadingIcon iconSize={"sm"} />
            :
            <IconBase icon={faSync}
                             className={"pointer"}
                             onClickFunction={() => {
                               loadFormData(pipelineId, stepId, tool_identifier);
                             }} />}
          <div className="text-right float-right">
            <IconBase icon={faTimes}
                             className={"pointer"}
                             onClickFunction={() => {
                               handleCloseWindow();
                             }} />
          </div>
        </div>
        <div className="workflow-tool-activity-window">
          {data && data.length > 0 ? data : <>Loading tool activity, please stand by...</>}
        </div>
      </div>
    </>);
}


StepToolActivityView.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  tool_identifier: PropTypes.string,
  runCount: PropTypes.number,
  handleClose: PropTypes.func,
  itemState: PropTypes.string,
};

export default StepToolActivityView;