import React, { useState, useEffect, useRef, useContext } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Model from "core/data_model/model";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faFileCertificate, faHourglass, faSearch } from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import OverallReleaseDurationMetrics from "components/insights/release_360/views/duration/OverallReleaseDurationMetrics";
import OverallReleaseTraceabilityMetrics from "components/insights/release_360/views/traceability/OverallReleaseTraceabilityMetrics";
import OverallReleaseQualityMetrics from "../release_360/views/quality/OverallReleaseQualityMetrics";
import { AuthContext } from "contexts/AuthContext";
import MetricUiSandbox from "components/insights/release_360/views/sandbox/MetricUiSandbox";
import DashboardFiltersInput from "components/insights/dashboards/DashboardFiltersInput";
import DashboardFilterOrganizationInput from "components/insights/dashboards/DashboardFilterOrganizationInput";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import { dashboardFiltersMetadata } from "components/insights/dashboards/dashboard-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import { Button, Popover, Overlay } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import { format, addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";

function Release360() {
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("duration");
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [dashboardFilterTagsModel, setDashboardFilterTagsModel] = useState(
    modelHelpers.getDashboardFilterModel(dashboardData, "tags", dashboardFiltersMetadata)
  );
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [calendar, setCalendar] = useState(false);
  const [target, setTarget] = useState(null);
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [calenderActivation, setCalenderActivation] = useState(false);
  const node = useRef();
  const ref = useRef(null);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    let newDataObject = new Model({ ...dashboardMetadata.newObjectFields }, dashboardMetadata, true);
    newDataObject.setData("filters", []);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(newDataObject, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newDataObject, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      console.log(newDataObject);
      setDashboardData({ ...newDataObject });
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();

    if (isMounted?.current === true) {
      setActiveTab(tabSelection);
    }
  };

  const toggleCalendar = (event) => {
    setCalenderActivation(true);
    setCalendar(!calendar);
    setTarget(event.target);
    if (date[0].startDate && date[0].endDate) {
      let startDate = format(new Date(date[0].startDate), "MM/dd/yyyy");
      if (date[0].endDate === 0) {
        setEDate(startDate);
      } else {
        let endDate = format(new Date(date[0].endDate), "MM/dd/yyyy");
        setEDate(endDate);
      }

      setSDate(startDate);
    }
  };

  const closeCalender = () => {
    setCalendar(false);

    if (date[0].startDate && date[0].endDate) {
      let startDate = format(new Date(date[0].startDate), "MM/dd/yyyy");
      setSDate(startDate);

      if (date[0].endDate === 0) {
        setEDate(startDate);
      } else {
        let endDate = format(new Date(date[0].endDate), "MM/dd/yyyy");
        setEDate(endDate);
      }
    }
  };

  const dateChange = (item) => {
    setDate([item.selection]);

    if (item.selection) {
      let startDate = format(item.selection.startDate, "MM/dd/yyyy");
      setSDate(startDate);

      if (item.selection.endDate === 0) {
        setEDate(startDate);
      } else {
        let endDate = format(item.selection.endDate, "MM/dd/yyyy");
        setEDate(endDate);
        validate(startDate, endDate);
      }
    }
  };

  const validate = (startDate, endDate) => {
    let sDate = startDate ? new Date(startDate).toISOString() : undefined;
    let eDate = endDate ? new Date(endDate).toISOString() : undefined;
    let newDashboardFilterTagsModel = dashboardFilterTagsModel;
    newDashboardFilterTagsModel.setData("date", { startDate: sDate, endDate: eDate, key: "selection" });
    setDashboardFilterTagsModel({ ...newDashboardFilterTagsModel });

    let newDataModel = modelHelpers.setDashboardFilterModelField(dashboardData, "date", {
      startDate: sDate,
      endDate: eDate,
      key: "selection",
    });
    loadData(newDataModel);
  };

  const clearCalendar = () => {
    setDate([
      {
        startDate: undefined,
        endDate: undefined,
        key: "selection",
      },
    ]);
    setSDate(undefined);
    setEDate(undefined);
    validate();
  };

  const getDateRangeButton = () => {
    return (
      <Overlay show={calendar} target={target} placement="bottom" container={ref.current} containerPadding={20}>
        <Popover className="max-content-width">
          <Popover.Title>
            <div style={{ display: "flex" }}>
              <Button
                variant="outline-secondary"
                size="sm"
                type="button"
                style={{ marginRight: "auto" }}
                onClick={clearCalendar}
              >
                Clear
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                type="button"
                style={{ marginLeft: "auto" }}
                onClick={closeCalender}
              >
                X
              </Button>
            </div>
          </Popover.Title>
          <Popover.Content ref={node}>
            <DateRangePicker
              startDatePlaceholder="Start Date"
              endDatePlaceholder="End Date"
              onChange={dateChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={date}
              direction="horizontal"
            />
            {/* <DateRangeInput dataObject={dashboardFilterTagsModel} setDataObject={setDashboardFilterTagsModel} fieldName={"date"} /> */}
          </Popover.Content>
        </Popover>
      </Overlay>
    );
  };

  const getSandbox = () => {
    if (featureFlagHideItemInProd() === false) {
      return (
        <CustomTab
          activeTab={activeTab}
          tabText={"Metric UI Sandbox"}
          icon={faFileCertificate}
          handleTabClick={handleTabClick}
          tabName={"sandbox"}
        />
      );
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={activeTab}
          tabText={"Overall Release Duration"}
          icon={faHourglass}
          handleTabClick={handleTabClick}
          tabName={"duration"}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Overall Release Traceability"}
          icon={faSearch}
          handleTabClick={handleTabClick}
          tabName={"traceability"}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Overall Release Quality"}
          icon={faFileCertificate}
          handleTabClick={handleTabClick}
          tabName={"quality"}
        />
        {/* {getSandbox()} */}
      </CustomTabContainer>
    );
  };

  const getSynopsisActionBar = () => {
    return (
      <div>
        <ActionBarContainer>
          <div className="d-flex">
            <DashboardFiltersInput
              dataObject={dashboardFilterTagsModel}
              setDataObject={setDashboardFilterTagsModel}
              loadData={loadData}
              className={"mx-2"}
              dashboardData={dashboardData}
            />
            <DashboardFilterOrganizationInput
              className={"mx-2"}
              dataObject={dashboardFilterTagsModel}
              setDataObject={setDashboardFilterTagsModel}
              dashboardData={dashboardData}
              fieldName={"organizations"}
              loadData={loadData}
            />
            <Button variant="outline-secondary" type="button" onClick={toggleCalendar}>
              <FontAwesomeIcon icon={faCalendar} className="mr-1 d-none d-lg-inline" fixedWidth />
              {(calendar && sDate) || eDate ? sDate + " - " + eDate : "Date Range"}
            </Button>
            {getDateRangeButton()}
          </div>
        </ActionBarContainer>
      </div>
    );
  };

  // TODO: Make sub components
  const getCurrentView = () => {
    switch (activeTab) {
      case "duration":
        return <OverallReleaseDurationMetrics dashboardData={dashboardData} />;
      case "traceability":
        return <OverallReleaseTraceabilityMetrics dashboardData={dashboardData} />;
      case "quality":
        return <OverallReleaseQualityMetrics dashboardData={dashboardData} />;
      case "sandbox":
        return <MetricUiSandbox />;
      default:
        return null;
    }
  };

  if (featureFlagHideItemInProd()) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"release360"} />}
      breadcrumbDestination={"release360"}
      pageDescription={
        "Release 360 provides a 360 degree view of data, starting from planning to release, capturing all metrics in the intermediate stages as well. Different views are split based on category, duration and functionality"
      }
    >
      {getSynopsisActionBar()}
      <div className={"px-3"}>
        <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
      </div>
    </ScreenContainer>
  );
}

export default Release360;
