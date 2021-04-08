// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/status_notifications/loading";
import ErrorDialog from "../../../common/status_notifications/error";
import InfoDialog from "../../../common/status_notifications/info";
import SummaryCountBlocksView from "../SummaryCountBlocksView";
import JenkinsBuildDurationBarChart from "../../charts/JenkinsBuildDurationBarChart";
import JenkinsBuildsByUserBarChart from "../../charts/JenkinsBuildsByUserBarChart";
import JenkinsStatusByJobNameBarChart from "../../charts/jenkinsStatusByJobNameBarChart";
import DeploymentFrequencyLineChart from "../../charts/DeploymentFrequencyLineChart.jsx";
import RecentBuildsTable from "../../metrics/RecentBuildsTable.jsx";
import OpseraPipelineByStatusBarChart from "../../charts/OpseraPipelineByStatusBarChart";
import OpseraBuildDurationBarChart from "../../charts/OpseraBuildDurationBarChart";
import OpseraBuildsByUserBarChart from "../../charts/OpseraBuildsByUserBarChart";
import OpseraRecentPipelineStatus from "../../metrics/OpseraRecentPipelineStatus.jsx";
import OpseraDeploymentFrequencyLineChart from "../../charts/OpseraDeploymentFrequencyLineChart.jsx";
import { Row } from "react-bootstrap";

function BuildView_Developer({ persona, date, index }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countBlockData, setCountBlockData] = useState([]);

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
  }, [date, persona, index]);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "jenkinsBuildSuccess",
          metric: "count",
        },
        {
          request: "jenkinsBuildFailure",
          metric: "count",
        },
        {
          request: "jenkinsBuildAborted",
          metric: "count",
        },
        {
          request: "jenkinsDeploySuccess",
          metric: "count",
        },
        {
          request: "jenkinsDeployFailure",
          metric: "count",
        },
        {
          request: "codeshipBuildSuccess",
          metric: "count",
        },
        {
          request: "codeshipBuildFailure",
          metric: "count",
        },
        {
          request: "codeshipBuildStopped",
          metric: "count",
        },
        {
          request: "opseraPipelineSuccess",
          metric: "complexCount",
        },
        {
          request: "opseraPipelineFail",
          metric: "count",
        },
        {
          request: "opseraDeployFailure",
          metric: "count",
        },
        {
          request: "opseraDeploySuccess",
          metric: "count",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0] : [];
      setData(dataObject);
      const countsData = buildSummaryCounts(dataObject);
      setCountBlockData(countsData);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }

  const buildSummaryCounts = (data) => {
    const {
      opseraPipelineSuccess,
      opseraPipelineFail,
      jenkinsBuildSuccess,
      jenkinsBuildFailure,
      jenkinsBuildAborted,
      jenkinsDeploySuccess,
      jenkinsDeployFailure,
      codeshipBuildSuccess,
      codeshipBuildFailure,
      codeshipBuildStopped,
      opseraDeploySuccess,
      opseraDeployFailure,
    } = data;

    let summaryCountsData = [];

    if (jenkinsBuildSuccess.status === 200 && jenkinsBuildSuccess.data !== undefined) {
      summaryCountsData.push({
        name: "Successful Jenkins Builds",
        value: jenkinsBuildSuccess.data[0].count,
        footer: "",
        status: "success",
      });
    }
    if (jenkinsBuildFailure.status === 200 && jenkinsBuildFailure.data !== undefined) {
      summaryCountsData.push({
        name: "Failed Jenkins Builds",
        value: jenkinsBuildFailure.data[0].count,
        footer: "",
        status: jenkinsBuildFailure.data[0].count > 0 ? "danger" : null,
      });
    }
    if (jenkinsBuildAborted.status === 200 && jenkinsBuildAborted.data !== undefined) {
      summaryCountsData.push({
        name: "Aborted Jenkins Builds",
        value: jenkinsBuildAborted.data[0].count,
        footer: "",
        status: jenkinsBuildAborted.data[0].count > 0 ? "warning" : null,
      });
    }
    if (jenkinsDeploySuccess.status === 200 && jenkinsDeploySuccess.data !== undefined) {
      summaryCountsData.push({
        name: "Successful Jenkins Deployments",
        value: jenkinsDeploySuccess.data[0].count,
        footer: "",
        status: jenkinsDeploySuccess.data[0].count > 0 ? "success" : null,
      });
    }
    if (jenkinsDeployFailure.status === 200 && jenkinsDeployFailure.data !== undefined) {
      summaryCountsData.push({
        name: "Failed Jenkins Deployments",
        value: jenkinsDeployFailure.data[0].count,
        footer: "",
        status: jenkinsDeployFailure.data[0].count > 0 ? "danger" : null,
      });
    }
    if (opseraPipelineSuccess.status === 200 && opseraPipelineSuccess.data !== undefined) {
      summaryCountsData.push({
        name: "Successful Opsera Pipeline Runs",
        value: opseraPipelineSuccess.data[0].count,
        footer: "",
        status: "success",
      });
    }
    if (opseraPipelineFail.status === 200 && opseraPipelineFail.data !== undefined) {
      summaryCountsData.push({
        name: "Failed Opsera Pipeline Runs",
        value: opseraPipelineFail.data[0].count,
        footer: "",
        status: "danger",
      });
    }
    if (opseraDeploySuccess.status === 200 && opseraDeploySuccess.data !== undefined) {
      summaryCountsData.push({
        name: "Successful Opsera Deployments",
        value: opseraDeploySuccess.data[0].count,
        footer: "",
        status: "success",
      });
    }
    if (opseraDeployFailure.status === 200 && opseraDeployFailure.data !== undefined) {
      summaryCountsData.push({
        name: "Failed Opsera Deployments",
        value: opseraDeployFailure.data[0].count,
        footer: "",
        status: "danger",
      });
    }
    if (codeshipBuildSuccess.status === 200 && codeshipBuildSuccess.data !== undefined) {
      summaryCountsData.push({
        name: "CodeShip Success",
        value: codeshipBuildSuccess.data[0].count,
        footer: "",
        status: codeshipBuildSuccess.data[0].count > 0 ? "success" : null,
      });
    }
    if (codeshipBuildFailure.status === 200 && codeshipBuildFailure.data !== undefined) {
      summaryCountsData.push({
        name: "CodeShip Failed",
        value: codeshipBuildFailure.data[0].count,
        footer: "",
        status: codeshipBuildFailure.data[0].count > 0 ? "danger" : "success",
      });
    }
    if (codeshipBuildStopped.status === 200 && codeshipBuildStopped.data !== undefined) {
      summaryCountsData.push({
        name: "CodeShip Stopped",
        value: codeshipBuildStopped.data[0].count,
        footer: "",
        status: codeshipBuildFailure.data[0].count > 0 ? "success" : null,
      });
    }

    return summaryCountsData;
  };

  if (loading) {
    return <LoadingDialog />;
  } else if (error) {
    return <ErrorDialog error={error} />;
  } else if (
    !index.includes("opsera-pipeline-step-summary") &&
    !index.includes("jenkins") &&
    !index.includes("codeship")
  ) {
    return (
      <div
        className="mt-3 bordered-content-block p-3 max-content-width"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Row>
          <InfoDialog message="No activity data has been captured for this dashboard. You must run a pipeline in order to activate pipeline metrics" />
        </Row>
      </div>
    );
  } else {
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />
        {index.includes("opsera-pipeline-step-summary") ? (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <OpseraBuildsByUserBarChart persona={persona} date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <OpseraBuildDurationBarChart persona={persona} date={date} />
            </div>
          </div>
        ) : (
          ""
        )}

        {index.includes("opsera-pipeline-step-summary") ? (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <OpseraPipelineByStatusBarChart persona={persona} date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <OpseraDeploymentFrequencyLineChart persona={persona} date={date} />
            </div>
          </div>
        ) : (
          ""
        )}

        {index.includes("opsera-pipeline-step-summary") ? (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <OpseraRecentPipelineStatus persona={persona} date={date} />
            </div>
          </div>
        ) : (
          ""
        )}

        {index.includes("jenkins") ? (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JenkinsBuildsByUserBarChart persona={persona} date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <JenkinsBuildDurationBarChart persona={persona} date={date} />
            </div>
          </div>
        ) : (
          ""
        )}

        {index.includes("jenkins") ? (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <JenkinsStatusByJobNameBarChart persona={persona} date={date} />
            </div>
            <div className="align-self-stretch p-2 w-100">
              <DeploymentFrequencyLineChart persona={persona} date={date} />
            </div>
          </div>
        ) : (
          ""
        )}

        {index.includes("jenkins") ? (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <RecentBuildsTable persona={persona} date={date} />
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

BuildView_Developer.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object,
  index: PropTypes.array,
};

export default BuildView_Developer;
