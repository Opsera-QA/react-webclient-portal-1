import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import GitCustodianDetails from "./GitCustodianDetails";
import GitCustodianTableMetaData from "./table/gitCustodianTableMetaData";
import { format } from "date-fns";
import modelHelpers from "../../common/model/modelHelpers";
import {Button, Overlay, Popover} from "react-bootstrap";
import {DateRangePicker} from "react-date-range";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import IconBase from "../../common/icons/IconBase";
import DataBlockBoxContainer from "../../common/metrics/data_blocks/DataBlockBoxContainer";
import InlineGitCustodianAuthorsSelectInput
  from "../../common/filters/insights/gitCustodian/authors/InlineGitCustodianAuthorsSelectInput";
import InlineGitCustodianServiceSelectInput
  from "../../common/filters/insights/gitCustodian/gitService/InlineGitCustodianServiceSelectInput";
import InlineGitCustodianRepositoriesSelectInput
  from "../../common/filters/insights/gitCustodian/repositories/InlineGitCustodianRepositoriesSelectInput";
import InlineGitCustodianStatusSelectInput
  from "../../common/filters/insights/gitCustodian/status/InlineGitCustodianStatusSelectInput";
import chartsActions from "../charts/charts-actions";
import FilterButtons from "../../common/filters/buttons/FilterButtons";
import { addDays } from "date-fns";

function GitCustodian() {
  const {getUserRecord, setAccessRoles} = useContext(AuthContext);
  const { getAccessToken } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [gitCustodianData, setGitCustodianData] = useState(undefined);
  const [gitCustodianFilterModel, setGitCustodianFilterModel] = useState(new Model({...GitCustodianTableMetaData.newObjectFields}, GitCustodianTableMetaData, false));
  const [date, setDate] = useState([
    {
      startDate: new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)),
      endDate: new Date(new Date().setHours(0, 0, 0, 0)),
      key: "selection",
    },
  ]);
  const [calendar, setCalendar] = useState(false);
  const [target, setTarget] = useState(null);
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [calenderActivation, setCalenderActivation] = useState(false);
  const [authorsFilterData, setAuthorsFilterData] = useState([]);
  const [servicesFilterData, setServicesFilterData] = useState([]);
  const [repositoriesFilterData, setRepositoriesFilterData] = useState([]);
  const [statusFilterData, setStatusFilterData] = useState([]);
  const node = useRef();
  const ref = useRef(null);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    let newDataObject = new Model({...GitCustodianTableMetaData.newObjectFields}, GitCustodianTableMetaData, true);
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

  const loadData = async (newDataObject = gitCustodianFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
      await getFilters(cancelSource);
      let newFilterDto = newDataObject;
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      newFilterDto.setData("totalCount", newFilterDto.getData('totalCount'));
      let pageSize = newFilterDto.getData("pageSize");
      newFilterDto.setData("pageSize", pageSize);
      let sortOption = newFilterDto.getData("sortOption");
      newFilterDto.setData("sortOption", sortOption);
      setGitCustodianData(newDataObject);
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

  const restructureFilterData = (filterData, filterType) => {
    if( filterData.length > 0 ) {
      filterData.forEach(data => {
        data.text = data[filterType];
        data.value = data[filterType];
      });
      return filterData;
    }
    return [];
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getFilters = async (cancelSource) => {
    const filterResponse = await chartsActions.getGitCustodianFilters(
      getAccessToken,
      cancelSource
    );
    const filterResponseData = filterResponse?.data?.data?.data?.[0];
    if(isMounted.current === true &&  filterResponseData) {
      const authorsData = restructureFilterData(
        filterResponseData?.authors ? filterResponseData?.authors : [],
        'author');
      const repositoriesData = restructureFilterData(
        filterResponseData?.repositories ? filterResponseData?.repositories : [],
        'repository');
      const statusData = restructureFilterData(
        filterResponseData?.status ? filterResponseData?.status : [],
        'status');
      const serviceData = restructureFilterData(
        filterResponseData?.service ? filterResponseData?.service : [],
        'service');
      setAuthorsFilterData(authorsData);
      setRepositoriesFilterData(repositoriesData);
      setStatusFilterData(statusData);
      setServicesFilterData(serviceData);
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

  const getFilterButtons = () => {
    return (
      <div className={'d-xl-none'}>
        <FilterButtons
          isLoading={isLoading}
          loadData={loadData}
          dropdownFilters={getDropdownFilters()}
          filterDto={gitCustodianFilterModel}
          filterBtnClassName={'btn-success'}
          includeButtonText={true}
          filterDropdownTitle={'Filter Report'}
        />
      </div>
    );
  };

  const getDropdownFilters = () => {
    return (
      <>
        <InlineGitCustodianAuthorsSelectInput
          filterModel={gitCustodianFilterModel}
          options={authorsFilterData}
          setFilterModel={setGitCustodianFilterModel}
          loadData={loadData}
          className={"mb-2"}
          inline={false}
        />
        <InlineGitCustodianServiceSelectInput
          filterModel={gitCustodianFilterModel}
          options={servicesFilterData}
          setFilterModel={setGitCustodianFilterModel}
          loadData={loadData}
          className={"mb-2"}
          inline={false}
        />
        <InlineGitCustodianRepositoriesSelectInput
          filterModel={gitCustodianFilterModel}
          options={repositoriesFilterData}
          setFilterModel={setGitCustodianFilterModel}
          loadData={loadData}
          className={"mb-2"}
          inline={false}
        />
        <InlineGitCustodianStatusSelectInput
          filterModel={gitCustodianFilterModel}
          setFilterModel={setGitCustodianFilterModel}
          options={statusFilterData}
          loadData={loadData}
          className={"mb-2"}
          inline={false}
        />
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      <div className="d-none d-xl-flex">
        <InlineGitCustodianAuthorsSelectInput
          filterModel={gitCustodianFilterModel}
          options={authorsFilterData}
          setFilterModel={setGitCustodianFilterModel}
          loadData={loadData}
          className={"mx-2"}
        />
        <InlineGitCustodianServiceSelectInput
          filterModel={gitCustodianFilterModel}
          options={servicesFilterData}
          setFilterModel={setGitCustodianFilterModel}
          loadData={loadData}
          className={"mx-2"}
        />
        <InlineGitCustodianRepositoriesSelectInput
          filterModel={gitCustodianFilterModel}
          options={repositoriesFilterData}
          setFilterModel={setGitCustodianFilterModel}
          loadData={loadData}
          className={"mx-2"}
        />
        <InlineGitCustodianStatusSelectInput
          filterModel={gitCustodianFilterModel}
          setFilterModel={setGitCustodianFilterModel}
          options={statusFilterData}
          loadData={loadData}
          className={"mx-2"}
        />
      </div>
    );
  };

  const validate = (startDate,endDate)=>{
    let sDate = startDate ? new Date(startDate).toISOString() : undefined;
    let eDate = endDate ? new Date(endDate).toISOString() : undefined;
    let newDashboardFilterTagsModel = gitCustodianFilterModel;
    newDashboardFilterTagsModel.setData( "date" , { startDate: sDate , endDate: eDate, key: "selection" } );
    setGitCustodianFilterModel({...newDashboardFilterTagsModel});

    let newDataModel = modelHelpers.setDashboardFilterModelField(gitCustodianFilterModel, "date", { startDate: sDate , endDate: eDate, key: "selection" });
    loadData(newDataModel);
  };

  const clearCalendar = () => {
    setDate([
      {
        startDate: new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)),
        endDate: new Date(new Date().setHours(0, 0, 0, 0)),
        key: "selection",
      },
    ]);
    setSDate(undefined);
    setEDate(undefined);
    validate(new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)), new Date(new Date().setHours(0, 0, 0, 0)));
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
              retainEndDateOnFirstSelection={true}
              months={1}
              ranges={date}
              direction="horizontal"
            />
          </Popover.Content>
        </Popover>
      </Overlay>
    );
  };

  const getGitCustodianActionBar = () => {
    return (
      <DataBlockBoxContainer showBorder={true} className={'p-2'}>
        <div className="d-flex px-2 py-2">
          {getInlineFilters()}
          {getFilterButtons()}
          <div className="d-flex mx-2">
            <Button variant="outline-secondary" type="button" onClick={toggleCalendar} className={'btn-sm'}>
              <IconBase icon={faCalendar} className={"mr-1 d-none d-lg-inline"} />
              {(calendar && sDate) || eDate ? sDate + " - " + eDate : "Date Range"}
            </Button>
            {getDateRangeButton()}
          </div>
        </div>
      </DataBlockBoxContainer>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Git Custodian"/>);
  }


  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"gitCustodian"}/>}
      pageDescription={'Custodian for repositories. This Dashboard provides visibility to exposed secrets, tokens, passwords, key files, and sensitive data.'}
      breadcrumbDestination={"insightsGitCustodian"}
    >
      {getGitCustodianActionBar()}
      {isLoading ? <LoadingDialog size="sm" message="Loading Git Custodian Report"/> :
        <GitCustodianDetails
          gitCustodianData={gitCustodianData}
          gitCustodianFilterModel={gitCustodianFilterModel}
          setGitCustodianFilterModel={setGitCustodianFilterModel}
        />
      }
    </ScreenContainer>
  );

}


export default GitCustodian;