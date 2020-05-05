// Ticket Number - AN 45 Change Failure Rate
// Worked on By - Syed Faseeh Uddin
// Sprint - Analytics Mt. Rainier
// Persona - Developer/Manager/Executive

import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./DeploymentsStackedBarChartConfigs";
import "./charts.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import InfoDialog from "../../common/info";


function DeploymentsStackedBarChart( { persona } ) {
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
          request: "deployments",
          metric: "stackedBar" 
        }
      ]
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].deployments : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };

  console.log(data);

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  // } else if (typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) {
  //   return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    
    return (
      <>
        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jenkins: Deployments Graph</div>
          {(typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            : 
            <ResponsiveBar
              data={data ? data.data : []}
              keys={config.keys}
              indexBy="buildTime"
              margin={config.margin}
              padding={0.3}
              // layout={"horizontal"}
              colors={{ scheme: "set2" }}
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
              borderWidth={2}
              motionDamping={15}
              tooltip={({ indexValue, color, value, id, data }) => (
                <div>
                  <strong style={{ color }}>
                Build Time: </strong> {indexValue}<br></br>
                  <strong style={{ color }}> {id} Builds: </strong> {value}<br></br>
                  <strong> Failure Rate: </strong> {data.failureRate.toFixed(2)+"%"}
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
          }
        </div>
      </>
    );
  }
}

DeploymentsStackedBarChart.propTypes = {
  persona: PropTypes.string
};

export default DeploymentsStackedBarChart;
