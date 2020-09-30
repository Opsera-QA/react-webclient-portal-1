// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/status_notifications/loading";
import ErrorDialog from "../../../common/status_notifications/error";
import SummaryCountBlocksView from "../summaryCountBlocksView";
import TimeToRestoreBarChart from "../../charts/timeToRestoreBarChart.jsx";
import InfoDialog from "../../../common/status_notifications/info";
import { Row, Col } from "react-bootstrap";
import CpuUsageByTimeLineChart from "../../charts/CpuUsageByTimeLineChart";
import MemoryUsageByTimeLineChart from "../../charts/MemoryUsageByTimeLineChart";
import InNetworkTrafficByTimeLineChart from "../../charts/InNetworkTrafficByTimeLineChart";
import OutNetworkTrafficByTimeLineChart from "../../charts/OutNetworkTrafficByTimeLineChart";

function OperationsView_Manager({ persona, index }) {
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
          request: "maxCpuUsage",
          metric: "complexCount",
        },
        {
          request: "maxMemoryUsage",
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
      maxCpuUsage,
      maxMemoryUsage,
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

    if (
      maxCpuUsage &&
      maxCpuUsage.status === 200 &&
      maxCpuUsage.data !== undefined &&
      maxCpuUsage.data[0].count.count !== null
    ) {
      summaryCountsData.push({
        name: "Max CPU Usage",
        value: maxCpuUsage.data[0].count.count + "%",
        footer: "",
        status: maxCpuUsage.data[0].count.count > 75 ? "danger" : "",
        info: maxCpuUsage.data[0].count.podName,
      });
    }

    if (
      maxMemoryUsage &&
      maxMemoryUsage.status === 200 &&
      maxMemoryUsage.data !== undefined &&
      maxMemoryUsage.data[0].count !== null
    ) {
      summaryCountsData.push({
        name: "Max Memory Usage",
        value: maxMemoryUsage.data[0].count.count + "%",
        footer: "",
        status: maxMemoryUsage.data[0].count.count > 75 ? "danger" : "",
        info: maxMemoryUsage.data[0].count.podName,
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

        {index.includes("heartbeat") && (
          <div className="d-flex">
            <div className="align-self-stretch p-2 w-100">
              <TimeToRestoreBarChart persona={persona} />
            </div>
            <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 2 */}</div>
          </div>
        )}

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 3 */}</div>
          <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 4 */}</div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 5 */}</div>
          <div className="align-self-stretch p-2 w-100">{/* Self Contained Chart Component 6 */}</div>
        </div>

        <div>
          <CpuUsageByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
        </div>

        <div>
          <MemoryUsageByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
        </div>

        <div>
          <InNetworkTrafficByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
        </div>

        <div>
          <OutNetworkTrafficByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
        </div>
      </>
    );
  }
}

OperationsView_Manager.propTypes = {
  persona: PropTypes.string,
};

export default OperationsView_Manager;
