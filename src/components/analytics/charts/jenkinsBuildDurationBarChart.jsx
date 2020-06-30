import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import InfoDialog from "../../common/info";
import config from "./jenkinsBuildDurationBarChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modalLogs";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";




function JenkinsBuildDurationBarChart( { persona, date } ) {
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
      data: [
        {
          "request": "jenkinsBuildDuration",
          "metric": "bar"
        }
      ], 
      startDate: date.start, 
      endDate: date.end
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jenkinsBuildDuration : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
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

  console.log("Rendering Dep Frequency Charts");

  console.log(data);
  
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);
  } else {
    return (
      <>
     
        <ModalLogs header="Build Duration" size="lg" jsonMessage={data ? data.data : []} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jenkins: Build Duration</div>
          {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            :
            <ResponsiveBar
              data={data ? data.data : []}
              keys={config.keys}
              layout="vertical"
              indexBy="key"
              onClick={() => setShowModal(true)}
              margin={config.margin}
              padding={0.3}
              colors={{ scheme: "category10" }}
              borderColor={{ theme: "background" }}
              colorBy="id"
              defs={config.defs}
              fill={config.fill}
              axisTop={null}
              axisRight={null}
              axisBottom={config.axisBottom}
              axisLeft={config.axisLeft}
              enableLabel={false}
              borderRadius={5}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="inherit:darker(2)"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              legends={config.legends}
              tooltip={({ data, value, color }) => (
                <div>
                  <strong style={{ color }}>  Duration: </strong> {value} minutes <br></br>
                  <strong style={{ color }}>  Build Number: </strong> {data.buildNum} <br></br>
                  <strong style={{ color }}>  Job Name: </strong> {data.jobName} <br></br>
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

JenkinsBuildDurationBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default JenkinsBuildDurationBarChart;

