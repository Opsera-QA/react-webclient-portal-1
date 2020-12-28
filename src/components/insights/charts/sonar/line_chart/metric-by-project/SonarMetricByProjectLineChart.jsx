// Analytics  Security Tab, Dashboard, Node Ticket AN-48 and AN-49 (persona : Developer/Manager/Executive)

import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../api/apiService";
import { ResponsiveLine } from "@nivo/line";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import config from "./sonarMetricByProjectLineChartConfigs";
import InfoDialog from "components/common/status_notifications/info";
import ModalLogs from "components/common/modal/modalLogs";
import "components/analytics/charts/charts.css";

/**
 *
 * @param {sonarMeasure} param0
 * allowed values
 * "bugs", "classes", "code_smells", "cognitive_complexity", "comment_lines", "comment_lines_density", "complexity",
  "confirmed_issues", "coverage", "duplicated_blocks", "duplicated_files", "duplicated_lines", "duplicated_lines_density",
  "false_positive_issues", "files", "functions", "line_coverage", "lines", "lines_to_cover", "ncloc", "ncloc_language_distribution",
  "open_issues", "reliability_rating", "reliability_remediation_effort", "reopened_issues", "security_rating", "security_remediation_effort",
  "sqale_debt_ratio", "sqale_index", "sqale_rating", "statements", "uncovered_lines", "violations", "vulnerabilities",
  "new_bugs", "new_code_smells", "new_lines_to_cover", "new_reliability_remediation_effort", "new_security_remediation_effort", "new_sqale_debt_ratio",
  "new_technical_debt", "new_uncovered_conditions", "new_uncovered_lines", "new_violations", "new_vulnerabilities", "new_coverage",
  "new_line_coverage", "skipped_tests", "test_errors", "test_execution_time", "test_failures", "test_success_density", "tests",
 */
function SonarMetricByProjectLineChart({ persona, sonarMeasure, date }) {
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
          request: "sonarMeasures-" + sonarMeasure,
          metric: "stacked",
        }
      ],
      startDate: date.start, 
      endDate: date.end
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0]["sonarMeasures-" + sonarMeasure] : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      setLoading(false);
      setErrors(err.message);
    }
  }, [contextType, date]);

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

  const formatTitle = (str) => {
    var i, frags = str.split("_");
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  };

  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if (loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog error={error} />);
  } else {

    return (
      <>
        <ModalLogs header={formatTitle(sonarMeasure)} size="lg" jsonMessage={data&& data.data && data.data} dataType="line" show={showModal} setParentVisibility={setShowModal} />

        <div className="new-chart mb-3" style={{ height: "300px" }}>
          {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            :
            <ResponsiveLine
              data={data ? data.data : []}
              onClick={() => setShowModal(true)}

              margin={{ top: 40, right: 110, bottom: 70, left: 40 }}
              xScale={{
                type: "time",
                format: "%Y-%m-%d",
              }}
              xFormat="time:%Y-%m-%d"
              yScale={{
                type: "linear",
                stacked: false,
              }}
              axisBottom={{
                format: "%b %d",
                tickValues: data.maxLength && data.maxLength > 10 ? 10 : 'every 1 days',
                tickRotation: -25,
                legendOffset: -12,
              }}              
              pointSize={10}
              pointBorderWidth={8}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              lineWidth={3.5}
              legends={config.legends}
              tooltip={(node) => (
                <div style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}>
                  <div>
                    <strong> Quality Gate: </strong> {node.point.data.info._source.qualityGate.status} <br />
                    <strong> Qualifier: </strong>  {node.point.data.info._source.sonarqube_measures.component.qualifier} <br />
                    <strong> Date: </strong> {node.point.data.xFormatted} <br></br>
                    <strong>  {node.point.serieId}: {node.point.data.yFormatted}  </strong>
                  </div>

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


SonarMetricByProjectLineChart.propTypes = {
  persona: PropTypes.string,
  sonarMeasure: PropTypes.string
};

export default SonarMetricByProjectLineChart;

