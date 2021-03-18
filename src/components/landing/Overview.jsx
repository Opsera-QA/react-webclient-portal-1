import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { Row, Col, Badge, Button } from "react-bootstrap";
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

  const loadData = async () => {
    try {
      const accessToken = await getAccessToken();
      let apiUrl = "/landing/stats";
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      setStatsData(response.data);

      setSummaryStats([
        { name: "Platforms", value: response.data.applications, footer: null, status: null },
        { name: "My Pipelines", value: response.data.pipelines, footer: null, status: null },
        { name: "Registered Tools", value: response.data.tools, footer: null, status: null },
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

  const loadAnalytics = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/analytics");
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

  if (!accessRoleData) {
    return (<LoadingView size="sm" message={"Loading user data"}/>);
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return (<FreeTrialLandingView/>);
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

          <div className="h4 text-color mb-3">Welcome
            back {userInfo && userInfo.firstName ? userInfo.firstName : null}!
          </div>
          <Row className={"mb-3 mx-0 d-flex"}>
            <Col lg={9}>{!featureFlagHideItemInProd() && !featureFlagHideItemInTest() && <MyTagCloud/>}</Col>
            <Col lg={3}>{!featureFlagHideItemInProd() && !featureFlagHideItemInTest() && <TopFiveDashboards/>}</Col>
          </Row>

          <hr/>

          <div className="row mx-n2 mt-3">
            <div className="col-md px-2 landing-content-module">
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
            <div className="col-md px-2 landing-content-module">
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
            <div className="col-md px-2 landing-content-module">
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
          </div>
          <div className="row mx-n2 mt-4">
            <div className="col-md px-2 landing-content-module">
              <div className="h5 text-color">Toolchain Automation</div>
              <div className="text-muted pr-2">
                You choose your tools, we take care of the rest. Put together the perfect CI/CD stack that fits your
                organization’s goals with zero vendor lock-in.
              </div>
            </div>
            <div className="col-md px-2 landing-content-module">
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

              {statsData.pendingPipelines && statsData.pendingPipelines.length > 0 && (
                <div className="mt-2">
                  {statsData.pendingPipelines.map((item, key) => (
                    <div key={key} className={"my-1"}>
                      <Button
                        variant="outline-secondary" size="sm"
                        style={{ minWidth: "175px" }}
                        onClick={() => {
                          loadPipelines(item._id);
                        }}
                      >
                        {item.name.substring(0, 20)}
                      </Button>
                      <Badge variant="warning" className="ml-1" size="sm">
                        Approval
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md px-2 landing-content-module">
              <div className="h5 text-color">Insights</div>
              <div className="text-muted pr-2">
                Comprehensive software delivery analytics across your CI/CD process in a unified view — including Lead
                Time, Change Failure Rate, Deployment Frequency, and Time to Restore.
              </div>
            </div>
          </div>

        </div>
        <hr/>

        <div className="h5 text-color">Need help?</div>
        <div className="h6 mt-1 mb-5">Send an email to support@opsera.io</div>

      </div>
    </>
  );
}

export default OverviewLanding;
