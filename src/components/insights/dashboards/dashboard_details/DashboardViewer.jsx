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
import DashboardFiltersInlineInput from "components/insights/dashboards/DashboardFiltersInlineInput";
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
    let svpFilters = dashboardModel.getData("filters").find(x => x.type === "amexFilters").value.svp.map((value) => {return {"type": "SVP", "value": value};});
    let vp2Filters = dashboardModel.getData("filters").find(x => x.type === "amexFilters").value.vp2.map((value) => {return {"type": "VP2", "value": value};});
    let vp1Filters = dashboardModel.getData("filters").find(x => x.type === "amexFilters").value.vp1.map((value) => {return {"type": "VP1", "value": value};});
    let directorFilters = dashboardModel.getData("filters").find(x => x.type === "amexFilters").value.director.map((value) => {return {"type": "Director", "value": value};});
    let applicationFilters = dashboardModel.getData("filters").find(x => x.type === "amexFilters").value.application.map((value) => {return {"type": "Application", "value": value};});
    let actionFilters = dashboardModel.getData("filters").find(x => x.type === "amexFilters").value.action.map((value) => {return {"type": "Action", "value": value};});
    let organizationFilters = dashboardModel.getData("filters").find(x => x.type === "organizations").value.map((value) => {return {"type": "Organization", "value": value.name};});
    let tagFilters = dashboardModel.getData("filters").find(x => x.type === "tags").value;
    let activeFilters = [...svpFilters, ...vp2Filters, ...vp1Filters, ...directorFilters, ...applicationFilters, ...actionFilters, ...organizationFilters, ...tagFilters];
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
          {/*TODO: Make version for dashboards, wire that up instead*/}
          {/* <div className={"mr-2"}>
            <DashboardFiltersInlineInput model={dashboardModel} loadData={loadData} className={"mr-2"} />
          </div>
          <div className={"mr-2"}>
            <DashboardTagsInlineInput model={dashboardModel} loadData={loadData} className={"mr-2"} />
          </div>
          <div>
            <DashboardOrganizationsInlineInput model={dashboardModel} loadData={loadData} className={"mr-2"} />
          </div> */}
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
