// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/status_notifications/loading";
import ErrorDialog from "../../../common/status_notifications/error";
import SummaryCountBlocksView from "../summaryCountBlocksView";
import TimeToRestoreBarChart from "../../charts/timeToRestoreBarChart.jsx";
import PipelineSuccessLogs from "../../logs/pipelineSuccessLogs";
import PipelineFailureLogs from "../../logs/pipelineFailureLogs";
import OpseraPipelineStatusFailed from "../../logs/opseraPipelineStatusFailed";
import OpseraPipelineStatusSuccess from "../../logs/opseraPipelineStatusSuccess";
import OpseraRecentCDTable from "../../metrics/opseraPipelineRecentCD";
import InfoDialog from "../../../common/status_notifications/info";
import { Row, Col } from "react-bootstrap";
import CpuUsageByTimeLineChart from "../../charts/CpuUsageByTimeLineChart";
import MemoryUsageByTimeLineChart from "../../charts/MemoryUsageByTimeLineChart";
import InNetworkTrafficByTimeLineChart from "../../charts/InNetworkTrafficByTimeLineChart";
import OutNetworkTrafficByTimeLineChart from "../../charts/OutNetworkTrafficByTimeLineChart";

function OperationsView_Developer({ persona, index }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countBlockData, setCountBlockData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, [persona, index]);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "maxCpuMemoryUsage",
          metric: "complexCount",
        },
        {
          request: "TotalPodsUsage",
          metric: "complexCount",
        },
        {
          request: "TotalNodesUsage",
          metric: "complexCount",
        },
        {
          request: "TotalClusterUsage",
          metric: "complexCount",
        },
      ],
      // startDate: "",
      // endDate: "",
      // podName: "prometheus-alertmanager-d47577c4b-7lhhj",
    }; //wire up filter here for counts metrics only!

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0] : [];
      const countsData = buildSummaryCounts(dataObject);
      setCountBlockData(countsData);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  }

  //wire up JUSt for counts block at top.  Data below is sample
  const buildSummaryCounts = (data) => {
    const {
      twistlockHighVulnerabilities,
      twistlockMidVulnerabilities,
      twistlockLowVulnerabilities,
      sonarBugs,
      maxCpuMemoryUsage,
      TotalNodesUsage,
      TotalClusterUsage,
      TotalPodsUsage,
    } = data;

    let summaryCountsData = [];

    if (
      twistlockHighVulnerabilities &&
      twistlockHighVulnerabilities.status === 200 &&
      twistlockHighVulnerabilities.data !== undefined
    ) {
      summaryCountsData.push({
        name: "High Vulnerabilities",
        value: twistlockHighVulnerabilities.data[0].count,
        footer: twistlockHighVulnerabilities.tool,
        status: twistlockHighVulnerabilities.data[0].count > 0 ? "danger" : "success",
      });
    }
    if (
      twistlockMidVulnerabilities &&
      twistlockMidVulnerabilities.status === 200 &&
      twistlockMidVulnerabilities.data !== undefined
    ) {
      summaryCountsData.push({
        name: "Medium Vulnerabilities",
        value: twistlockMidVulnerabilities.data[0].count,
        footer: twistlockMidVulnerabilities.tool,
        status: twistlockMidVulnerabilities.data[0].count > 0 ? "warning" : "success",
      });
    }
    if (
      twistlockLowVulnerabilities &&
      twistlockLowVulnerabilities.status === 200 &&
      twistlockLowVulnerabilities.data !== undefined
    ) {
      summaryCountsData.push({
        name: "Low Vulnerabilities",
        value: twistlockLowVulnerabilities.data[0].count,
        footer: twistlockLowVulnerabilities.tool,
        status: twistlockLowVulnerabilities.data[0].count > 5 ? "warning" : "success",
      });
    }
    if (sonarBugs && sonarBugs.status === 200 && sonarBugs.data !== undefined) {
      summaryCountsData.push({
        name: "Detected Bugs",
        value: sonarBugs.data[0],
        footer: sonarBugs.tool,
        status: twistlockLowVulnerabilities.data[0].count > 5 ? "warning" : "success",
      });
    }

    if (index.includes("metricbeat")) {
      if (
        TotalClusterUsage &&
        TotalClusterUsage.status === 200 &&
        TotalClusterUsage.data !== undefined &&
        TotalClusterUsage.data[0].count !== null
      ) {
        summaryCountsData.push({
          name: "Total Clusters",
          value: TotalClusterUsage.data[0].count,
          footer: "",
        });
      }

      if (
        TotalNodesUsage &&
        TotalNodesUsage.status === 200 &&
        TotalNodesUsage.data !== undefined &&
        TotalNodesUsage.data[0].count !== null
      ) {
        summaryCountsData.push({
          name: "Total Nodes",
          value: TotalNodesUsage.data[0].count,
          footer: "",
        });
      }

      if (
        TotalPodsUsage &&
        TotalPodsUsage.status === 200 &&
        TotalPodsUsage.data !== undefined &&
        TotalPodsUsage.data[0].count !== null
      ) {
        summaryCountsData.push({
          name: "Total Pods",
          value: TotalPodsUsage.data[0].count,
          footer: "",
        });
      }

      maxCpuMemoryUsage.data[0].count.forEach((thisElement) => {
        if (thisElement && thisElement.type === "CPU") {
          if (
            maxCpuMemoryUsage &&
            maxCpuMemoryUsage.status === 200 &&
            maxCpuMemoryUsage.data !== undefined &&
            maxCpuMemoryUsage.data[0].count.count !== null
          ) {
            summaryCountsData.push({
              name: "Max CPU Usage",
              value: thisElement.cpuUsage + "%",
              footer: "",
              status: thisElement.cpuUsage > 75 ? "danger" : "",
              info: thisElement.podName,
            });
          }
        } else {
          if (
            thisElement &&
            maxCpuMemoryUsage &&
            maxCpuMemoryUsage.status === 200 &&
            maxCpuMemoryUsage.data !== undefined &&
            maxCpuMemoryUsage.data[0].count !== null
          ) {
            summaryCountsData.push({
              name: "Max Memory Usage",
              value: thisElement.memoryUsage + "%",
              footer: "",
              status: thisElement.memoryUsage > 75 ? "danger" : "",
              info: thisElement.podName,
            });
          }
        }
      });
    }

    return summaryCountsData;
  };

  if (loading) return <LoadingDialog />;
  if (error) return <ErrorDialog error={error} />;
  else if (
    !index.includes("heartbeat") &&
    !index.includes("opsera-pipeline-step-summary") &&
    !index.includes("jenkins")
  ) {
    return (
      <div
        className="mt-3 bordered-content-block p-3 max-content-width"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Row>
          <InfoDialog message="No activity data has been captured for this dashboard. In order to activate operations metrics contact support@opsera.io" />
        </Row>
      </div>
    );
  } else {
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />
        {index.includes("opsera-pipeline-step-summary") && (
          <div className="mt-3">
            <Row>
              <Col>
                <OpseraPipelineStatusSuccess persona={persona} date={{ start: "now-30d", end: "now" }} />
              </Col>
              <Col>
                <OpseraPipelineStatusFailed persona={persona} date={{ start: "now-30d", end: "now" }} />
              </Col>
            </Row>
          </div>
        )}
        {index.includes("jenkins") && (
          <div className="mt-3">
            <Row>
              <Col>
                <PipelineSuccessLogs persona={persona} />
              </Col>
              <Col>
                <PipelineFailureLogs persona={persona} />
              </Col>
            </Row>
          </div>
        )}
        {index.includes("opsera-pipeline-step-summary") && (
          <div>
            <OpseraRecentCDTable persona={persona} date={{ start: "now-30d", end: "now" }} />
          </div>
        )}

        {/* {index.includes("heartbeat") && (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <TimeToRestoreBarChart persona={persona} />
            </div>
            <div className="align-self-stretch p-2 w-100"></div>
          </div>
        )} */}
        
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 3 */}</div>
          <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 4 */}</div>
        </div>
        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 5 */}</div>
          <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 6 */}</div>
        </div>
        {index.includes("metricbeat") && (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <CpuUsageByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
            </div>
          </div>
        )}
        {index.includes("metricbeat") && (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <MemoryUsageByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
            </div>
          </div>
        )}
        {index.includes("metricbeat") && (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <InNetworkTrafficByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
            </div>
          </div>
        )}
        {index.includes("metricbeat") && (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <OutNetworkTrafficByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
            </div>
          </div>
        )}
      </>
    );
  }
}

OperationsView_Developer.propTypes = {
  persona: PropTypes.string,
};

export default OperationsView_Developer;
