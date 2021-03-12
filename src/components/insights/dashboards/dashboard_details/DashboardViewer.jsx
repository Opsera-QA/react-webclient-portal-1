import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import InfoDialog from "components/common/status_notifications/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faSearch, faUsers} from "@fortawesome/pro-light-svg-icons";
import DataNotFoundContainer from "components/common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "components/common/status_notifications/data_not_found/DataNotFoundDialog";
import ChartView from "components/insights/charts/ChartView";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";

function DashboardViewer({dashboardData, breadcrumbDestination, managementViewLink, managementTitle, type}) {
  const history = useHistory();
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    loadData(dashboardData);
  }, []);

  const loadData = async (newDashboardData) => {
    setKpis(newDashboardData?.data?.configuration);
  }

  const gotoMarketplace = () => {
    history.push({ pathname:`/insights/marketplace/${dashboardData.getData("_id")}`});
  }

  const getKpiView = () => {
    if (kpis == null || kpis.length === 0) {
      return (
        <div className="my-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
      <div className="px-2 mb-1 d-flex justify-content-between">
        <CustomBadgeContainer>
          <CustomBadge
            className={"upper-case-first"}
            badgeText={dashboardData?.data?.attributes?.persona}
            icon={faUsers}
          />
        </CustomBadgeContainer>
        <div>
          <Button className="mr-1" size="sm" disabled={kpis.length >= 10} onClick={() => gotoMarketplace()}>
            <span><FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1"/>Add New KPI</span>
          </Button>
        </div>
      </div>
      {getKpiView()}
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
