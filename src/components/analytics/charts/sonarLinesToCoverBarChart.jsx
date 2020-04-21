import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
// import InfoDialog from "../../common/info";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./sonarCodeCoverageBarChartConfigs";
import "./charts.css";


function SonarLinesToCoverBarChart( { token, persona } ) {
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getApiData = async () => {
    setLoading(true);
    const apiCall = new ApiService("/analytics/data", { "filter": { "data": [{ "metric": "bar", "request": "sonarCodeCoverage" }] } }, token);
    
    apiCall.get()
      .then(res => {
        let dataObject = res && res.data ? res.data.data[0].sonarCodeCoverage : [];
        setData(dataObject);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err);
        setLoading(false);
      });
  };

  useEffect( () => {
    getApiData();
  }, []);
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    return (
      <>
        <div className="chart-label-text">Sonar: Lines to Cover</div>
        <ResponsiveBar
          data={data ? data.data : []}
          keys={[
            "uncovered_lines",
            "line_coverage"
          ]}
          groupMode="stacked"
          layout="vertical"
          indexBy="buildNum"
          margin={config.margin}
          padding={0.1}
          colors={{ scheme: "set1" }}
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
          //   legends={config.legends}
          tooltip={({ indexValue, value, id, color }) => (
            <div>
              <strong style={{ color }}>
              Build Number: </strong> {indexValue}<br></br>
              <strong style={{ color }}>  {id}: </strong> {value}
            </div>
          )}
          theme={{
            axis: {
              fontSize: "8px"
            },
            tooltip: {
              container: {
                fontSize: "16px",
              },
            },
          }}
        />
      </>
    );
  }
}

SonarLinesToCoverBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default SonarLinesToCoverBarChart;

