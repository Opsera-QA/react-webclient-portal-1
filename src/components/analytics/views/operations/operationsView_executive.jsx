// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/status_notifications/loading";
import ErrorDialog from "../../../common/status_notifications/error";
import SummaryCountBlocksView from "../SummaryCountBlocksView";
import TimeToRestoreBarChart from "../../charts/timeToRestoreBarChart.jsx";
import InfoDialog from "../../../common/status_notifications/info";
import { Row } from "react-bootstrap";

function OperationsView_Executive({ persona, index }) {
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
      data: [],
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
    const { twistlockHighVulnerabilities, twistlockMidVulnerabilities, twistlockLowVulnerabilities, sonarBugs } = data;

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

    return summaryCountsData;
  };

  if (loading) {
    return <LoadingDialog />;
  } else if (error) {
    return <ErrorDialog error={error} />;
  } else if (
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
      </>
    );
  }
}

OperationsView_Executive.propTypes = {
  persona: PropTypes.string,
};

export default OperationsView_Executive;
