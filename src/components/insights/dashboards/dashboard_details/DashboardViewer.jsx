import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import InfoDialog from "components/common/status_notifications/info";
import { faUsers } from "@fortawesome/pro-light-svg-icons";
import ChartView from "components/insights/charts/ChartView";
import axios from "axios";
import BadgeBase from "components/common/badges/BadgeBase";
import DashboardTagsInlineInput from "components/insights/dashboards/DashboardTagsInlineInput";
import DashboardOrganizationsInlineInput from "components/insights/dashboards/DashboardOrganizationsInlineInput";

function DashboardViewer({ dashboardModel, loadData }) {
  const [kpis, setKpis] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    initializeModel(dashboardModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [dashboardModel]);

  const initializeModel = async (newDashboardData) => {
    setKpis(newDashboardData?.getData("configuration"));
  };

  const getKpiView = () => {
    if (!Array.isArray(kpis) || kpis.length === 0) {
      return (
        <div className="my-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <InfoDialog size="m" message="Your dashboard is empty! Add KPIs using the Add New KPI Icon" />
        </div>
      );
    }

    return (
      <div className="px-2" style={{ minWidth: "505px" }}>
        <Row className="px-2">
          {kpis.map(function (kpiConfiguration, index) {
            return (
              <ChartView
                key={kpiConfiguration?._id}
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardModel}
                index={index}
                loadChart={loadData}
                setKpis={setKpis}
              />
            );
          })}
        </Row>
      </div>
    );
  };

  if (dashboardModel == null) {
    return null;
  }

  return (
    <div>
      <div className={"px-2 pt-2 d-flex justify-content-between"}>
        <div>
          <BadgeBase
            className={"upper-case-first metric-badge mr-2"}
            badgeText={dashboardModel?.getData("attributes")?.persona}
            icon={faUsers}
          />
        </div>
        <div>
          {/*TODO: Make version for dashboards, wire that up instead*/}
          <DashboardTagsInlineInput model={dashboardModel} loadData={loadData} className={"mr-2"} />
          <DashboardOrganizationsInlineInput model={dashboardModel} loadData={loadData} className={"mr-2"} />
        </div>
      </div>
      {getKpiView()}
    </div>
  );
}

DashboardViewer.propTypes = {
  dashboardModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default DashboardViewer;
