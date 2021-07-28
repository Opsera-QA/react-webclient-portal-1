import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import {useHistory} from "react-router-dom";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import PipelineDetails from "components/insights/summary/pipeline_details/PipelineDetails";
import DashboardFiltersInput from "components/insights/dashboards/DashboardFiltersInput";
import DashboardFilterOrganizationInput from "components/insights/dashboards/DashboardFilterOrganizationInput";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import {faAnalytics, faChartNetwork, faChartArea, faRadar} from "@fortawesome/pro-light-svg-icons";  
import DateRangeInput from "components/common/inputs/date/DateRangeInput";
import { Button, Popover, Overlay } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import { format, addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";

function InsightsSummary() {
  const {getUserRecord, setAccessRoles} = useContext(AuthContext);
  const history = useHistory();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("synopsis");
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [dashboardFilterTagsModel, setDashboardFilterTagsModel] = useState(modelHelpers.getDashboardFilterModel(dashboardData, "tags", dashboardFiltersMetadata));
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
    let newDataObject = new Model({...dashboardMetadata.newObjectFields}, dashboardMetadata, true);
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
      await getRoles(cancelSource);
      setDashboardData({...newDataObject});
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

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
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
        validate(startDate,endDate);
      }
    }
  };

  const validate = (startDate,endDate)=>{
      let sDate = startDate ? new Date(startDate).toISOString() : undefined;
      let eDate = endDate ? new Date(endDate).toISOString() : undefined;
      let newDashboardFilterTagsModel = dashboardFilterTagsModel;
      newDashboardFilterTagsModel.setData( "date" , { startDate: sDate , endDate: eDate, key: "selection" } );
      setDashboardFilterTagsModel({...newDashboardFilterTagsModel});
  
      let newDataModel = modelHelpers.setDashboardFilterModelField(dashboardData, "date", { startDate: sDate , endDate: eDate, key: "selection" });
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
      <Overlay
        show={calendar}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
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

  const getInsightsSummaryView = () => {
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
          {/* <p>this is a test</p> */}
          <Button variant="outline-secondary" type="button" onClick={toggleCalendar}>
            <FontAwesomeIcon icon={faCalendar} className="mr-1 d-none d-lg-inline" fixedWidth />
            {(calendar && sDate) || eDate ? sDate + " - " + eDate : "Date Range"}
          </Button>
          {getDateRangeButton()}
          {/* <DateRangeInput dataObject={dashboardFilterTagsModel} setDataObject={setDashboardFilterTagsModel} fieldName={"date"} />  */}
        </div>
        </ActionBarContainer>
        <PipelineDetails dashboardData={dashboardData} setDashboardData={setDashboardData}/>
        </div>
      );
  };

  const handleNavTabClick = (tabSelection) => async e => {
    e.preventDefault();

    if (tabSelection === "analytics") {
      history.push(`/insights/analytics`);
      return;
    }

    if (tabSelection === "marketplace") {
      history.push(`/insights/marketplace`);
      return;
    }

    if (tabSelection === "dashboards") {
      history.push(`/insights`);
      return;
    }

    if (tabSelection === "synopsis") {
      history.push(`/insights/synopsis`);
      return;
    }

    setActiveTab(tabSelection);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faChartNetwork} tabName={"dashboards"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Dashboards"} />
        <NavigationTab icon={faChartArea} tabName={"marketplace"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Marketplace"} />
        <NavigationTab icon={faAnalytics} tabName={"analytics"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Analytics"} />
        <NavigationTab icon={faRadar} tabName={"synopsis"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Synopsis"} />
      </NavigationTabContainer>
    ); 
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Insights"/>);
  }

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      pageDescription={`
        Opsera provides users with access to a vast repository of logging and analytics. Access all available
        logging, reports and configurations around the Opsera Analytics Platform or search your currently
        configured logs repositories below.
      `}
      breadcrumbDestination={"insightsSummary"}
    >
      {getInsightsSummaryView()}
    </ScreenContainer>
  );

}


export default InsightsSummary;