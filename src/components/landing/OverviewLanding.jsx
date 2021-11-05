import React, {useContext, useEffect, useRef, useState} from "react";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { Row, Col, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FreeTrialLandingView from "../free_trial/landing_page/Landing";
import MyTagCloud from "components/common/fields/tags/cloud/MyTagCloud";
import TopFiveDashboards from "components/insights/dashboards/top_five/TopFiveDashboards";
import axios from "axios";
import landingActions from "components/landing/landing.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "../common/status_notifications/loading";

function OverviewLanding() {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [statsData, setStatsData] = useState({});
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [summaryStats, setSummaryStats] = useState([]);
  let d = new Date();
  d.setDate(d.getDate() - 12);
  const {
    getAccessToken,
    getUserRecord,
    setAccessRoles,
    featureFlagHideItemInProd,
    featureFlagHideItemInTest,
  } = contextType;
  let userAccess = {};
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    getRoles(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    userAccess = await setAccessRoles(user);
    if (userAccess) {
      setAccessRoleData(userAccess);
    }

    if (process.env.REACT_APP_STACK !== "free-trial") {
      await loadData(cancelSource);
    }

    setUserInfo(user);
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadStats(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadStats = async (cancelSource = cancelTokenSource) => {
    const response = await landingActions.getLandingStats(getAccessToken, cancelSource);
    const stats = response?.data;

    if (isMounted.current === true && stats) {
      const pendingPipelines = stats?.pendingPipelines;
      const recentPipelines = stats?.recentPipelines;

      if (Array.isArray(pendingPipelines) && Array.isArray(recentPipelines) && pendingPipelines.length > 0 && recentPipelines.length > 0) {
        let approvalPipelineIds = pendingPipelines.map(a => a._id);
        let i = recentPipelines.length;
        while (i--) {
          if (approvalPipelineIds.includes(recentPipelines[i]._id)) {
            recentPipelines.splice(i, 1);
          }
        }
      }

      setStatsData(stats);

      setSummaryStats([
        {name: "Platforms", value: stats.applications, footer: null, status: null},
        {name: "My Pipelines", value: stats.pipelines, footer: null, status: null},
        {name: "Registered Tools", value: stats.tools, footer: null, status: null},
      ]);
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

  // TODO: Make separate component
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

  // TODO: Make separate component
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

  // TODO: Make separate component
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

  // TODO: Convert to data blocks, left align, make separate component
  const getDataBlocks = () => {
    if (Array.isArray(summaryStats) && summaryStats.length > 0) {
      return (
        summaryStats.map(function (item, index) {
            return (
              <li className="nav-item" key={index}>
                <a className={"nav-link"} href="#"
                   onClick={handleTabClick(index)}>{item.name}: {item.value}</a>
              </li>
            );
          }
        )
      );
    }
  };


  if (!accessRoleData) {
    return (
      <LoadingDialog
        size="sm"
        message={"Loading Overview Landing"}
      />
    );
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return (<FreeTrialLandingView />);
  }

  return (
    <div className="mt-3 ml-5 max-content-width">

      <div className="max-content-width">
        <div className="alternate-tabs text-right">
          <ul className="nav nav-tabs mb-2">
            {getDataBlocks()}
          </ul>
        </div>
        {getWelcomeText()}

        <MyTagCloud/>

        <hr/>

        <Row className="mt-3 mr-2">
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
      <hr/>

      <div className="h5 text-color">Need help?</div>
      <div className="h6 mt-1 mb-5">Send an email to support@opsera.io</div>

    </div>
  );
}

export default OverviewLanding;
