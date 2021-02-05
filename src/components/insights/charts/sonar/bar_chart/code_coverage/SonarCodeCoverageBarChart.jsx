// Analytics Software Testing, Persona Manager/Developer/Executive, Node Ticket AN-147
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import { ResponsiveBar } from "@nivo/bar";
import config from "./sonarCodeCoverageBarChartConfigs";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import InfoDialog from "components/common/status_notifications/info";

function SonarCodeCoverageBarChart( { date, persona, tags } ) {
  const [showModal, setShowModal] = useState(false);
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
        if (err.name === "AbortError")
          // console.log("Request was canceled via controller.abort");
          return;
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
    const apiUrl = "/analytics/metrics";
    const postBody = {
      request: "sonarCodeCoverage",
      startDate: date.start,
      endDate: date.end,
      tags: tags
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].sonarCodeCoverage : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  else if (error) return <ErrorDialog error={error} />;
  else
  return (
    <>
      <ModalLogs header="Code Coverage" size="lg" jsonMessage={data ? data.data : []} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

      <div className="new-chart mb-3" style={{ height: "300px" }}>
        {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
          <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
          : 
          <ResponsiveBar
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            keys={[
              "coverage",
              "line_coverage"
            ]}
            groupMode="stacked"
            layout="vertical"
            indexBy="analysedAt"
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
            legends={config.legends}
            tooltip={({ indexValue, value, id, color, data }) => (
              <div>
                <strong style={{ color }}>
              Timestamp: </strong> {indexValue}<br></br>
                <strong style={{ color }}>  {id}: </strong> {value} <br></br>
                <strong style={{ color }}> Project Key: </strong> {data.key}
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
  // }
}

SonarCodeCoverageBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default SonarCodeCoverageBarChart;

