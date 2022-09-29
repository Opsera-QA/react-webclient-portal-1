import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import InfoDialog from "components/common/status_notifications/info";
import { faUsers } from "@fortawesome/pro-light-svg-icons";
import ChartView from "components/insights/charts/ChartView";
import axios from "axios";
import BadgeBase from "components/common/badges/BadgeBase";
import {faFilter, faTimes} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import ActiveFilterDisplayer from "components/common/filters/ActiveFilterDisplayer";
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

  const getFilterActiveButton = (filter, key) => {
    return (
      <div key={key} className="mx-1 badge badge-light filter-badge">
        <span>{filter.type + ": " + filter.value}</span>
      </div>
    );
  };

  const getActiveFilters = () => {
    let filter1Filters = dashboardModel.getData("filters").find(x => x.type === "hierarchyFilters")?.value?.filter1?.map((value) => {return {"type": "Senior Vice President", "value": value};});
    let filter2Filters = dashboardModel.getData("filters").find(x => x.type === "hierarchyFilters")?.value?.filter2?.map((value) => {return {"type": "Vice President Level 2", "value": value};});
    let filter3Filters = dashboardModel.getData("filters").find(x => x.type === "hierarchyFilters")?.value?.filter3?.map((value) => {return {"type": "Vice President Level 1", "value": value};});
    let filter4Filters = dashboardModel.getData("filters").find(x => x.type === "hierarchyFilters")?.value?.filter4?.map((value) => {return {"type": "Application Director", "value": value};});
    let filter5Filters = dashboardModel.getData("filters").find(x => x.type === "hierarchyFilters")?.value?.filter5?.map((value) => {return {"type": "Application", "value": value};});
    let filter6Filters = dashboardModel.getData("filters").find(x => x.type === "hierarchyFilters")?.value?.filter6?.map((value) => {return {"type": "GitHub Action", "value": value};});
    let filter7Filters = dashboardModel.getData("filters").find(x => x.type === "hierarchyFilters")?.value?.filter7?.map((value) => {return {"type": "Repository", "value": value};});
    let filter8Filters = dashboardModel.getData("filters").find(x => x.type === "hierarchyFilters")?.value?.filter8?.map((value) => {return {"type": "Branch", "value": value};});
    let organizationFilters = dashboardModel.getData("filters").find(x => x.type === "organizations")?.value?.map((value) => {return {"type": "Organization", "value": value?.name};});
    let tagFilters = dashboardModel.getData("filters").find(x => x.type === "tags")?.value;
    let activeFilters = [];
    if (Array.isArray(filter1Filters)) {activeFilters = [...activeFilters, ...filter1Filters];}
    if (Array.isArray(filter2Filters)) {activeFilters = [...activeFilters, ...filter2Filters];}
    if (Array.isArray(filter3Filters)) {activeFilters = [...activeFilters, ...filter3Filters];}
    if (Array.isArray(filter4Filters)) {activeFilters = [...activeFilters, ...filter4Filters];}
    if (Array.isArray(filter5Filters)) {activeFilters = [...activeFilters, ...filter5Filters];}
    if (Array.isArray(filter6Filters)) {activeFilters = [...activeFilters, ...filter6Filters];}
    if (Array.isArray(filter7Filters)) {activeFilters = [...activeFilters, ...filter7Filters];}
    if (Array.isArray(filter8Filters)) {activeFilters = [...activeFilters, ...filter8Filters];}
    if (Array.isArray(organizationFilters)) {activeFilters = [...activeFilters, ...organizationFilters];}
    if (Array.isArray(tagFilters)) {activeFilters = [...activeFilters, ...tagFilters];}

    if (Array.isArray(activeFilters) && activeFilters.length > 0) {
      return (
        <div className="item-field py-2 px-1" style={{overflow: "hidden"}}>
          {activeFilters.map((filter, key) =>  getFilterActiveButton(filter, key))}
        </div>
      );
    }

    return null;
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
        <div className={"d-flex"}>
           {getActiveFilters()}
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
