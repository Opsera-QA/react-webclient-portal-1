import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import InfoDialog from "components/common/status_notifications/info";
import {faUsers} from "@fortawesome/pro-light-svg-icons";
import ChartView from "components/insights/charts/ChartView";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import modelHelpers from "components/common/model/modelHelpers";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import DashboardFiltersInput from "components/insights/dashboards/DashboardFiltersInput";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";

function DashboardViewer({dashboardData, breadcrumbDestination, managementViewLink, managementTitle, type}) {
  const { getAccessToken } = useContext(AuthContext);
  const history = useHistory();
  const [dashboardDataDto, setDashboardDataDto] = useState(dashboardData);
  const [kpis, setKpis] = useState([]);
  const [dashboardFilterTagsModel, setDashboardFilterTagsModel] = useState(modelHelpers.getDashboardFilterModel(dashboardDataDto, "tags", dashboardFiltersMetadata));

  useEffect(() => {
    loadData(dashboardDataDto);
  }, []);

  const loadData = async (newDashboardData) => {
    setDashboardDataDto({...newDashboardData});
    setKpis(newDashboardData?.data?.configuration);
  };

  const gotoMarketplace = () => {
    history.push({ pathname:`/insights/marketplace/${dashboardDataDto.getData("_id")}`});
  };

  const validateAndSaveData = async () => {
    return await dashboardsActions.update(dashboardData, getAccessToken);
  };

  const getKpiView = () => {
    if (!Array.isArray(kpis) || kpis.length === 0) {
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
              <ChartView
                key={kpiConfiguration?._id}
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardDataDto}
                index={index} loadChart={loadData}
                setKpis={setKpis}
              />
            );
          })}
        </Row>
      </div>
    );
  };

  if (dashboardDataDto == null) {
    return (
      <AccessDeniedContainer />
    );
  }

  return (
    <div>
      <ActionBarContainer>
        <CustomBadgeContainer>
          <CustomBadge
            className={"upper-case-first"}
            badgeText={dashboardDataDto?.data?.attributes?.persona}
            icon={faUsers}
          />
        </CustomBadgeContainer>       
        <div className="d-flex">
          <DashboardFiltersInput
            dataObject={dashboardFilterTagsModel}
            setDataObject={setDashboardFilterTagsModel}
            loadData={loadData}
            saveData={validateAndSaveData}
            className={"mx-2"}
            dashboardData={dashboardDataDto}
          />
          <NewRecordButton addRecordFunction={gotoMarketplace} disabled={kpis.length >= 10} type={"Kpi"} />
        </div>
      </ActionBarContainer>
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
