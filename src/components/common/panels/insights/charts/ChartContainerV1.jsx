import React, {useContext, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faTag, faExclamationCircle, faSpinner} from "@fortawesome/pro-light-svg-icons";
import "components/analytics/charts/charts.css";
import {getChartIconFromKpiConfiguration} from "components/insights/charts/charts-helpers";
import InfoDialog from "components/common/status_notifications/info";
import ToggleSettingsIcon from "components/common/icons/details/ToggleSettingsIcon.jsx";
import CustomBadge from "components/common/badges/CustomBadge";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import ChartSettingsOverlay from "components/insights/marketplace/charts/ChartSettingsOverlay";
import { addDays, isSameDay } from "date-fns";

function ChartContainerV1(
  {
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    chart,
    isLoading,
    error,
    loadChart,
    setKpis,
    tableChart,
    chartHelpComponent,
    settingsHelpComponent,
    showSettingsToggle,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [view, setView] = useState("chart");
  const [helpIsShown, setHelpIsShown] = useState(false);
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const closeHelpPanel = () => {
    setHelpIsShown(false);
  };

  const getHelpToggle = () => {
    if (chartHelpComponent && !helpIsShown) {
      return (
        <ActionBarToggleHelpButton
          helpIsShown={helpIsShown}
          toggleHelp={() => setHelpIsShown(!helpIsShown)}
          visible={!helpIsShown}
          size={"1x"}
        />
      );
    }
  };

  const showSettingsPanel = () => {
    toastContext.showOverlayPanel(
      <ChartSettingsOverlay
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        settingsHelpComponent={settingsHelpComponent}
        dashboardData={dashboardData}
        index={index}
        loadData={loadChart}
        setKpis={setKpis}
        setView={setView}
        isMounted={isMounted}
      />
    );
  };

  // TODO: This is a workaround, but I want to come up with a better solution
  const getSettingsToggle = () => {
    if (showSettingsToggle !== false) {
      return (
        <ToggleSettingsIcon
          className={"ml-2"}
          visible={!helpIsShown}
          activeTab={view}
          setActiveTab={() => showSettingsPanel()}
        />
      );
    }
  };

  const getTitleBar = () => {
    if (isLoading) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Chart</span>);
    }

    if (error) {
      return (
        <div className="d-flex justify-content-between">
          <span>
            <FontAwesomeIcon icon={faExclamationCircle} spin fixedWidth className="mr-1"/>
            Error Loading Chart!
          </span>
          <div>
            {getSettingsToggle()}
          </div>
        </div>
      );
    }

    return (
      <div className="d-flex justify-content-between">
        <div className={"d-flex"}>
          <div>
            <FontAwesomeIcon icon={getChartIconFromKpiConfiguration(kpiConfiguration)} fixedWidth className="mr-1"/>
            {kpiConfiguration?.kpi_name + getDate()}
          </div>
      </div>
        <div className={"d-flex"}>
          {getHelpToggle()}
          {getSettingsToggle()}
        </div>
      </div>
    );
  };

  // TODO: Make ErrorChartContainer
  const getChartBody = () => {
    if (error) {
      return (
        <span>There was an error loading this chart: {error.message}. Please check logs for more details.</span>
      );
    }

    if (helpIsShown) {
      return (
        <div className={"m-2"}>
          {chartHelpComponent(closeHelpPanel)}
        </div>
      );
    }

    // TODO: Rework when all are updated
    if (chart === null && !isLoading) {
      return (
        <div className="new-chart mb-3" style={{ height: "300px" }}>
          <div className="max-content-width p-5 mt-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        </div>
      );
    }

    if (chart === null && isLoading) {
      return <div className="m-3" />;
    }

    return (
      <div className={tableChart === true ? "shaded-panel" : "new-chart m-2 shaded-panel"}>
        {chart}
      </div>
    );
  };

  const getTagBadges = () => {
    let kpiConfigTags = kpiConfiguration?.filters[kpiConfiguration?.filters?.findIndex((obj) => obj.type === "tags")]?.value;
    let kpiConfigDashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters?.findIndex((obj) => obj.type === "tags")]?.value;

    const tags = kpiConfigTags && Array.isArray(kpiConfigTags) ? kpiConfigTags : [];
    const dashboardTags = kpiConfigDashboardTags && Array.isArray(kpiConfigDashboardTags) ? kpiConfigDashboardTags : []; 
    let totalTags;

    if (Array.isArray(dashboardTags) && dashboardTags.length > 0) {
      totalTags = [...tags, ...dashboardTags];
    }
    else {
      totalTags = [...tags];
    }

    const finalTags = totalTags.filter((item, pos) => totalTags.indexOf(item) === pos);
    const useKpiTags = kpiConfiguration?.settings?.useKpiTags !== false;
    const useDashboardTags = kpiConfiguration?.settings?.useDashboardTags !== false;

    if (Array.isArray(tags) && tags.length > 0 && useKpiTags &&
        Array.isArray(dashboardTags) && dashboardTags.length > 0 && useDashboardTags) {
      return (
        <div>
        <div className={"m-1 p-2"}>{"Dashboard & KPI Tags Applied"}</div>
        <CustomBadgeContainer>
          {finalTags.map((item, index) => {
            if (typeof item !== "string")
              return (
                <CustomBadge key={index} className={"mx-1 mb-1"} icon={faTag} badgeText={`${item.type}: ${item.value}`}/>
              );
          })}
        </CustomBadgeContainer>
        </div>
      );
    }

    if (Array.isArray(tags) && tags.length > 0 && useKpiTags) {
      return (
        <div>
        <div className={"m-1 p-2"}>{"KPI Tags Applied"}</div>
        <CustomBadgeContainer>
          {tags.map((item, index) => {
            if (typeof item !== "string")
              return (
                <CustomBadge key={index} className={"mx-1 mb-1"} icon={faTag} badgeText={`${item.type}: ${item.value}`}/>
              );
          })}
        </CustomBadgeContainer>
        </div>
      );
    }
    if (Array.isArray(dashboardTags) && dashboardTags.length > 0 && useDashboardTags) {
      return (
      <div>
      <div className={"m-1 p-2"}>{"Dashboard Tags Applied"}</div>
      <CustomBadgeContainer>
          {dashboardTags.map((item, index) => {
            if (typeof item !== "string")
              return (
                <CustomBadge key={index} className={"mx-1 mb-1"} icon={faTag} badgeText={`${item.type}: ${item.value}`}/>
              );
          })}
        </CustomBadgeContainer>
      </div>
      );
    }
  };

  const getDate = () => {
    const date = kpiConfiguration?.filters[kpiConfiguration?.filters?.findIndex((obj) => obj.type === "date")]?.value;
    return (
        date ? isSameDay(new Date(date.startDate), new Date(date.endDate)) ? " for " + new Date(date.startDate).toDateString().split(' ').slice(1).join(' ') : " from " + new Date(date.startDate).toDateString().split(' ').slice(1).join(' ') + " to " + new Date(date.endDate).toDateString().split(' ').slice(1).join(' ') : 
        " from " + addDays(new Date(), -90).toDateString().split(' ').slice(1).join(' ') + " to " + new Date().toDateString().split(' ').slice(1).join(' ')
      );
  };

  return (
    <div className="content-container content-card-1">
      <div className="px-2 content-block-header-inverse title-text-header-2">
        {getTitleBar()}
      </div>
      <div>
        {getChartBody()}
      </div>
      {getTagBadges()}
    </div>
  );
}

ChartContainerV1.propTypes = {
  chart: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadChart: PropTypes.func,
  tableChart: PropTypes.bool,
  chartHelpComponent: PropTypes.func,
  settingsHelpComponent: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default ChartContainerV1;
