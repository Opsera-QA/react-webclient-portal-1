import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
/*import TopFiveDashboardsBadgeView from "components/insights/dashboards/top_five/TopFiveDashboardsBadgeView";
import LoadingIcon from "components/common/icons/LoadingIcon";*/
import { Badge, Button } from "react-bootstrap";
import PropTypes from "prop-types";

/*import dashboardsButtonView from "./TopFiveDashboardsBadgeView";
import TagsCloudBase from "components/common/fields/tags/cloud/TagsCloudBase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";*/

function TopFiveDashboards({ loadDashboardById }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardsList, setDashboardsList] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getDashboards(cancelSource);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDashboards = async (cancelSource = cancelTokenSource) => {
    const response = await dashboardsActions.getTopFiveDashboardsV2(getAccessToken, cancelSource);
    const dashboards = response?.data?.data;

    if (isMounted.current === true && dashboards) {
      setDashboardsList(dashboards);
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (<div></div>);  //<LoadingIcon isLoading={isLoading} className={"mr-2 my-auto"}/>Loading favorite dashboards
    }

    let d = new Date();
    d.setDate(d.getDate()-12);

    return (

      <div className="mt-2">
        {dashboardsList.map((item, key) => (
          <div key={key} className={"my-1"}>
            <Button
              className="w-100"
              variant="outline-secondary" size="sm"
              onClick={() => {
                loadDashboardById(item._id);
              }}
            >
              {item.name.substring(0, 30)}
              {new Date(item.createdAt) > d &&
              <Badge variant="secondary" className="ml-1" size="sm">
                New
              </Badge>
              }
            </Button>
          </div>
        ))}
      </div>

    );
  };

  return (
    <div>
      {getBody()}
    </div>
  );

}

TopFiveDashboards.propTypes = {
  loadDashboardById: PropTypes.func,
};


export default TopFiveDashboards;