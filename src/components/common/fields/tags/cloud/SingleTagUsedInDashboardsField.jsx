import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import DashboardSummaryCard from "components/common/fields/dashboards/DashboardSummaryCard";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import IconBase from "components/common/icons/IconBase";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function SingleTagUsedInDashboardsField({ tag, closePanel, className }) {
  const [dashboards, setDashboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [tag]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadDashboards();
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadDashboards = async () => {
    if (tag != null) {
      const response = await dashboardsActions.getDashboardsByAppliedFilterTags(getAccessToken, cancelTokenSource, [tag]);
      const foundDashboards = DataParsingHelper.parseNestedArray(response, "data.data");

      if (isMounted?.current === true && foundDashboards) {
        setDashboards([...foundDashboards]);
      }
    }
  };

  const getDashboardCards = () => {
    return (
      <Row>
        {dashboards.map((dashboard) => {
          return (
            <Col md={6} key={dashboard._id}>
              <DashboardSummaryCard
                dashboardModel={new Model(dashboard, dashboardMetadata, false)}
                loadDashboardsInNewWindow={false}
                closePanel={closePanel}
              />
            </Col>
          );
        })}
      </Row>
    );
  };


  if (isLoading) {
    return <div className={"my-2"}><LoadingDialog size={"md"} message={"Loading Dashboard Usage"} isLoading={isLoading} /></div>;
  }

  if (!isLoading && tag == null) {
    return null;
  }

  if (!isLoading && (dashboards == null || dashboards.length === 0)) {
    return (
      <div className={className}>
        <div className="text-muted mb-2">
          <div>
            <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
            This tag is not currently applied on filters on any dashboard</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-muted mb-2">
        <span>This tag is applied on filters for {dashboards.length} dashboard{dashboards?.length !== 1 ? 's' : ''}</span>
      </div>
      {getDashboardCards()}
    </div>
  );
}

SingleTagUsedInDashboardsField.propTypes = {
  tag: PropTypes.object,
  closePanel: PropTypes.func,
  className: PropTypes.string
};

export default SingleTagUsedInDashboardsField;