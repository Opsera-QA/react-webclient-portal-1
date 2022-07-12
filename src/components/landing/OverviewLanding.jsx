import React, {useContext, useEffect, useRef, useState} from "react";
import { AuthContext } from "contexts/AuthContext";
import { Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import FreeTrialLandingView from "../free_trial/landing_page/Landing";
import MyTagCloud from "components/common/fields/tags/cloud/MyTagCloud";
import axios from "axios";
import landingActions from "components/landing/landing.actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "../common/status_notifications/loading";
import OverviewLandingToolchainContentBlock from "components/landing/blocks/OverviewLandingToolchainContentBlock";
import OverviewLandingDeclarativePipelinesContentBlock
  from "components/landing/blocks/OverviewLandingDeclarativePipelinesContentBlock";
import OverviewLandingInsightsContentBlock from "components/landing/blocks/OverviewLandingInsightsContentBlock";
import { faEnvelope, faQuestion } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";


function OverviewLanding() {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [statsData, setStatsData] = useState({});
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [summaryStats, setSummaryStats] = useState([]);
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

  const getWelcomeText = () => {
    let welcomeText = "Welcome Back";

    if (userInfo?.firstName) {
      welcomeText += ` ${userInfo?.firstName}`;
    }

    return (
      <div className="h4 text-color mb-3">
        {welcomeText}
      </div>
    );
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
          <OverviewLandingToolchainContentBlock/>
        </Col>
        <Col md={4}>
          <OverviewLandingDeclarativePipelinesContentBlock
            recentPipelines={statsData?.recentPipelines}
            pendingPipelines={statsData?.pendingPipelines}
          />
        </Col>
        <Col md={4}>
          <OverviewLandingInsightsContentBlock />
        </Col>
      </Row>
      <hr/>
      <Row className="mt-3 mr-2">
        <Col md={6}>
          <div>
            <div className="h5 text-color"><IconBase icon={faEnvelope} className={"text-muted mr-1"} />
              Need help?
            </div>
            <div className="h6">
              Send an email to support@opsera.io
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div>
            <div className="h5 text-color"><IconBase icon={faQuestion} className={"text-muted mr-1"} />
              Frequently Asked Questions
            </div>
            <div className="h6">
              <Link to={"/faq"} >View our frequently asked questions.</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default OverviewLanding;
