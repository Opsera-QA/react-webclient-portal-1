import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import "components/analytics/charts/charts.css";
import InfoDialog from "components/common/status_notifications/info";
import ToggleSettingsIcon from "components/common/icons/details/ToggleSettingsIcon.jsx";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import ChartSettingsOverlay from "components/insights/marketplace/charts/ChartSettingsOverlay";
import { addDays, isSameDay } from "date-fns";
import IconBase from "components/common/icons/IconBase";
import {parseError} from "components/common/helpers/error-helpers";
import {formatDate} from "components/common/helpers/date/date.helpers";
import {getMetricFilterValue} from "components/common/helpers/metrics/metricFilter.helpers";
import DateBadge from "components/common/badges/date/DateBadge";
import MetricTagBadge from "components/common/badges/tag/MetricTagBadge";

function ChartContainer(
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

    if (loadChart) {
      loadChart();
    }

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(kpiConfiguration)]);

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
          className={"ml-3"}
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
          className={"ml-3"}
          visible={!helpIsShown}
          activeTab={view}
          setActiveTab={() => showSettingsPanel()}
        />
      );
    }
  };

  const getTitleBar = () => {
    if (isLoading) {
      return (<span><IconBase isLoading={true} className="mr-1"/>Loading Chart</span>);
    }

    if (error) {
      return (
        <div className="d-flex justify-content-between">
          <span>
            <IconBase icon={faExclamationCircle} fixedWidth className="mr-1"/>
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
        <div>
          {kpiConfiguration?.kpi_name}
        </div>
        <div className={"d-flex my-auto"}>
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
        <div className="new-chart mb-3" style={{ height: "300px" }}>
          <span>There was an error loading this chart: {parseError(error?.message)}. Please check logs for more details.</span>
        </div>
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
      <div>
        {chart}
      </div>
    );
  };

  const getDashboardTagsBadge = () => {
    const useDashboardTags = kpiConfiguration?.settings?.useDashboardTags !== false;
    const kpiConfigDashboardTags = getMetricFilterValue(dashboardData?.getData("filters"), "tags");

    if (useDashboardTags === true) {
      return (
        <MetricTagBadge
          type={"Dashboard"}
          tags={kpiConfigDashboardTags}
          showNoTagsAppliedBadge={true}
        />
      );
    }
  };

  const getKpiTagsBadge = () => {
    const useKpiTags = kpiConfiguration?.settings?.useKpiTags !== false;
    const kpiConfigTags = getMetricFilterValue(kpiConfiguration?.filters, "tags");

    if (useKpiTags === true) {
      return (
        <MetricTagBadge
          type={"KPI"}
          tags={kpiConfigTags}
          showNoTagsAppliedBadge={true}
        />
      );
    }
  };

  // TODO: Make date badge component and also date range badge component
  // TODO: Add date verifier
  const getDateBadge = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");

    if (date == null) {
      const formattedStartDate = formatDate(addDays(new Date(), -90));
      const formattedEndDate = formatDate(new Date());
      return (
        <DateBadge
          badgeText={`${formattedStartDate} to ${formattedEndDate}`}
        />
      );
    }

    const startDate = date?.startDate;
    const endDate = date?.endDate;

    // TODO: Add date check

    if (isSameDay(new Date(startDate), new Date(date.endDate))) {
      return (
        <DateBadge
          badgeText={formatDate(startDate)}
        />
      );
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    return (
      <DateBadge
        badgeText={`${formattedStartDate} to ${formattedEndDate}`}
      />
    );
  };

  return (
    <div className="metric-chart-container bg-white">
      <div className="px-3 metric-title-bar title-text-header-1 chart-header-name-text">
        {getTitleBar()}
      </div>
      <div>
        {getChartBody()}
      </div>
      <div className={"d-flex p-2 justify-content-between chart-footer-text"}>
        <div>
          {getDateBadge()}
        </div>
        <div className={"d-flex"}>
          <div className={"mr-2"}>{getKpiTagsBadge()}</div>
          <div>{getDashboardTagsBadge()}</div>
        </div>
      </div>
    </div>
  );
}

ChartContainer.propTypes = {
  chart: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadChart: PropTypes.func,
  chartHelpComponent: PropTypes.func,
  settingsHelpComponent: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default ChartContainer;
