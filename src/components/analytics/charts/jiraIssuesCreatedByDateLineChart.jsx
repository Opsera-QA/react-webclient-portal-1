// Analytics Software Development Tab, Developer, Node Ticket AN-153
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveLine } from "@nivo/line";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import config from "./deploymentFrequencyLineChartConfigs";
import "./charts.css";


function JiraIssuesCreatedByDateLineChart( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
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
  }, []);


  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      data: [
        { 
          request: "jiraIssuesCreatedByDate",
          metric: "stacked" 
        }
      ]
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      console.log(res);
      let dataObject = res && res.data ? res.data.data[0].jiraIssuesCreatedByDate : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };

  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) {
    return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  } else {
    console.log(data.data);    
    return (
      <>
        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jira: Issues Created vs. Resolved</div>
          <ResponsiveLine
            data={data ? data.data : []}
            margin={{ top: 40, right: 110, bottom: 70, left: 100 }}
            xScale={{
              type: "time",
              format: "%Y-%m-%d"
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{
              type: "linear",
              stacked: false,
            }}
            axisLeft={{
              "tickSize": 8,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "Number of Issues",
              "legendPosition": "middle",
              "legendOffset": -90
            }}
            axisBottom={{
              format: "%b %d",
              tickValues: "every 2 days",
              legend: "Date",
              "legendPosition": "middle",
              "legendOffset": 50
            }}
            pointSize={10}
            pointBorderWidth={8}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            lineWidth={3.5}
            legends={config.legends}
            colors={d=> d.color}
            // onClick={function(node){console.log(node.id);}}
            tooltip={( node ) => (
              <div style={{
                background: "white",
                padding: "9px 12px",
                border: "1px solid #ccc",
              }}>
                <strong> Date: </strong> {node.point.data.xFormatted} <br></br>
                <strong>  {node.point.serieId}: {node.point.data.yFormatted}  </strong>
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
JiraIssuesCreatedByDateLineChart.propTypes = {
  persona: PropTypes.string
};

export default JiraIssuesCreatedByDateLineChart;
