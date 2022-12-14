import React, { useState, useContext, useEffect } from "react";
import {subDays} from "date-fns";
import {AuthContext} from "contexts/AuthContext";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import ScreenContainer from 'components/common/panels/general/ScreenContainer';
import SalesforceLookUpHelpDocumentation from '../../common/help/documentation/insights/SalesforceLookUpHelpDocumentation';
import FilterContainer from "components/common/table/FilterContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import AnalyticsSalesforceComponentNameMultiSelectInput
  from "components/common/list_of_values_input/tools/salesforce/component_names/analytics/AnalyticsSalesforceComponentNameMultiSelectInput";
import { insightsLookupActions } from "components/insights/lookup/insightsLookup.actions";
import LookupResults from "components/insights/lookup/LookupResults";
import DateRangeInputBase from "components/common/inputs/date/range/DateRangeInputBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import { formatDate } from "components/common/helpers/date/date.helpers";
import LookupFilterModel from "components/insights/lookup/lookup.filter.model";
import LookupMultiSelectInput from "components/insights/lookup/LookupMultiSelectInput";

function Lookup() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filterModel, setFilterModel] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const { isMounted, cancelTokenSource, toastContext } = useComponentStateReference();

  useEffect(() => {
    const newFilterModel = new LookupFilterModel();
    newFilterModel.setData("startDate", subDays(new Date(), 7));
    newFilterModel.setData("endDate", new Date());
    setFilterModel({...newFilterModel});
  }, []);

  const loadData = async (newFilterModel = filterModel) => {
    try {
      setIsLoading(true);
      setSearchResults([]);
      toastContext.removeInlineMessage();
      const startDate = newFilterModel?.getData("startDate");
      const endDate = newFilterModel?.getData("endDate");
      const componentNames = newFilterModel?.getArrayData("selectedComponentNames");

      if (!startDate || !endDate) {
        toastContext.showInlineErrorMessage('Please select start and end dates.');
        return;
      }

      if (componentNames.length === 0) {
        toastContext.showInlineErrorMessage('Please select at least one Salesforce component.');
        return;
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
        newFilterModel.getData("selectedComponentNames"),
      );
      const searchResults = insightsLookupActions.generateTransformedResults(response?.data?.data?.data);

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

  const getDropdownFilters = () => (
    <div>
      <DateRangeInputBase
        model={filterModel}
        setModel={setFilterModel}
      />
      <AnalyticsSalesforceComponentNameMultiSelectInput
        fieldName={"selectedComponentNames"}
        model={filterModel}
        setModel={setFilterModel}
      />
    </div>
  );

  const getNoDataMessage = () => {
    const startDate = filterModel?.getData("startDate");
    const endDate = filterModel?.getData("endDate");
    const componentNames = filterModel?.getArrayData("selectedComponentNames");

    if (!startDate || !endDate) {
      return 'Please select start and end dates.';
    }

    if (componentNames.length === 0) {
      return 'Please select at least one Salesforce component.';
    }
  };

  const getBody = () => {
    return (
      <>
      <LookupMultiSelectInput
        fieldName={"selectedComponentFilterData"}
        model={filterModel}
        setModel={setFilterModel}
      />
      <LookupResults
        isLoading={isLoading}
        searchResults={searchResults}
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
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"lookup"} />}
      isLoading={isLoading}
      breadcrumbDestination={"lookup"}
      helpComponent={<SalesforceLookUpHelpDocumentation />}
      pageDescription={`
      Currently applicable only for Salesforce Pipelines. 
      This Component based search provides details on when selected components have been deployed along with pipeline details and also provides summary on validations and unit tests.
      `}
    >
      <FilterContainer
        title={"Salesforce Lookup"}
        titleIcon={faSearch}
        isLoading={isLoading}
        filterDto={filterModel}
        loadData={loadData}
        dropdownFilters={getDropdownFilters()}
        body={getBody()}
        className={"mx-2"}
      />
    </ScreenContainer>
  );
}

export default Lookup;
