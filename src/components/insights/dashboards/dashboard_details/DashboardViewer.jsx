import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import InfoDialog from "components/common/status_notifications/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/pro-light-svg-icons";
import DataNotFoundContainer from "components/common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "components/common/status_notifications/data_not_found/DataNotFoundDialog";
import ObjectJsonModal from "components/common/modal/ObjectJsonModal";
import ChartView from "../../charts/ChartView";
function DashboardViewer({dashboardData, breadcrumbDestination, managementViewLink, managementTitle, type}) {
  const history = useHistory();
  const [kpis, setKpis] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData(dashboardData);
  }, []);

  const loadData = async (newDashboardData) => {
    setKpis(newDashboardData?.data?.configuration);
  }

  const gotoMarketplace = () => {
    // redirect to marketplace
    history.push({ pathname:`/insights/marketplace`, state: {"dashboardId": dashboardData.getData("_id")}});
  }

  const getKpiView = () => {
    if (kpis == null || kpis.length === 0) {
      return (
        <div className="my-5">
          <InfoDialog size="m" message="Your dashboard is empty! Add KPIs using the Add New KPI button"/>
        </div>
      );
    }

    return (
      <div className="px-2" style={{minWidth: "505px"}}>
        <Row className="px-2">
          {kpis.map(function (kpiConfiguration, index) {
            return (
              <Col xl={6} md={12} className="p-2" key={kpiConfiguration._id}>
                <ChartView kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} index={index} loadChart={loadData} setKpis={setKpis}/>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  };

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
      <div className="px-2 mb-1 d-flex justify-content-end">
        <div>
          <Button className="mr-1" size="sm" disabled={kpis.length >= 10} onClick={() => gotoMarketplace() }>
            <span><FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1"/>Add New KPI</span>
          </Button>
        </div>
        <div>
          <Button className="mr-1" size="sm" onClick={() => setShowModal(true) }>
            <span><FontAwesomeIcon icon={faSearch} fixedWidth className="mr-1"/>View JSON</span>
          </Button>
        </div>
      </div>
      {getKpiView()}
      <ObjectJsonModal header={`Viewing ${dashboardData.getData("name")} Details`} size="lg" show={showModal} jsonData={dashboardData.data} setParentVisibility={setShowModal}/>
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
