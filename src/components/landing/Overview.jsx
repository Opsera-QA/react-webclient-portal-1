import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { Row, Col, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FreeTrialLandingView from "../free_trial/landing_page/Landing";
import LoadingView from "../common/status_notifications/loading";
import MyTagCloud from "components/common/fields/tags/cloud/MyTagCloud";
import TopFiveDashboards from "components/insights/dashboards/top_five/TopFiveDashboards";

function OverviewLanding() {
  const contextType = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [statsData, setStatsData] = useState({});
  const [accessRoleData, setAccessRoleData] = useState();
  const [summaryStats, setSummaryStats] = useState([]);
  const history = useHistory();
  const {
    getAccessToken,
    getUserRecord,
    setAccessRoles,
    featureFlagHideItemInProd,
    featureFlagHideItemInTest,
  } = contextType;
  let userAccess = {};

  let d = new Date();
  d.setDate(d.getDate() - 12);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    userAccess = await setAccessRoles(user);
    if (userAccess) {
      setAccessRoleData(userAccess);
    }

    if (process.env.REACT_APP_STACK !== "free-trial") {
      await loadData();
    }

    setUserInfo(user);
  };

  // TODO: Move to actions file, wire up cancel token to request
  const loadData = async () => {
    try {
      const accessToken = await getAccessToken();
      let apiUrl = "/landing/stats";
      const response = await axiosApiService(accessToken).get(apiUrl, {});

      let data = response.data;

      if (data?.pendingPipelines && data?.recentPipelines && data.pendingPipelines.length > 0 && data.recentPipelines.length > 0) {
        let approvalPipelineIds = data.pendingPipelines.map(a => a._id);
        let i = data.recentPipelines.length;
        while (i--) {
          if (approvalPipelineIds.includes(data.recentPipelines[i]._id)) {
            data.recentPipelines.splice(i, 1);
          }
        }
      }

      setStatsData(data);

      setSummaryStats([
        { name: "Platforms", value: data.applications, footer: null, status: null },
        { name: "My Pipelines", value: data.pipelines, footer: null, status: null },
        { name: "Registered Tools", value: data.tools, footer: null, status: null },
      ]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadPlatforms = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/platform");
  };

  const loadRegistry = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/inventory/tools");
  };

  const loadPipelines = (id) => {
    // eslint-disable-next-line react/prop-types
    if (id) {
      history.push(`/workflow/details/${id}/summary`);
    } else {
      history.push("/workflow/owner");
    }
  };

  const loadDashboardById = (id) => {
    if (id) {
      history.push(`/insights/dashboards/${id}/viewer`);
    }
  };

  const loadAnalytics = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/insights/analytics");
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    if (tabSelection === 0) {
      loadPlatforms();
    } else if (tabSelection === 1) {
      loadPipelines();
    } else {
      loadRegistry();
    }
  };

  const getToolchainBlock = () => {
    return (
      <div className={"landing-content-module"}>
        <div>
          <img
            alt="Toolchain Automation"
            src="/img/platform.png"
            width="195"
            height="225"
            className="d-inline-block align-top pointer"
            onClick={() => {
              loadPlatforms();
            }}
          />
        </div>
        <div className="mt-4">
          <div className="h5 text-color">Toolchain Automation</div>
          <div className="text-muted pr-2">
            You choose your tools, we take care of the rest. Put together the perfect CI/CD stack that fits your
            organization’s goals with zero vendor lock-in.
          </div>
        </div>
      </div>
    );
  };

  const getDeclarativePipelinesBlock = () => {
    return (
      <div className={"landing-content-module"}>
        <div>
          <img
            alt="Declarative Pipelines"
            src="/img/pipeline.png"
            width="195"
            height="225"
            className="d-inline-block align-top pointer"
            onClick={() => {
              loadPipelines();
            }}
          />
        </div>
        <div className="mt-4">
          <div className="h5 text-color">
            Declarative Pipelines
            {statsData.pendingPipelines && statsData.pendingPipelines.length > 0 && (
              <Badge variant="danger" className="ml-1" style={{ fontSize: "small" }}>
                New Pipeline Alerts
              </Badge>
            )}
          </div>
          <div className="text-muted pr-2">
            Pipeline workflows follow a declarative model so you focus on what is required — not how it’s
            accomplished — including: software builds, security scans, unit testing, and deployments.
          </div>

          <div className="mt-2">
            {(statsData.pendingPipelines && statsData.pendingPipelines.length > 0) &&
            <div className="row">
              <div className="col-12">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                     aria-orientation="vertical">

                  {statsData.pendingPipelines.map((item, key) => (
                    <a key={key} className="nav-link pointer" data-toggle="pill"
                       role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => {
                      loadPipelines(item._id);
                    }}>{item.name.substring(0, 30)}
                      {item.name.length > 30 && <>...</>}
                      <span className={"opsera-yellow"} style={{ fontStyle: "italic", fontSize: "smaller", paddingLeft:"5px"}}>Pending Approval</span></a>
                  ))}

                </div>
              </div>
            </div>
            }

            {(statsData.recentPipelines && statsData.recentPipelines.length > 0) &&
            <div className="row">
              <div className="col-12">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                     aria-orientation="vertical">

                  {statsData.recentPipelines.map((item, key) => (
                    <a key={key} className="nav-link pointer" data-toggle="pill"
                       role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => {
                      loadPipelines(item._id);
                    }}>{item.name.substring(0, 50)}
                      {item.name.length > 30 && <>...</>}
                      {new Date(item.createdAt) > d &&
                      <span className={"opsera-yellow"} style={{ fontStyle: "italic", fontSize: "smaller", paddingLeft:"5px"}}>New</span>
                      }
                    </a>
                  ))}

                </div>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    );
  };

  const getInsightsBlock = () => {
    return (
      <div className={"landing-content-module"}>
        <div>
          <img
            alt="Insights"
            src="/img/analytics.png"
            width="195"
            height="225"
            className="d-inline-block align-top pointer"
            onClick={() => {
              loadAnalytics();
            }}
          />
        </div>
        <div className="mt-4">
          <div className="h5 text-color">Insights</div>
          <div className="text-muted pr-2">
            Comprehensive software delivery analytics across your CI/CD process in a unified view — including Lead
            Time, Change Failure Rate, Deployment Frequency, and Time to Restore.
          </div>
          <div className="mt-2">
            <TopFiveDashboards loadDashboardById={loadDashboardById} />
          </div>
        </div>
      </div>
    );
  };

  const getWelcomeText = () => {
    // TODO: Do we want to add comma?
    const nameText = userInfo?.firstName ? `${userInfo?.firstName}` : "";

    return (
      <div className="h4 text-color mb-3">
        {`Welcome Back ${nameText}`}
      </div>
    );
  };

  if (!accessRoleData) {
    return (<LoadingView size="sm" message={"Loading user data"} />);
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return (<FreeTrialLandingView />);
  }

  return (
    <>
      <div className="mt-3 ml-5 max-content-width">

        <div className="max-content-width">
          <div className="alternate-tabs text-right">
            <ul className="nav nav-tabs mb-2">
              {
                summaryStats &&
                summaryStats.map(function(item, index) {
                  return (
                    <li className="nav-item" key={index}>
                      <a className={"nav-link"} href="#"
                         onClick={handleTabClick(index)}>{item.name}: {item.value}</a>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          {getWelcomeText()}

          <MyTagCloud />

          <hr />

          <Row className="mt-3">
            <Col md={4}>
              {getToolchainBlock()}
            </Col>
            <Col md={4}>
              {getDeclarativePipelinesBlock()}
            </Col>
            <Col md={4}>
              {getInsightsBlock()}
            </Col>
          </Row>
        </div>
        <hr />

        <div className="h5 text-color">Need help?</div>
        <div className="h6 mt-1 mb-5">Send an email to support@opsera.io</div>

      </div>
    </>
  );
}

export default OverviewLanding;
