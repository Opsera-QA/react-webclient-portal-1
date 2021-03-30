import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import { Badge, Button } from "react-bootstrap";
import PropTypes from "prop-types";


function TopFiveDashboards({ loadDashboardById }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardsList, setDashboardsList] = useState([]);
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

    if (isMounted.current === true && Array.isArray(dashboardsList) && dashboardsList.length === 0) {
      setDashboardsList(dashboards.slice(0,6));
    }
  };

  const getBody = () => {
    if (isLoading || !Array.isArray(dashboardsList) || dashboardsList.length === 0) {
      return null;
    }

    let d = new Date();
    d.setDate(d.getDate()-12);

    return (

      <div className="mt-2">
        {dashboardsList.map((item, key) => (
          <div key={key} className={"my-1"}>
            <Button
              variant="link"
              onClick={() => {
                loadDashboardById(item._id);
              }}
            >
              {item?.name?.substring(0, 50)}
              {new Date(item?.createdAt) > d &&
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