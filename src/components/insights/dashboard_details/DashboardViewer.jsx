import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
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

function DashboardViewer(dashboardData) {
  return (
    <div>
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

DashboardViewer.propTypes = {
  dashboardName: PropTypes.string
};

export default DashboardViewer;
