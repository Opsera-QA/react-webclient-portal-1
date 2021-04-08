// Charts that are always shwon at the top of Analytics.jsx

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../api/apiService";
import LoadingDialog from "../../../common/status_notifications/loading";
import ErrorDialog from "../../../common/status_notifications/error";
import InfoDialog from "../../../common/status_notifications/info";
import SummaryCountBlocksView from "../SummaryCountBlocksView";
import SonarMaintainabilityLineChart from "../../charts/SonarMaintainabilityLineChart";
import SonarCodeSmellsLineChart from "../../charts/SonarCodeSmellsLineChart";
import SonarCodeCategoriesNO_VALUEPieChart from "../../charts/sonarCodeCategoriesNO_VALUEPieChart";
import SonarCodeCategoriesOKPieChart from "../../charts/sonarCodeCategoriesOKPieChart";
import TwistlockVulnerability from "../../charts/twistlockVulnerabilityLineChart";
import VulnerabilityLineChart from "../../charts/VulnerabilityTimeSeriesLineChart";
import VulnerabilityByPackage from "../../charts/VulnerabilityByPackageBarChart";
import { Row } from "react-bootstrap";

function CodeView_Manager({ persona, date, index }) {
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
        if (err.name === "AbortError") {
          // console.log("Request was canceled via controller.abort");
          return;
        }
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
          request: "twistlockHighVulnerabilities",
          metric: "count",
        },
        {
          request: "vulnerabilityCounts",
          metric: "complexCount",
        },
        {
          request: "twistlockMidVulnerabilities",
          metric: "count",
        },
        {
          request: "twistlockLowVulnerabilities",
          metric: "count",
        },
        {
          request: "sonarBugs",
          metric: "sum",
        },
        {
          request: "sonarCodeCoverage",
          metric: "bar",
        },
        {
          request: "sonarMaintainability",
          metric: "line",
        },
        {
          request: "sonarCodeSmells",
          metric: "line",
        },
        {
          request: "sonarCodeCategoriesNO_VALUE",
          metric: "pie",
        },
        {
          request: "sonarCodeCategoriesOK",
          metric: "pie",
        },
        {
          request: "twistlockVulStatusHigh",
          metric: "line",
        },
        {
          request: "twistlockVulStatusMed",
          metric: "line",
        },
        {
          request: "twistlockVulStatusLow",
          metric: "line",
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
      vulnerabilityCounts,
      twistlockHighVulnerabilities,
      twistlockMidVulnerabilities,
      twistlockLowVulnerabilities,
      sonarBugs,
    } = data;

    let summaryCountsData = [];

    if (vulnerabilityCounts.status === 200 && vulnerabilityCounts.data !== undefined) {
      for (let item in vulnerabilityCounts.data[0].count) {
        summaryCountsData.push({
          name: vulnerabilityCounts.data[0].count[item].key + " Vulnerabilities",
          value: vulnerabilityCounts.data[0].count[item].doc_count,
          footer: "Anchore",
          status:
            vulnerabilityCounts.data[0].count[item].key === "High" ||
            vulnerabilityCounts.data[0].count[item].key === "Critical"
              ? "danger"
              : vulnerabilityCounts.data[0].count[item].key === "Medium" ||
                vulnerabilityCounts.data[0].count[item].key === "Low"
              ? "warning"
              : null,
        });
      }
    }

    if (twistlockHighVulnerabilities.status === 200 && twistlockHighVulnerabilities.data !== undefined) {
      summaryCountsData.push({
        name: "High Vulnerabilities",
        value: twistlockHighVulnerabilities.data[0].count,
        footer: twistlockHighVulnerabilities.tool,
        status: twistlockHighVulnerabilities.data[0].count > 0 ? "danger" : "success",
      });
    }
    if (twistlockMidVulnerabilities.status === 200 && twistlockMidVulnerabilities.data !== undefined) {
      summaryCountsData.push({
        name: "Medium Vulnerabilities",
        value: twistlockMidVulnerabilities.data[0].count,
        footer: twistlockMidVulnerabilities.tool,
        status: twistlockMidVulnerabilities.data[0].count > 0 ? "warning" : "success",
      });
    }
    if (twistlockLowVulnerabilities.status === 200 && twistlockLowVulnerabilities.data !== undefined) {
      summaryCountsData.push({
        name: "Low Vulnerabilities",
        value: twistlockLowVulnerabilities.data[0].count,
        footer: twistlockLowVulnerabilities.tool,
        status: twistlockLowVulnerabilities.data[0].count > 5 ? "warning" : "success",
      });
    }
    if (sonarBugs.status === 200 && sonarBugs.data !== undefined) {
      summaryCountsData.push({
        name: "Detected Bugs",
        value: sonarBugs.data[0],
        footer: sonarBugs.tool,
        status: sonarBugs.data[0] > 5 ? "warning" : "success",
      });
    }

    return summaryCountsData;
  };

  if (loading) {
    return <LoadingDialog />;
  } else if (error) {
    return <ErrorDialog error={error} />;
  } else if (!index.includes("sonar") && !index.includes("anchore")) {
    return (
      <div
        className="mt-3 bordered-content-block p-3 max-content-width"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row>
          <InfoDialog message="No activity data has been captured for this dashboard. In order to activate secops metrics contact support@opsera.io" />
        </Row>
      </div>
    );
  } else if (
    data === undefined ||
    Object.keys(data).length == 0 ||
    Object.values(data).every((element) => Object.keys(element.data[0]).length === 0) ||
    Object.values(data).every((element) => element.status !== 200)
  ) {
    return <InfoDialog message="No log activity has been captured for this dashboard yet." />;
  } else {
    return (
      <>
        <SummaryCountBlocksView data={countBlockData} />

        {index.includes("anchore") ? <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <VulnerabilityLineChart persona={persona} date={date} />
          </div>
          <div className="align-self-stretch p-2 w-100">
            <VulnerabilityByPackage persona={persona} date={date} />
          </div>
        </div> : ""}

        {index.includes("sonar") ? <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <SonarCodeSmellsLineChart data={data} persona={persona} date={date} />
          </div>

          <div className="align-self-stretch p-2 w-100">
            <SonarMaintainabilityLineChart data={data} persona={persona} date={date} />
          </div>

        </div> : "" }

        {/* {index.includes("sonar") ? <div className="d-flex">
          <div className="align-self-stretch p-2 w-100">
            <SonarCodeCategoriesOKPieChart data={data} persona={persona} date={date} />
          </div>

          <div className="align-self-stretch p-2 w-100">
            <SonarCodeCategoriesNO_VALUEPieChart data={data} persona={persona} date={date} />
          </div>

        </div> : "" } */}
      </>
    );
  }
}

CodeView_Manager.propTypes = {
  persona: PropTypes.string,
};

export default CodeView_Manager;
