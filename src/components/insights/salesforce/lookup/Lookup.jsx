import React, {useState, useEffect} from "react";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import SalesforceLookUpHelpDocumentation
  from "../../../common/help/documentation/insights/SalesforceLookUpHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import {insightsLookupActions} from "components/insights/salesforce/lookup/insightsLookup.actions";
import LookupResults from "components/insights/salesforce/lookup/LookupResults";
import {formatDate} from "components/common/helpers/date/date.helpers";
import LookupFilterModel from "./lookup.filter.model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import SalesforceLookupFilters from "components/insights/salesforce/lookup/SalesforceLookupFilters";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";

function Lookup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSalesforceComponentNames, setIsLoadingSalesforceComponentNames] = useState(false);
  const [salesforceComponentNames, setSalesforceComponentNames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedComponentName, setSelectedComponentName] = useState("");
  const {isMounted, cancelTokenSource, toastContext, getAccessToken} =
      useComponentStateReference();
  const [filterModel, setFilterModel] = useState(new LookupFilterModel());

  useEffect(() => {
    loadComponentNames().catch(() => {});
  }, []);

  const loadComponentNames = async (newFilterModel = filterModel, componentName = selectedComponentName) => {
    try {
      setIsLoadingSalesforceComponentNames(true);
      const startDate = newFilterModel?.getData("startDate");
      const endDate = newFilterModel?.getData("endDate");

      if (!startDate || !endDate) {
        toastContext.showInlineErrorMessage("Please select start and end dates.");
        return;
      }

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
      const names = DataParsingHelper.parseArray(response?.data?.data?.componentNames, []);

      if (isMounted?.current === true && Array.isArray(names)) {
        setSalesforceComponentNames([...names]);
        newFilterModel.setData("activeFilters", filterModel.getActiveFilters());
        setFilterModel({...newFilterModel});

        if (names.length === 0) {
          setSelectedComponentName("");
        } else if (names.length > 0) {
          let newComponentName = componentName;

          if (names.includes(selectedComponentName) !== true || hasStringValue(selectedComponentName) !== true) {
            newComponentName = names[0];
          }

          await loadData(newFilterModel, newComponentName);
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoadingSalesforceComponentNames(false);
      }
    }
  };

  const loadData = async (newFilterModel = filterModel, componentName = selectedComponentName) => {
    try {
      setIsLoading(true);
      setSelectedComponentName(componentName);
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
          newFilterModel.getData("pipelineComponentFilterData"),
          newFilterModel.getData("orgsComponentFilterData"),
      );

      const searchResults = insightsLookupActions.generateTransformedResults(
          response?.data?.data?.data,
      );
      const parsedSearchResults = DataParsingHelper.parseArray(searchResults, []);

      if (isMounted?.current === true) {
        setSearchResults([...parsedSearchResults]);
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

  };

  const getBody = () => {
    if (isLoadingSalesforceComponentNames) {
      return (
          <CenterLoadingIndicator
          />
      );
    }

    return (
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
          isLoading={isLoading}
          helpComponent={<SalesforceLookUpHelpDocumentation/>}
          filterModel={filterModel}
          loadDataFunction={loadComponentNames}
          filterOverlay={
            <SalesforceLookupFilters
                salesforceLookupFilterModel={filterModel}
                loadDataFunction={loadComponentNames}
                salesforceComponentNames={salesforceComponentNames}
            />
          }
      >
        {getBody()}
      </ScreenContainer>
  );
}

export default Lookup;
