import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {faArrowDown, faArrowUp, faCalendar, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import InfoDialog from "components/common/status_notifications/info";
import ToggleSettingsIcon from "components/common/icons/details/ToggleSettingsIcon.jsx";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import { DialogToastContext } from "contexts/DialogToastContext";
import ChartSettingsOverlay from "components/insights/marketplace/charts/ChartSettingsOverlay";
import IconBase from "components/common/icons/IconBase";
import { parseError } from "components/common/helpers/error-helpers";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import AppliedMetricTagBadge from "components/common/badges/tag/metrics/AppliedMetricTagBadge";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import SpyglassIcon from "components/common/icons/general/SpyglassIcon";
import BetaBadge from "components/common/badges/BetaBadge";
import MetricBadgeBase from "../../../badges/metric/MetricBadgeBase";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

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
    launchActionableInsightsFunction,
    isBeta,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [view, setView] = useState("chart");
  const [isMovingKpi, setIsMovingKpi] = useState(false);
  const [helpIsShown, setHelpIsShown] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    setIsMovingKpi(false);
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

  const getActionableInsightOverlayToggle = () => {
    if (launchActionableInsightsFunction != null) {
      return (
        <SpyglassIcon
          onClickFunction={launchActionableInsightsFunction}
          className={"ml-3"}
          tooltipText={"Launch Actionable Insight"}
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
      />,
    );
  };

  // TODO: This is a workaround, but I want to come up with a better solution
  const getSettingsToggle = () => {
    if (showSettingsToggle !== false) {
      return (
        <ToggleSettingsIcon
          className={"ml-3 my-auto"}
          visible={!helpIsShown && dashboardData?.canUpdateDashboardMetric() === true}
          activeTab={view}
          setActiveTab={() => showSettingsPanel()}
        />
      );
    }
  };

  const moveItemUp = async () => {
    const configuration = dashboardData?.getData("configuration");

    if (index === 0) {
      return;
    }

    setIsMovingKpi(true);
    const newIndex = index - 1;
    const currentItem = configuration[index];
    const item = configuration[newIndex];
    configuration[index] = item;
    configuration[newIndex] = currentItem;
    dashboardData.setData("configuration", configuration);
    await dashboardData.saveModel();
    await dashboardData.reloadData();
  };

  const moveItemDown = async () => {
    const configuration = dashboardData?.getData("configuration");
    const count = configuration?.length;

    if (index >= count - 1) {
      return;
    }

    setIsMovingKpi(true);
    const newIndex = index + 1;
    const currentItem = configuration[index];
    const item = configuration[newIndex];
    configuration[index] = item;
    configuration[newIndex] = currentItem;
    dashboardData.setData("configuration", configuration);
    await dashboardData.saveModel();
    await dashboardData.reloadData();
  };


  const getMoveIcons = () => {
    const count = dashboardData?.getData("configuration")?.length;
    return (
      <>
        <OverlayIconBase
          className={"my-auto"}
          icon={faArrowUp}
          visible={dashboardData?.canUpdateDashboardMetric() === true && index > 0}
          onClickFunction={moveItemUp}
          overlayBody={"Move KPI up"}
        />
        <OverlayIconBase
          className={"ml-2 my-auto"}
          icon={faArrowDown}
          visible={dashboardData?.canUpdateDashboardMetric() === true && index < count - 1}
          onClickFunction={moveItemDown}
          overlayBody={"Move KPI down"}
        />
      </>
    );
  };

  const getTitleBar = () => {
    if (isLoading) {
      return (
        <div className={"h-100 d-flex justify-content-between"}>
          <div className={"d-flex"}>
            <BetaBadge
              isBeta={isBeta}
              className={"mr-2 my-auto"}
            />
            <span className={"my-auto"}>
            <IconBase isLoading={true} className={"mr-2"} />
            Loading Chart
          </span>
          </div>
        </div>
      );
    }

    if (isMovingKpi === true) {
      return (
        <div className={"h-100 d-flex justify-content-between"}>
          <div className={"d-flex"}>
            <BetaBadge
              isBeta={isBeta}
              className={"mr-2 my-auto"}
            />
            <span className={"my-auto"}>
            <IconBase isLoading={true} className={"mr-2"} />
            Moving Chart
          </span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={"h-100 d-flex justify-content-between"}>
          <div className={"d-flex"}>
            <BetaBadge
              isBeta={isBeta}
              className={"mr-2 my-auto"}
            />
            <div className={"my-auto"}>
              <IconBase icon={faExclamationCircle} fixedWidth className={"mr-2"} />
              Error Loading Chart!
            </div>
          </div>
          <div className={"d-flex my-auto"}>
            {/*{getMoveIcons()}*/}
            {getHelpToggle()}
            {getSettingsToggle()}
          </div>
        </div>
      );
    }

    return (
      <div className={"h-100 d-flex justify-content-between"}>
        <div className={"d-flex"}>
          <BetaBadge
            isBeta={isBeta}
            className={"mr-2 my-auto"}
          />
          <div className={"my-auto"}>
            {kpiConfiguration?.kpi_name}
          </div>
        </div>
        <div className={"d-flex my-auto"}>
          {/*{getMoveIcons()}*/}
          {getHelpToggle()}
          {getActionableInsightOverlayToggle()}
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
          <div className="max-content-width p-5 mt-5"
               style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
          <div className="max-content-width p-5 mt-5"
               style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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

  const getAllTags = () => {
    const useDashboardTags = kpiConfiguration?.settings?.useDashboardTags !== false;
    const kpiConfigDashboardTags = getMetricFilterValue(dashboardData?.getData("filters"), "tags");
    const useKpiTags = kpiConfiguration?.settings?.useKpiTags !== false;
    const kpiConfigTags = getMetricFilterValue(kpiConfiguration?.filters, "tags");

    return (
      <AppliedMetricTagBadge
        kpiTags={useKpiTags ? kpiConfigTags : null}
        dashboardTags={useDashboardTags ? kpiConfigDashboardTags : null}
      />
    );
  };

  const getDateBadge = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    const isRollingDate = date?.label ? true : false;
    if (isRollingDate) {
      return (
        <MetricBadgeBase
          badgeText={`${date?.label}`}
          icon={faCalendar}
          className={"metric-subheader-text"}
        />
      );
    } else {
      return (
        <MetricDateRangeBadge
          startDate={date?.startDate}
          endDate={date?.endDate}
        />
      );
    }

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
          {getAllTags()}
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
  launchActionableInsightsFunction: PropTypes.func,
  isBeta: PropTypes.bool,
};

export default VanityMetricContainer;
