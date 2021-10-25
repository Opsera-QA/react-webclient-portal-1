import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner, faSync } from "@fortawesome/free-solid-svg-icons";

function TaskActivityView({ gitTasksData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [data, setData] = useState("");
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (!gitTasksData) {
      setData("Error: Unable to load task activity due to missing attributes.");
      setData("");
      clearInterval(timer);
      return;
    }

    setLoading(true);

    //first do a delayed call to get initial data (rather than waiting 30 seconds)
    setTimeout(async function() {
      await loadFormData(gitTasksData);
    }, 5000);

    const timerInterval = startTimer();
    setTimer(timerInterval);

  }, []);

//   useEffect(() => {
//     if (itemState !== "running") {
//       //shut it down
//       console.debug("entering a shutdown sequence on timer: ", timer);
//       clearInterval(timer);

//       setTimeout(async function(taskModel) {
//         await loadFormData();
//         setLoading(false);
//       }, 10000);
//     }
//   }, [itemState]);


  const loadFormData = async (gitTasksData) => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const apiUrl = `/tasks/${gitTasksData.getData("_id")}/tool-activity/`;
      const urlParams = { params: { run_count: gitTasksData.getData("run_count") } };
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
      await loadFormData(gitTasksData);
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
            <FontAwesomeIcon icon={faSpinner} fixedWidth size="sm" spin />
            :
            <FontAwesomeIcon icon={faSync} fixedWidth
                             style={{ cursor: "pointer" }}
                             onClick={() => {
                               loadFormData(gitTasksData);
                             }} />}
          <div className="text-right float-right">
            <FontAwesomeIcon icon={faTimes} fixedWidth
                             style={{ cursor: "pointer" }}
                             onClick={() => {
                               handleCloseWindow();
                             }} />
          </div>
        </div>
        <div className="workflow-tool-activity-window">
          {data && data.length > 0 ? data : <>Loading task activity, please stand by...</>}
        </div>
      </div>
    </>);
}


TaskActivityView.propTypes = {
  gitTasksData: PropTypes.object,
  tool_identifier: PropTypes.string,
  runCount: PropTypes.number,
  handleClose: PropTypes.func,
  itemState: PropTypes.string,
};

export default TaskActivityView;