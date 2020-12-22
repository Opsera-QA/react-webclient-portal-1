import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Model from "../../../core/data_model/model";
import dashboardsActions from "../dashboards-actions";
import dashboardMetadata from "../dashboard-metadata";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "../../common/status_notifications/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/pro-light-svg-icons";
import ChartView from "../ChartView";
import DataNotFoundContainer from "../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../common/status_notifications/data_not_found/DataNotFoundDialog";
import ObjectJsonModal from "../../common/modal/ObjectJsonModal";
function DashboardViewer({dashboardData, breadcrumbDestination, managementViewLink, managementTitle, type}) {
  const [kpis, setKpis] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setKpis(dashboardData.data.configuration);
    }
    catch (error) {
      if (dashboardData == null) {
        return (
          <DataNotFoundContainer type={type} breadcrumbDestination={breadcrumbDestination}>
            <DataNotFoundDialog
              type={type}
              managementViewTitle={managementTitle}
              managementViewLink={managementViewLink}
            />
          </DataNotFoundContainer>
        )
      }
    }
  }


  const history = useHistory();

  const gotoMarketplace = () => {
    // redirect to maretplace
    history.push({ pathname:`/insights/marketplace`, state: {"dashboardId": dashboardData.getData("_id")}});
  }

  if (dashboardData == null) {
    return (
      <DataNotFoundContainer type={type} breadcrumbDestination={breadcrumbDestination}>
        <DataNotFoundDialog
          type={type}
          managementViewTitle={managementTitle}
          managementViewLink={managementViewLink}
        />
      </DataNotFoundContainer>
    )
  }

  return (
    <div>
      <ObjectJsonModal header={`Viewing ${dashboardData.getData("name")} Details`} size="lg" show={showModal} jsonData={dashboardData.data} setParentVisibility={setShowModal}/>
      <div className="px-2 mb-1 d-flex justify-content-end">
        <div>
          <Button
            variant={"primary"}
            className="mr-1"
            size="sm"
            disabled={kpis.length >= 10}
            onClick={() => gotoMarketplace() }>
            <span><FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1"/>Add New KPI</span>
          </Button>
        </div>
        <div>
          <Button
            variant={"primary"}
            className="mr-1"
            size="sm"
            onClick={() => setShowModal(true) }>
            <span><FontAwesomeIcon icon={faSearch} fixedWidth className="mr-1"/>View JSON</span>
          </Button>
        </div>
      </div>
      {kpis.length > 0 ? 
      <div className="px-2" style={{minWidth: "505px"}}>
        <Row className="px-2">
          {kpis.map (function (kpiConfiguration, index) {
            return (
            <Col xl={6} md={12} className="p-2" key={index}>
            <ChartView kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} index={index}/>
          </Col>
          )
          })}
        </Row>
      </div> :
       <div className="my-5"><InfoDialog size="m" message="Your dashboard is empty! Add KPIs using the Add New KPI button"/></div>
     }
    </div>
  );
}

DashboardViewer.propTypes = {
  dashboardData: PropTypes.object,
  dashboardName: PropTypes.string,
  breadcrumbDestination: PropTypes.string,
  managementViewLink: PropTypes.string,
  managementTitle: PropTypes.string,
  type: PropTypes.string
};

export default DashboardViewer;
