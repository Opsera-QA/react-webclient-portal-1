import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/status_notifications/error";
import LoadingDialog from "../../common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import config from "./xunitTestDurationBarChartConfigs";
import "./charts.css";


function XUnitTestDurationBarChart( { persona, date } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      "data": [
        {
          "request": "xunitTestNames",
          "metric": "list"
        },
        {
          "request": "xunitTestDuration",
          "metric": "bar"
        }
      ],
      startDate: date.start, 
      endDate: date.end
    };
    
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);     
      let dataObject = res && res.data ? res.data.data[0] : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }, [contextType]);
  
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
  }, [fetchData]);


  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } 
  // else if (typeof data !== "object" || Object.keys(data).length === 0 || data.xunitTestDuration.status !== 200 || data.xunitTestNames.status !== 200) {
  //   return (
  //     <div className="chart mb-3" style={{ height: "300px" }}>
  //       <div className="chart-label-text">X Unit: Maximum Test Durations
  //       </div><InfoDialog  message="No log activity has been captured for this dashboard yet." /></div>);

  // } 
  else {
    return (
      <>
        <ModalLogs header="Maximum Test Durations" size="lg" jsonMessage={data ? data.data : []} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">X Unit: Maximum Test Durations</div>
          <ResponsiveBar
            data={data.xunitTestDuration !== undefined ? data.xunitTestDuration.data : []}
            keys={data.xunitTestNames !== undefined ? data.xunitTestNames.data : []}
            onClick={() => setShowModal(true)}
            groupMode="stacked"
            layout="vertical"
            indexBy="buildId"
            margin={config.margin}
            padding={0.3}
            colors={{ scheme: "nivo" }}
            borderColor={{ theme: "background" }}
            colorBy="id"
            defs={config.defs}
            fill={config.fill}
            axisTop={null}
            axisRight={null}
            axisBottom={config.axisBottom}
            axisLeft={config.axisLeft}
            enableLabel={false}
            borderRadius={0}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(2)"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            // legends={config.legends}
            tooltip={({ indexValue, value, id, color }) => (
              <div>
                <strong style={{ color }}>
              Build Number: </strong> {indexValue}<br></br>
                <strong style={{ color }}> Test Name:  </strong> {id} <br></br>
                <strong style = {{ color }}> Duration: </strong> {value} Seconds
              </div>
            )}
            theme={{
              tooltip: {
                container: {
                  fontSize: "16px",
                },
              },
            }}
          />
        </div>
      </>
    );}  
}

XUnitTestDurationBarChart.propTypes = {
  date: PropTypes.object,
  persona: PropTypes.string,
};

export default XUnitTestDurationBarChart;

