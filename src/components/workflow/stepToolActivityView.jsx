import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";  
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";


function StepToolActivityView({ pipelineId, stepId, tool_identifier, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [data, setData] = useState("");
  const [timer, setTimer] = useState();
  
  useEffect(() => {
    if (pipelineId && stepId && tool_identifier) {
      loadFormData(pipelineId, stepId, tool_identifier);
      const timerInterval = startTimer();
      setTimer(timerInterval);      
    } else {
      setData("");
      clearInterval(timer);
    }
    //start timer.  This is a temporary solution
  }, []);

  const loadFormData = async (pipelineId, stepId, tool_identifier) => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const apiUrl = `/pipelines/${pipelineId}/tool-activity/${stepId}`;
      const urlParams = { params: { tool: tool_identifier } };
      const response = await axiosApiService(accessToken).get(apiUrl, urlParams);
      console.log("stepId: ", stepId);
      console.log("tool_identifier: ", tool_identifier);
      if (response.data) {
        setData(response.data);
      } else {
        setData("");
      }      
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  const startTimer = () => {
    let counter = 0;
    const timerInterval = setInterval(function() {
      counter++;
      console.log("checking data round ", counter);
      loadFormData(pipelineId, stepId, tool_identifier);
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
  };


  return (
    <>
      <div className="console-text workflow-tool-activity-container">
        <div>
          {isLoading && <FontAwesomeIcon icon={faSpinner} fixedWidth size="sm" spin /> }
          <div className="text-right float-right">
            <FontAwesomeIcon icon={faTimes} fixedWidth
              style={{ cursor: "pointer" }}
              onClick={() => { handleCloseWindow(); }} />
          </div>      
        </div>
        <div className="workflow-tool-activity-window">
          {data}
        </div>
      </div>
    </>);
}
    


StepToolActivityView.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  tool_identifier: PropTypes.string,
  handleClose: PropTypes.func
};

export default StepToolActivityView;