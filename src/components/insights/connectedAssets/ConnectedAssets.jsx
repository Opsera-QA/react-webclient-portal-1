import React, {useEffect, useState, useRef} from "react";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ConnectedAssetsDetails from "./ConnectedAssetsDetails";
import modelHelpers from "components/common/model/modelHelpers";
import { Button, Popover, Overlay } from "react-bootstrap";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import {format, addDays} from "date-fns";
import { DateRangePicker } from "react-date-range";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import IconBase from "components/common/icons/IconBase";
import connectedAssetsMetadata from "./connectedAssets-metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";

function ConnectedAssets() {
  const [dashboardData, setDashboardData] = useState(undefined);
  const [dashboardFilterTagsModel, setDashboardFilterTagsModel] = useState(new Model({ ...connectedAssetsMetadata.newObjectFields }, connectedAssetsMetadata, false));
  const [date, setDate] = useState([
    {
      startDate: new Date(addDays(new Date(), -90)),
      endDate: new Date(),
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
  const { isMounted, isSiteAdministrator } = useComponentStateReference();

  useEffect(() => {
    const newModel = new Model({...connectedAssetsMetadata.newObjectFields}, connectedAssetsMetadata, true);
    newModel.setData("filters", []);
    setDashboardData({...newModel});
  }, []);

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
        validate(item.selection.startDate,item.selection.endDate);
      }
    }
  };

  const validate = (startDate,endDate)=>{
    let newDashboardFilterTagsModel = dashboardFilterTagsModel;
    newDashboardFilterTagsModel.setData( "date" , { startDate: startDate , endDate: endDate, key: "selection" } );
    setDashboardFilterTagsModel({...newDashboardFilterTagsModel});
    let newDataModel = modelHelpers.setDashboardFilterModelField(dashboardFilterTagsModel, "date", { startDate: startDate , endDate: endDate, key: "selection" });
    setDashboardData({...newDataModel});
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
              minDate={new Date(addDays(new Date(), -7300).setHours(0, 0, 0, 0))}
              maxDate={new Date}
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

  const getConnectedAssetsActionBar = () => {
    return (
      <div>
        <ActionBarContainer>
          <div className="d-flex">
            <Button variant="outline-secondary" type="button" onClick={toggleCalendar}>
              <IconBase icon={faCalendar} className={"mr-1 d-none d-lg-inline"} />
              {(calendar && sDate) || eDate ? sDate + " - " + eDate : "Date Range"}
            </Button>
            {getDateRangeButton()}
          </div>
        </ActionBarContainer>
      </div>
    );
  };

  if (isSiteAdministrator !== true) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={<InsightsSubNavigationBar currentTab={"connectedAssets"}/>}
      />
    );
  }

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"connectedAssets"}/>}
      pageDescription={`An 'Admin Only' page that provides categorized number of assets that are connected and associated to Opsera through different sources.`}
      breadcrumbDestination={"insightsConnectedAssets"}
    >
      {getConnectedAssetsActionBar()}
      <ConnectedAssetsDetails dashboardData={dashboardData} setDashboardData={setDashboardData}/>
    </ScreenContainer>
  );

}


export default ConnectedAssets;