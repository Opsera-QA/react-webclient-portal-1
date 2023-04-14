import React, {useState, useEffect} from "react";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import SalesforceLookUpHelpDocumentation
  from "../../common/help/documentation/insights/SalesforceLookUpHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import {insightsLookupActions} from "components/insights/lookup/insightsLookup.actions";
import LookupResults from "components/insights/lookup/LookupResults";
import {formatDate} from "components/common/helpers/date/date.helpers";
import LookupFilterModel from "./lookup.filter.model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import SalesforceLookupFilters from "components/insights/lookup/SalesforceLookupFilters";
import {subDays} from "date-fns";

function Lookup() {
  const [isLoading, setIsLoading] = useState(false);
  const [salesforceComponentNames, setSalesforceComponentNames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedComponentName, setSelectedComponentName] = useState(
    salesforceComponentNames?.[0],
  );
  const {isMounted, cancelTokenSource, toastContext, getAccessToken} =
    useComponentStateReference();

  const [filterModel, setFilterModel] = useState(undefined);

  useEffect(() => {
    const newFilterModel = new LookupFilterModel();
    newFilterModel.setData("startDate", subDays(new Date(), 30));
    newFilterModel.setData("endDate", new Date());
    setFilterModel({...newFilterModel});
  }, []);

  useEffect(() => {
    loadComponentNames();
  }, [filterModel]);

  const loadComponentNames = async (newFilterModel = filterModel) => {
    try {
      const startDate = newFilterModel?.getData("startDate");
      const endDate = newFilterModel?.getData("endDate");

      if (!startDate || !endDate) {
        toastContext.showInlineErrorMessage("Please select start and end dates.");
        return;
      }

      const search = newFilterModel.getData("search");

      // TODO: This should just use the dates from the input and Node should do any processing on the date if necessary
      const DATE_STRING_FORMAT = "MM/dd/yyyy";
      const formattedStartDate = formatDate(startDate, DATE_STRING_FORMAT);
      const formattedEndDate = formatDate(endDate, DATE_STRING_FORMAT);
      const response = await insightsLookupActions.getComponentNames(
        getAccessToken,
        cancelTokenSource,
        formattedStartDate,
        formattedEndDate,
        newFilterModel.getData("selectedComponentNames"),
        newFilterModel.getData("selectedComponentFilterData"),
        newFilterModel.getData("pipelineComponentFilterData"),
        newFilterModel.getData("orgsComponentFilterData"),
        newFilterModel
        // newFilterModel.getData("tasksComponentFilterData"),
      );
      const names = response?.data?.data?.componentNames;

      if (isMounted?.current === true && Array.isArray(names)) {
        setSalesforceComponentNames(names);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    }
  };

  const loadData = async (newFilterModel = filterModel, componentName) => {
    try {
      setIsLoading(true);
      setSearchResults([]);
      toastContext.removeInlineMessage();
      const startDate = newFilterModel?.getData("startDate");
      const endDate = newFilterModel?.getData("endDate");

      if (!startDate || !endDate) {
        toastContext.showInlineErrorMessage(
          "Please select start and end dates.",
        );
        return;
      }

      if(!componentName){
        componentName = salesforceComponentNames?.[0];
      }

      // TODO: This should just use the dates from the input and Node should do any processing on the date if necessary
      const DATE_STRING_FORMAT = "MM/dd/yyyy";
      const formattedStartDate = formatDate(startDate, DATE_STRING_FORMAT);
      const formattedEndDate = formatDate(endDate, DATE_STRING_FORMAT);
      const response = await insightsLookupActions.searchComponents(
        getAccessToken,
        cancelTokenSource,
        formattedStartDate,
        formattedEndDate,
        [componentName],
        newFilterModel.getData("selectedComponentFilterData"),
       //newFilterModel.getData("tasksComponentFilterData"),
      );

      const searchResults = insightsLookupActions.generateTransformedResults(
        response?.data?.data?.data,
      );

      if (isMounted?.current === true && Array.isArray(searchResults)) {
        setSearchResults(searchResults);
        newFilterModel.setData("activeFilters", filterModel.getActiveFilters());
        setFilterModel({...newFilterModel});
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getNoDataMessage = () => {
    const startDate = filterModel?.getData("startDate");
    const endDate = filterModel?.getData("endDate");
    // const componentNames = filterModel?.getArrayData("selectedComponentNames");

    if (!startDate || !endDate) {
      return "Please select start and end dates.";
    }
    else{
      return "Please select start and end dates.";
    }

    // if (componentNames.length === 0) {
    //   return "Please select at least one Salesforce component.";
    // }
  };

  const getBody = () => {
    return (
      <>
        <LookupResults
          isLoading={isLoading}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
          searchResults={searchResults}
          salesforceComponentNames={salesforceComponentNames}
          selectedComponentName={selectedComponentName}
          setSelectedComponentName={setSelectedComponentName}
          noDataMessage={getNoDataMessage()}
        />
      </>
    );
  };

  if (filterModel == null) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={
        <InsightsSubNavigationBar currentTab={"lookup"}/>
      }
      breadcrumbDestination={"lookup"}
      helpComponent={<SalesforceLookUpHelpDocumentation/>}
      filterModel={filterModel}
      loadDataFunction={loadData}
      filterOverlay={
        <SalesforceLookupFilters
          salesforceLookupFilterModel={filterModel}
          loadDataFunction={loadData}
          salesforceComponentNames={salesforceComponentNames}
        />
      }
    >
      {getBody()}
    </ScreenContainer>
  );
}

export default Lookup;
