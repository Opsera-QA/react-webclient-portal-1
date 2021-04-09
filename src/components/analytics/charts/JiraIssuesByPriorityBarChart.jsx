// Dashboard Planning Tab, Persona Executives/Managers, Node Ticket AN-164
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
import { defaultConfig, assignTaskColors } from '../../insights/charts/charts-views';
import ChartTooltip from '../../insights/charts/ChartTooltip';

function JiraIssuesByPriorityBarChart({ persona, date }) {
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
        if (err.name === "AbortError")
          // console.log("Request was canceled via controller.abort");
          return;
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
          request: "jiraIssuesByPriority",
          metric: "bar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res?.data?.data[0] ? res.data.data[0].jiraIssuesByPriority : [];
      assignTaskColors(dataObject?.data);
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  };

  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if (loading) return <LoadingDialog size="sm" />;
  else if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  else
    return (
      <>
        <ModalLogs
          header="Issues By Project"
          size="lg"
          jsonMessage={data.data}
          dataType="bar"
          show={showModal}
          setParentVisibility={setShowModal}
        />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Jira: Issues By Project</div>
          {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
            <ResponsiveBar
              data={data ? data.data : []}
              {...defaultConfig('Project', 'Number of Issues', 
                                true, false, 'cutoffString', 'wholeNumbers')}
              onClick={() => setShowModal(true)}
              keys={["Story", "Task", "Subtask", "Bug"]}
              indexBy="project"
              layout={"horizontal"}
              colors={({ id, data }) => data[`${id}_color`]}
              colorBy="id"
              tooltip={({ indexValue, id, data }) => <ChartTooltip 
                      titles={["Project", "Issue Type", "Number of Lowest Priority Issues",
                              "Number of Low Priority Issues", "Number of Medium Priority Issues",
                              "Number of High Priority Issues", "Number of Highest Priority Issues",
                              "Number of Blocker Issues"]}
                      values={[indexValue, id, data[id + "-Lowest"], data[id + "-Low"],
                              data[id + "-Medium"], data[id + "-High"], data[id + "-Highest"],
                              data[id + "-Blocker"]]}
                      style = {false} />}
            />
          )}
        </div>
      </>
    );
}
JiraIssuesByPriorityBarChart.propTypes = {
  persona: PropTypes.string,
};

export default JiraIssuesByPriorityBarChart;
