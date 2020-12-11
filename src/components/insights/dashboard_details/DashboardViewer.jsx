import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Model from "../../../core/data_model/model";
import dashboardsActions from "../dashboards-actions";
import dashboardMetadata from "../dashboard-metadata";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import OpseraPipelineByStatusBarChart from "../../analytics/charts/opseraPipelineByStatusBarChart";

function DashboardDetailView() {
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardsActions.get(id, getAccessToken);

      if (response != null && response.data) {
        setDashboardData(new Model(response.data, dashboardMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="md" message={"Loading dashboard..."}/>);
  }

  return (
    <div>
      <h4>{dashboardData.data.name}</h4>
      <div className="px-2 mb-1 d-flex justify-content-end">
        <div>
          <Button
            variant={"primary"}
            className="mr-1"
            size="sm"
            onClick={() => console.log("NEW KPI")}>
            <span><FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1"/>Add New KPI</span>
          </Button>
        </div>
        <div>
          <Button
            variant={"primary"}
            className="mr-1"
            size="sm"
            onClick={() => console.log("EDIT DASHBOARD")}>
            <span>Edit</span>
          </Button>
        </div>
        <div>
          {/* <Button
                variant={"primary"}
                className="mr-1"
                size="sm"
                onClick={() => console.log("CLONE DASHBOARD")}>
                <span>Clone</span>
              </Button> */}
          <Button
            variant={"danger"}
            className="mr-1"
            size="sm"
            onClick={() => console.log("DELETE DASHBOARD")}>
            <span>Delete</span>
          </Button>
        </div>
      </div>
      <div className="px-2 max-content-width" style={{minWidth: "505px"}}>
        <Row className="px-2">
          <Col xl={6} md={12} className="p-2">
            <div className="align-self-stretch p-2 w-100">
              <OpseraPipelineByStatusBarChart persona={"developer"} date={"now"}/>
            </div>
          </Col>
          <Col xl={6} md={12} className="p-2">
            <div className="align-self-stretch p-2 w-100">
              <OpseraPipelineByStatusBarChart persona={"developer"} date={"now"}/>
            </div>
          </Col>
          <Col xl={6} md={12} className="p-2">
            <div className="align-self-stretch p-2 w-100">
              <OpseraPipelineByStatusBarChart persona={"developer"} date={"now"}/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DashboardDetailView;