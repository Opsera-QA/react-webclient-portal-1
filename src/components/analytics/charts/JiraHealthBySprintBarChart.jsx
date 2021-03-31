// AN-115
// Dashboard Planning Tab 
// Persona Executives/Managers
// Worked on By Shrey Malhotra

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveBar } from "@nivo/bar";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, assignHealthColors, shortenHealthChartLegend,
         adjustBarWidth } from '../../insights/charts/charts-views';
import ChartTooltip from '../../insights/charts/ChartTooltip';

function JiraHealthBySprintBarChart( { persona, date } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, [date]);


  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      data: [
        { 
          request: "jiraSprintHealthq1",
          metric: "bar" 
        }
      ],
      startDate: date.start, 
      endDate: date.end
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res?.data?.data[0] ? res.data.data[0].jiraSprintHealthq1 : [];
      assignHealthColors(dataObject?.data);
      shortenHealthChartLegend(dataObject?.data);
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  } else {    
    return (
      <>
        <ModalLogs header="Jira: Health" size="lg" jsonMessage={data.data} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jira: Health</div>
          {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            : 
            <ResponsiveBar
              data={data ? data.data : []}
              {...defaultConfig("Project", "Number of Issues", 
                                false, true, "cutoffString", "wholeNumbers", false, true)}
              {...adjustBarWidth(data ? data.data : [])}
              onClick={() => setShowModal(true)}
              keys={["To Do", "In Development", "In Progress", "Peer Review", "Testing", "Done", "For Development", "Production Deploy"]}
              indexBy="key"
              layout={"horizontal"}
              colors={({ id, data }) => data[`${id}_color`]}
              colorBy="id"
              tooltip={({ indexValue, value, id }) => <ChartTooltip 
                      titles={["Project", "Issue Stage", "Number of Issues"]}
                      values={[indexValue, id, value]}
                      style = {false} />}
            />
          }
        </div>
      </>
    );
  }
}
JiraHealthBySprintBarChart.propTypes = {
  persona: PropTypes.string
};

export default JiraHealthBySprintBarChart;
