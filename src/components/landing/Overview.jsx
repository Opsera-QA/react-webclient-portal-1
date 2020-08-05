//landing page after user signs in
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { Row, Col, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SummaryCountBlocksView from "../analytics/views/summaryCountBlocksView";
import FreeTrialLandingView from "../free_trial/landing_page/Landing";
import LoadingView from "../common/loading"
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
    getRoles();
  }, []);

  const getRoles = async () => {
    const user = await getUserRecord();
    userAccess = await setAccessRoles(user);
    setAccessRoleData(userAccess.Role);
    console.log(userAccess.Role);
    if (userAccess.Role !== "free_trial") {
      await loadData();
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
        { name: "My Pipelines", value: response.data.pipelines, footer: null, status: null },
        { name: "Platforms", value: response.data.applications, footer: null, status: null },
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

  const loadPipelines = (id) => {
    // eslint-disable-next-line react/prop-types
    if (id) {
      history.push("/workflow/" + id);
    } else {
      history.push("/workflow");
    }
  };

  const loadAnalytics = () => {
    // eslint-disable-next-line react/prop-types
    history.push("/analytics");
  };

  if (!accessRoleData) {
    return (<LoadingView size="sm" />)
  } else if (accessRoleData === "free_trial") {
    return (<FreeTrialLandingView/>);
  } else {
    return (
      <>
        <div className="mt-3 ml-5">
          <Row>
            <Col xl="12">
              <div style={{ maxWidth: "1025px" }}>
                <div className="h5 mb-3">Welcome back {userInfo && userInfo.name ? userInfo.name : null}!</div>

                <div className="row mx-n2 mt-2" style={{ minWidth: "820px" }}>
                  <div className="col-md h4 text-muted mb-4">Get started with OpsERA</div>

                  <div className="col-md px-2">
                    <SummaryCountBlocksView data={summaryStats} view="small"/>
                  </div>
                </div>

                <div className="row mx-n2 mt-3" style={{ minWidth: "820px" }}>
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
                <div className="row mx-n2 mt-4" style={{ minWidth: "820px" }}>
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
