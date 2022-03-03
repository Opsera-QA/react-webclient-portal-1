import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import Model from "core/data_model/model";
import DashboardSummaryCard from "components/common/fields/dashboards/DashboardSummaryCard";
import axios from "axios";
import dashboardMetadata from "../../../insights/dashboards/dashboard-metadata";
import TagsUsedInDashboardTable from 'components/reports/tags/dashboards/TagsUsedInDashboardTable';
import {getSingularOrPluralString} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";

function TagArrayUsedInDashboardsField({ tags, showTable }) {
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
  }, [tags]);

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
    if (Array.isArray(tags) && tags.length > 0) {
      const response = await adminTagsActions.getRelevantDashboardsV2(getAccessToken, cancelSource, tags);

      if (isMounted?.current === true && response?.data != null) {
        console.log(response);
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
                loadDashboardInNewWindow={false}
              />
            </Col>
          );
        })}
      </Row>
    );
  };

  const getDisplay = () => {
    if (showTable) {
      return (
        <TagsUsedInDashboardTable data={dashboards} loadData={loadData} isLoading={isLoading} isMounted={isMounted}/>
        );
    }

    return (getDashboardCards());
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Dashboards"} size={"sm"} />;
  }

  if (!isLoading && tags == null || tags.length === 0) {
    return null;
  }

  if (!isLoading && (dashboards == null || dashboards.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"}/>
          This tag combination is not currently applied on any dashboard</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="form-text text-muted mb-2 ml-2">
        <span>This tag combination is used on {dashboards.length} {getSingularOrPluralString(dashboards?.length, "dashboard","dashboards")}</span>
      </div>
      {getDisplay()}
    </div>
  );
}

TagArrayUsedInDashboardsField.propTypes = {
  tags: PropTypes.array,
  showTable: PropTypes.bool
};

export default TagArrayUsedInDashboardsField;