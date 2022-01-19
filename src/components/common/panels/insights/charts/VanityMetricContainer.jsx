import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import InfoDialog from "components/common/status_notifications/info";
import ToggleSettingsIcon from "components/common/icons/details/ToggleSettingsIcon.jsx";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import ChartSettingsOverlay from "components/insights/marketplace/charts/ChartSettingsOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {parseError} from "components/common/helpers/error-helpers";
import {getMetricFilterValue} from "components/common/helpers/metrics/metricFilter.helpers";
import MetricTagBadge from "components/common/badges/tag/MetricTagBadge";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";

// TODO: Clean up and combine with ChartContainer for a v2 container
function VanityMetricContainer(
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
    className,
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
          className={"ml-3 my-auto"}
          visible={!helpIsShown}
          activeTab={view}
          setActiveTab={() => showSettingsPanel()}
        />
      );
    }
  };

  const getTitleBar = () => {
    if (isLoading) {
      return (
        <div className={"h-100 d-flex justify-content-between"}>
          <span className={"my-auto"}>
            <IconBase isLoading={true} className="mr-1"/>
            Loading Chart
          </span>
        </div>
      );
    }

    if (error) {
      return (
        <div className={"h-100 d-flex justify-content-between"}>
          <div className={"my-auto"}>
            <IconBase icon={faExclamationCircle} fixedWidth className="mr-1"/>
            Error Loading Chart!
          </div>
          <div className={"d-flex my-auto"}>
            {getSettingsToggle()}
          </div>
        </div>
      );
    }

    return (
      <div className={"h-100 d-flex justify-content-between"}>
        <div className={"my-auto"}>
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
        <div className="new-chart mb-3" style={{height: "300px"}}>
          <div className="max-content-width p-5 mt-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className={"-5"}>There was an error loading this chart: {parseError(error?.message)}. Please check logs for more details.</span>
          </div>
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

  const getDateBadge = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");

    return (
      <MetricDateRangeBadge
        startDate={date?.startDate}
        endDate={date?.endDate}
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

VanityMetricContainer.propTypes = {
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
  className: PropTypes.string,
};

export default VanityMetricContainer;
