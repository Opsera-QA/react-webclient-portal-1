// Ticket Number - AN 44 Time To Restore Metrics
// Worked on By - Shrey Malhotra
// Sprint - Analytics Mt. Rainier

import React, { useState, useEffect, Fragment, useContext  } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveBar } from "@nivo/bar";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import { line } from "d3-shape";
import config from "./timeToRestoreBarChartConfigs";
import "./charts.css";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
const lineColor = "rgba(200, 30, 15, 1)";
const barColor = "#0095ff";


function TimeToRestoreBarChart() {
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
  }, []);


  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      "data": [
        {
          "request": "timeToRestore",
          "metric": "bar"
        }
      ]
    };
    
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);     
      let dataObject = res && res.data ? res.data.data[0].timeToRestore : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }



  const Line = ({ bars, xScale, yScale }) => {
    const lineGenerator = line()
      .x(bar => xScale(bar.data.indexValue) + bar.width / 2)
      .y(bar => yScale(bar.data.data.mean));

    return (
      <Fragment>
        <path
          d={lineGenerator(bars)}
          fill="none"
          stroke={lineColor}
          style={{ pointerEvents: "none" }}
        />
        {bars.map(bar => (
          <circle
            key={bar.key}
            cx={xScale(bar.data.indexValue) + bar.width / 2}
            cy={yScale(bar.data.data.mean)}
            r={4}
            fill="white"
            stroke={lineColor}
            style={{ pointerEvents: "none" }}
          />
        ))}
      </Fragment>
    );
  };

  Line.propTypes = {
    bars: PropTypes.object,
    xScale: PropTypes.func,
    yScale: PropTypes.func
  };

  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 || data.data.length === 0) {
  //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);
  } else {    
    return (
      <>
        <ModalLogs header="Time To Restore" size="lg" jsonMessage={data.data} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Time To Restore</div>
          {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 || data.data.length === 0) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            : 
            <ResponsiveBar
              data={data ? data.data : []}
              onClick={() => setShowModal(true)}
              keys={config.keys}
              indexBy="x"
              margin={config.margin}
              padding={0.3}
              layout={"vertical"}
              colors={[barColor]}
              borderColor={{ theme: "background" }}
              colorBy="id"
              defs={config.defs}
              fill={config.fill}
              axisTop={null}
              axisRight={null}
              axisBottom={config.axisBottom}
              axisLeft={config.axisLeft}
              labelSkipWidth={12}
              labelSkipHeight={12}
              enableLabel={false}
              borderRadius={5}
              labelTextColor="inherit:darker(2)"
              animate={true}
              motionStiffness={90}
              borderWidth={2}
              layers={["grid", "axes", "bars", Line, "markers", "legends"]}
              motionDamping={15}
              tooltip={({ indexValue, value, data, color }) => (
                <div>
                  <strong style={{ color }}>  Date: </strong> {indexValue}<br></br>
                  <strong style={{ color }}>  Downtime (seconds): </strong> {value} Seconds<br></br>
                  <strong style={{ color }}>  Domain: </strong> {data.domain}
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

export default TimeToRestoreBarChart;
