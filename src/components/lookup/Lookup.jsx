import React, {useEffect, useState, useContext, useRef, useReducer} from "react";
import {DateRangePicker} from "react-date-range";
import {addDays, format} from "date-fns";
import {Button, Popover, Overlay, Container, Row, Col, Alert, ListGroup} from "react-bootstrap";
import {faCalendar} from "@fortawesome/pro-light-svg-icons";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata";
import Multiselect from "react-widgets/Multiselect";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import axios from 'axios';

import './lookup.css';
import {ApiService} from "api/apiService";
import {NODE_ANALYTICS_API_SERVER_URL} from "config";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import FilterContainer from "components/common/table/FilterContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import modelHelpers from "components/common/model/modelHelpers";
import ScreenContainer from 'components/common/panels/general/ScreenContainer';
import IconBase from 'components/common/icons/IconBase';
import LookupHelp from './LookupHelp';
import LookupTableTotals from "./LookupTableTotals";
import LookupTablePipelines from "./LookupTablePipelines";
import LoadingDialog from "components/common/status_notifications/loading";

const cleanUrlPath = ({url}) => {
	let returnUrl = url;
  if (url.slice(-1) !== '/') {
    returnUrl += '/';
  }
  return returnUrl;
};
//.env params were different when going to server, trailing slash
const ANALYTICS_API = cleanUrlPath({url: NODE_ANALYTICS_API_SERVER_URL});

const ENDPOINTS = {
  componentNames: 'analytics/sfdc/v1/component/names',
  componentSearch: 'analytics/sfdc/v1/component'
};

const Lookup = () => {

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  
  const [componentList, setComponentList] = useState([]);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { modal: false }
  );
  const [searchResults, setSearchResults] = useState([]);
  const [activeTables, setActiveTables] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const {getUserRecord, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloading, setIsPreloading] = useState(true);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [calendar, setCalendar] = useState(false);
  const [target, setTarget] = useState(null);
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [dashboardData, setDashboardData] = useState(undefined);
  const [dashboardFilterTagsModel, setDashboardFilterTagsModel] = useState(modelHelpers.getDashboardFilterModel(dashboardData, "tags", dashboardFiltersMetadata));
  const node = useRef();
  const ref = useRef(null);
  const isMounted = useRef(false);
  const toastContext = useContext(DialogToastContext);

  const Auth = useContext(AuthContext);
  const { getAccessToken } = Auth;

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(async() => {
    // load in component names for search dropdown
    const accessToken = await getAccessToken();
    new ApiService(
      ANALYTICS_API + ENDPOINTS.componentNames,
      null,
      accessToken)
      .get()
      .then(response => {
        const {componentNames} = response.data.data;
        setComponentList(componentNames);
        setIsPreloading(false);
      })
      .catch((e) => {
        showErrorAlert(e.message);
      });
  }, []);

  useEffect(() => {
    const componentName = Object.keys(searchResults)[0];
    if (componentName) {
      updateTables({
        searchResults
      });
    }
  }, [searchResults]);

  const updateTables = ({
    searchResults
  }) => {
    
    let tableUpdates = [];
    const componentNames = Object.keys(searchResults);

    for (let i = 0, l = componentNames.length; i < l; i++) {
      const componentName = componentNames[i];
      const componentData = searchResults[componentName];

      const pipelineNames = Object.keys(componentData.pipelineData);
      const totals = [{
        deploy_count: componentData.totalTimesComponentDeployed,
        validations_passed: componentData.totalValidationsPassed,
        validations_failed: componentData.totalValidationsFailed,
        unit_tests_passed: componentData.totalUnitTestsPassed,
        unit_tests_failed: componentData.totalUnitTestsFailed,
        pipelines: pipelineNames.length
      }];

      const pipelines = [];
      for (let j = 0, k = pipelineNames.length; j < k; j++) {
        const pipelineName = pipelineNames[j];
        const pipeline = componentData.pipelineData[pipelineName];
        pipelines.push({
          pipeline: pipelineName,
          deploy_count: pipeline.totalTimesComponentDeployed,
          validations_passed: pipeline.totalValidationsPassed,
          validations_failed: pipeline.totalValidationsFailed,
          unit_tests_passed: pipeline.totalUnitTestsPassed,
          unit_tests_failed: pipeline.totalUnitTestsFailed,
          last_deploy: pipeline.customerName
        });
      }

      tableUpdates.push({
        componentName,
        totals,
        pipelines
      });
    }

    setActiveTables(tableUpdates);
  };

  const onSearch = async() => {

    if (!sDate || !eDate) {
      return showErrorAlert('Please select start and end dates.');
    }

    if (searchArr.length < 1) {
      return showErrorAlert('Please enter search criteria.');
    }

    setIsLoading(true);
    const accessToken = await getAccessToken();
    const data = {
      startDate: sDate,
      endDate: eDate,
      fullNameArr: searchArr
    };
    
    new ApiService(
      ANALYTICS_API + ENDPOINTS.componentSearch,
      data,
      accessToken
    )
    .get()
    .then(res => {
      
      const cleanedResults = {};
      const searchRes = res.data.data.data;
      const pipelineNames = Object.keys(searchRes);
      for (let i = 0, l = pipelineNames.length; i < l; i++){ 
        const pipelineName = pipelineNames[i];
        if (pipelineName !== 'dateRanges') {
          const pipelineData = searchRes[pipelineName].currentResults;
          cleanedResults[pipelineName] = {
            totalTimesComponentDeployed: pipelineData.totalTimesComponentDeployed,
            totalUnitTestsFailed: pipelineData.totalUnitTestsFailed,
            totalUnitTestsPassed: pipelineData.totalUnitTestsPassed,
            totalValidationsFailed: pipelineData.totalValidationsFailed,
            totalValidationsPassed: pipelineData.totalValidationsPassed,
            pipelineData: pipelineData.pipelineData
          };
        }
      }

      setSearchResults(cleanedResults);
      setIsLoading(false);
    })
    .catch(e => {
      showErrorAlert(e.message);
    });
    
  };

  const showErrorAlert = (message) => {
    setState({
      modal: true,
      type: "danger",
      title: "Error!",
      message: message
    });
  };

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
    if (item.selection) {
      setDate([item.selection]);
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

  const screenReady = !isLoading && !isPreloading;

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"lookup"} />}
      isLoading={!screenReady}
      breadcrumbDestination={"lookup"}
      helpComponent={<LookupHelp />}
      pageDescription={`
          Opsera provides users with access to several data points regarding components and their respective pipelines. The search input will provide you with any component(s) previously deployed. Access core data points on your component(s) below.
      `}
    >
      <Container>
        <Row>
          <Col>
            {state.modal &&
              <Alert className="mt-3" variant={state.type} onClose={() => setState({ modal: false, type: "", title: "", message: "" })} dismissible>
                {state.title} {state.message}
              </Alert>
            }
          </Col>
        </Row>
        <Row>
          <Col>
            {getConnectedAssetsActionBar()}
          </Col>
          <Col xs={6}>
            <Multiselect
              className="select-component"
              data={componentList}
              value={searchArr}
              onChange={value => setSearchArr(value)}
            />
          </Col>
          <Col xs={2}>
            <Button
              variant="primary"
              className="btn-search"
              disabled={false}
              onClick={() => onSearch()}
            >
              Search
          </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="table-results">
            
            {isLoading && <LoadingDialog size={"sm"} message={"Loading Customer Onboard Editor"} />}

            {activeTables.map(tableData => {

              const {
                totals,
                pipelines,
                componentName
              } = tableData;

              return (
                <>
                  <FilterContainer
                    className="mt-2"
                    showBorder={false}
                    body={<LookupTableTotals data={totals} />}
                    titleIcon={faBug}
                    title={`${componentName}: Totals`}
                  />
                  <FilterContainer
                    className="mt-2"
                    showBorder={false}
                    body={<LookupTablePipelines data={pipelines} />}
                    titleIcon={faBug}
                    title={`${componentName}: Pipelines`}
                  />
                </>
              );
            })}
          </Col>
        </Row>
      </Container>
    </ScreenContainer>
  );
};

export default Lookup;
