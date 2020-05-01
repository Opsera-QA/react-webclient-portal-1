// Ticket Number - AN 47 Reliability
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer

import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "../../common/error";
import config from "./jmeterResponseTimeLineChartConfigs";
import "./charts.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";

function JMeterResponseTimeLineChart( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        console.log("FETCHING DATA");
        await getApiData();        
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
  }, []);

  const getApiData = async () => {
    
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      data: [
        { 
          request: "jmeterResponseTime",
          metric: "line" 
        }
      ]
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jmeterResponseTime : [];
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
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) {
    return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    return (
      <>
        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">JMeter: ResponseTime</div>
          <ResponsiveLine
            data={data ? data.data : []}
            margin={{ top: 40, right: 110, bottom: 70, left: 100 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={config.axisBottom}
            axisLeft={config.axisLeft}
            pointSize={10}
            pointBorderWidth={8}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            lineWidth={3.5}
            colors={{ scheme: "category10" }}
            tooltip={({ point, color }) => (
              <div style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",
              }}>
                <strong style={{ color }}>
            Build ID: </strong> {point.data.x}<br></br>
                <strong style={{ color }}>  Response Time: </strong> {point.data.y}<br></br>
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
    );
  }
}
JMeterResponseTimeLineChart.propTypes = {
  persona: PropTypes.string
};

export default JMeterResponseTimeLineChart;
