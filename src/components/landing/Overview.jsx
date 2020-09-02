//landing page after user signs in
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { Row, Col, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SummaryCountBlocksView from "../analytics/views/summaryCountBlocksView";
import FreeTrialLandingView from "../free_trial/landing_page/Landing";
import LoadingView from "../common/status_notifications/loading";
import "./landing.css";

function OverviewLanding() {
  const contextType = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [statsData, setStatsData] = useState({});
  const [accessRoleData, setAccessRoleData] = useState();
  const [summaryStats, setSummaryStats] = useState([]);
  const history = useHistory();
  const { getUserRecord, setAccessRoles } = contextType;
  let userAccess = {};

  useEffect(() => {
    console.log("OverviewLanding calling userEffect")
    getRoles();
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    userAccess = await setAccessRoles(user);
    if (userAccess) {
      setAccessRoleData(userAccess);
      console.log(userAccess.Role);
      if (userAccess.Role !== "free_trial") {
        await loadData();
      }
    }
    setUserInfo(user);
  };

  const loadData = async () => {
    try {
      const { getAccessToken } = contextType;
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
      history.push("/workflow");
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
    return (<LoadingView size="sm"/>);
  } else if (accessRoleData.Role === "free_trial") {
    return (<FreeTrialLandingView/>);
  } else {
    return (
      <>
        <div className="mt-3 ml-5 max-content-width-1080">
          <Row>
            <Col xl="12">
              <div className="max-content-width">
                <div className="alternate-tabs text-right">
                  <ul className="nav nav-tabs mb-2">
                    {
                      summaryStats &&
                      summaryStats.map(function(item, index) {
                        return (
                          <li className="nav-item" key={index}>
                            <a className={"nav-link"} href="#" onClick={handleTabClick(index)}>{item.name}: {item.value}</a>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>

                <div className="h4 text-muted mb-5">Welcome
                  back {userInfo && userInfo.firstName ? userInfo.firstName : null}!
                </div>

                <div className="row mx-n2 mt-3">
                  <div className="col-md px-2 landing-content-module">
                    <img
                      alt="OpsERA"
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
                      alt="OpsERA"
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
                      alt="OpsERA"
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
                    <div className="h5">Platform</div>
                    <div className="text-muted pr-2">
                      Get started in your DevOps journey with new tools or experiment with many of our tool offerings to
                      figure out your next steps.
                    </div>
                  </div>
                  <div className="col-md px-2 landing-content-module">
                    <div className="h5">
                      Pipeline
                      {statsData.pendingPipelines && statsData.pendingPipelines.length > 0 && (
                        <Badge variant="danger" className="ml-1">
                          New
                        </Badge>
                      )}
                    </div>

                    {statsData.pendingPipelines && statsData.pendingPipelines.length > 0 ? (
                      <div className="mt-1">
                        {statsData.pendingPipelines.map((item, key) => (
                          <div
                            className="opsera-blue pointer"
                            key={key}
                            onClick={() => {
                              loadPipelines(item._id);
                            }}
                          >
                            {item.name}
                            <Badge variant="warning" className="ml-1" size="sm">
                              Approval Required
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted pr-2">
                        Orchestrate workflows across various technologies and platforms.
                      </div>
                    )}
                  </div>
                  <div className="col-md px-2 landing-content-module">
                    <div className="h5">Analytics</div>
                    <div className="text-muted pr-2">Get real time observability across your various pipelines.</div>
                  </div>
                </div>

              </div>
            </Col>
          </Row>
          <Row>
            <Col xl="12" className="pt-4">
              <hr style={{ width: "820px", textAlign: "left", marginLeft: "0" }}/>
            </Col>
          </Row>
          <Row>
            <Col xl="12" className="pt-2">
              <div className="h5">Need help?</div>
              <div className="medium-blue h6 mt-1">Send an email to support@opsera.io</div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default OverviewLanding;
