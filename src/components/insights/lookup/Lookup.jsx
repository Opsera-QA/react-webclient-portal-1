import React, {useEffect, useState, useContext, useRef} from "react";
import {DateRangePicker} from "react-date-range";
import {format, subDays} from "date-fns";
import {Button, Popover, Overlay, Container, Row, Col, Alert} from "react-bootstrap";
import {faCalendar} from "@fortawesome/pro-light-svg-icons";
import Multiselect from "react-widgets/Multiselect";
import axios from 'axios';

import './lookup.css';
import {ApiService} from "api/apiService";
import {NODE_ANALYTICS_API_SERVER_URL} from "config";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import componentFilterMetadata from "./componentFitlerMetadata";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import ScreenContainer from 'components/common/panels/general/ScreenContainer';
import IconBase from 'components/common/icons/IconBase';
import SalesforceLookUpHelpDocumentation from '../../common/help/documentation/insights/SalesforceLookUpHelpDocumentation';
import FilterContainer from "components/common/table/FilterContainer";
import LookupResults from "./LookupResults";

const DATE_STRING_FORMAT = "MM/dd/yyyy";

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
  const [errorMessage, setErrorMessage] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState(new Date());
  
  const [componentList, setComponentList] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchArr, setSearchArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloading, setIsPreloading] = useState(true);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [target, setTarget] = useState(null);
  const [filterDto, setFilterDto] = useState(new Model({}, componentFilterMetadata, true));
  const node = useRef();
  const ref = useRef(null);
  const isMounted = useRef(false);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData().catch((error) => {
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
        setErrorMessage(e.message);
      });
  }, []);

  const onSearch = async () => {
    if (!startDate || !endDate) {
      return setErrorMessage('Please select start and end dates.');
    }

    if (searchArr.length < 1) {
      return setErrorMessage('Please enter search criteria.');
    }

    setIsLoading(true);

    try {
      const accessToken = await getAccessToken();

      const apiService = new ApiService(
        ANALYTICS_API + ENDPOINTS.componentSearch,
        {
          startDate: format(startDate, DATE_STRING_FORMAT),
          endDate: format(endDate, DATE_STRING_FORMAT),
          fullNameArr: searchArr
        },
        accessToken
      );

      const response = await apiService.get();
      
      setSearchResults(response.data.data.data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrorAlert = () => {
    setErrorMessage(null);
  };

  const loadData = async () => {
    console.log('loadData');
    try {
      setIsLoading(true);
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

  const toggleCalendar = (event) => {
    setShowCalendar(!showCalendar);
    setTarget(event.target);
  };

  const closeCalender = () => {
    setShowCalendar(false);
  };

  const clearCalendar = () => {
    filterDto.setData("startDate", format(subDays(new Date(), 7)));
    filterDto.setData("endDate", format(new Date()));
    filterDto.setData("activeFilters", filterDto.getActiveFilters());
  };

  const onDateChange = ({ selection: { startDate, endDate } }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onFilter = (newFilterDto) => {
    clearErrorAlert();
    setShowCalendar(false);

    newFilterDto.setData("startDate", format(startDate, DATE_STRING_FORMAT));
    newFilterDto.setData("endDate", format(endDate, DATE_STRING_FORMAT));
    newFilterDto.setData("activeFilters", filterDto.getActiveFilters());
    setFilterDto(newFilterDto);

    onSearch();
  };

  const datePickerButtonText = startDate && endDate ? `${format(startDate, DATE_STRING_FORMAT)} - ${format(endDate, DATE_STRING_FORMAT)}` : "Date Range";

  const dateRange = [
    {
      startDate,
      endDate,
      key: "selection"
    }
  ];

  const getDropdownFilters = () => (
    <Row>
      <Col>
        <Button variant="outline-secondary" type="button" onClick={toggleCalendar}>
          <IconBase icon={faCalendar} className={"mr-1 d-none d-lg-inline"} />
          {datePickerButtonText}
        </Button>
        <Overlay
          show={showCalendar}
          target={target}
          placement="left"
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
                onChange={onDateChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={dateRange}
                direction="horizontal"
              />
            </Popover.Content>
          </Popover>
        </Overlay>
      </Col>
      <Col>
        <Multiselect
          className="select-component"
          data={componentList}
          value={searchArr}
          onChange={value => setSearchArr(value)}
        />
      </Col>
    </Row>
  );

  const screenReady = !isLoading && !isPreloading;

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"lookup"} />}
      isLoading={!screenReady}
      breadcrumbDestination={"lookup"}
      helpComponent={<SalesforceLookUpHelpDocumentation />}
      pageDescription={`
      Currently applicable only for Salesforce Pipelines. This Component based search provides details on when selected components have been deployed along with pipeline details. Also provides summary on validations and unit tests.
      `}
    >
      <Container fluid>
        <Row>
          <Col>
            {errorMessage &&
              <Alert className="mt-3" variant="danger" onClose={clearErrorAlert} dismissible>
                {errorMessage}
              </Alert>
            }
          </Col>
        </Row>
        <FilterContainer
          title="Salesforce Lookup"
          isLoading={isLoading}
          filterDto={filterDto}
          loadData={onFilter}
          dropdownFilters={getDropdownFilters()}
          body={<LookupResults isLoading={isLoading} searchResults={searchResults} />}
          hideFiltersOnTrigger={false}
        />
      </Container>
    </ScreenContainer>
  );
};

export default Lookup;
