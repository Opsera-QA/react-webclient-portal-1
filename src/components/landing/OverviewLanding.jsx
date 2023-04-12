import React, {useEffect, useRef, useState} from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MyTagCloud from "components/common/fields/tags/cloud/MyTagCloud";
import landingActions from "components/landing/landing.actions";
import LoadingDialog from "../common/status_notifications/loading";
import OverviewLandingToolchainContentBlock from "components/landing/blocks/OverviewLandingToolchainContentBlock";
import OverviewLandingDeclarativePipelinesContentBlock
  from "components/landing/blocks/OverviewLandingDeclarativePipelinesContentBlock";
import OverviewLandingInsightsContentBlock from "components/landing/blocks/OverviewLandingInsightsContentBlock";
import { faEnvelope, faQuestion } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function OverviewLanding() {
  const history = useHistory();
  const [statsData, setStatsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [summaryStats, setSummaryStats] = useState([]);
  const isMounted = useRef(false);
  const {
    accessRoleData,
    getAccessToken,
    toastContext,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      if (process.env.REACT_APP_STACK === "free-trial") {
        return;
      }

      setIsLoading(true);
      await loadStats();
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

  const loadStats = async () => {
    const response = await landingActions.getLandingStats(getAccessToken, cancelTokenSource);
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
      history.push("/workflow/owner?activeFilters=&type=owner");
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

    if (userData?.firstName) {
      welcomeText += ` ${userData?.firstName}`;
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

  return (
    <div className="mt-3 ml-3 max-content-width">
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
            <div className="h6 ml-2">
              <Link to={"/faq"} >View our frequently asked questions.</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default OverviewLanding;
