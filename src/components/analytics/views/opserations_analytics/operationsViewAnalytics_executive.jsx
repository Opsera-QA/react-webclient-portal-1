import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/status_notifications/loading";
import ErrorDialog from "../../../common/status_notifications/error";
import SummaryCountBlocksView from "../SummaryCountBlocksView";
import CpuUsageByTimeLineChart from "../../charts/CpuUsageByTimeLineChart";
import MemoryUsageByTimeLineChart from "../../charts/MemoryUsageByTimeLineChart";
import InNetworkTrafficByTimeLineChart from "../../charts/InNetworkTrafficByTimeLineChart";
import OutNetworkTrafficByTimeLineChart from "../../charts/OutNetworkTrafficByTimeLineChart";

function OperationsViewAnalytics_executive({ persona, date }) {
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
  }, [persona, date]);

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
      startDate: date.start,
      endDate: date.end,
      // podName: "prometheus-alertmanager-d47577c4b-7lhhj",
    };

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
    const { maxCpuMemoryUsage, TotalNodesUsage, TotalClusterUsage, TotalPodsUsage } = data;

    let summaryCountsData = [];

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
      maxCpuMemoryUsage &&
      maxCpuMemoryUsage.status === 200 &&
      maxCpuMemoryUsage.data !== undefined &&
      Object.keys(maxCpuMemoryUsage.data[0]).length > 0 &&
      maxCpuMemoryUsage.data[0].count.length > 0
    ) {
      maxCpuMemoryUsage.data[0].count.forEach((thisElement) => {
        if (thisElement) {
          if (thisElement.type === "CPU") {
            summaryCountsData.push({
              name: "Max CPU Usage",
              value: thisElement.cpuUsage + "%",
              footer: "",
              status: thisElement.cpuUsage > 75 ? "danger" : "",
              info: thisElement.podName,
            });
          } else {
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
  else
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <CpuUsageByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <MemoryUsageByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <InNetworkTrafficByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
          </div>
        </div>

        <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <OutNetworkTrafficByTimeLineChart persona={persona} date={{ start: "now-30d", end: "now" }} />
          </div>
        </div>
      </>
    );
}

OperationsViewAnalytics_executive.propTypes = {
  persona: PropTypes.string,
};

export default OperationsViewAnalytics_executive;
