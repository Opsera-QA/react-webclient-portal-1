import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import Model from "core/data_model/model";
import axios from "axios";
import DashboardSummaryCard from "components/common/fields/dashboards/DashboardSummaryCard";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import IconBase from "components/common/icons/IconBase";

function SingleTagUsedInDashboardsField({ tag, closePanel, className }) {
  const { getAccessToken } = useContext(AuthContext);
  const [dashboards, setDashboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [tag]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadDashboards(cancelSource);
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

  const loadDashboards = async (cancelSource = cancelTokenSource) => {
    if (tag != null) {
      const response = await adminTagsActions.getRelevantDashboardsV2(getAccessToken, cancelSource, [tag]);

      if (isMounted?.current === true && response?.data != null) {
        setDashboards(response?.data?.data);
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
            This tag is not currently applied on any dashboard</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-muted mb-2">
        <span>This tag is applied on {dashboards.length} dashboard{dashboards?.length !== 1 ? 's' : ''}</span>
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