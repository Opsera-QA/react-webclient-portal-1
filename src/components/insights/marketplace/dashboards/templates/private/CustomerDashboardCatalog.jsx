import React, {useState, useEffect} from 'react';
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import { faChartArea, faChartUser } from "@fortawesome/pro-light-svg-icons";
import dashboardTemplateFilterMetadata
  from "components/insights/marketplace/dashboards/dashboard-template-filter-metadata";
import InlineDashboardTypeFilter from "components/common/filters/dashboards/dashboard_type/InlineDashboardTypeFilter";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  customerDashboardTemplateCatalogActions
} from "components/insights/marketplace/dashboards/templates/private/customerDashboardTemplateCatalog.actions";
import CustomerDashboardTemplateCardView
  from "components/insights/marketplace/dashboards/templates/private/CustomerDashboardTemplateCardView";

function CustomerDashboardCatalog () {
  const [dashboardTemplates, setDashboardTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardTemplateFilterModel, setDashboardTemplateFilterModel] = useState(new Model({ ...dashboardTemplateFilterMetadata.newObjectFields }, dashboardTemplateFilterMetadata, false));
  const {
    cancelTokenSource,
    isMounted,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(dashboardTemplateFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterModel = dashboardTemplateFilterModel) => {
    try {
      setIsLoading(true);
      await getDashboardTemplates(filterModel);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDashboardTemplates = async (filterModel = dashboardTemplateFilterModel) => {
    const response = await customerDashboardTemplateCatalogActions.getCustomerCatalogDashboardTemplates(
      getAccessToken,
      cancelTokenSource,
      filterModel,
    );
    const dashboardTemplates = response?.data?.data;

    if (isMounted?.current === true && dashboardTemplates) {
      setDashboardTemplates(dashboardTemplates);
      filterModel.setData("totalCount", response?.data?.count);
      filterModel.setData("activeFilters", filterModel?.getActiveFilters());
      setDashboardTemplateFilterModel({...filterModel});
    }
  };

  const getMainBody = () => {
    return (
      <CustomerDashboardTemplateCardView
        loadData={loadData}
        isLoading={isLoading}
        dashboardTemplateFilterModel={dashboardTemplateFilterModel}
        dashboardTemplates={dashboardTemplates}
        setDashboardTemplateFilterModel={setDashboardTemplateFilterModel}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <div className="d-flex">
        {/*<InlineDashboardPersonaFilter*/}
        {/*  filterModel={dashboardTemplateFilterModel}*/}
        {/*  setFilterModel={setDashboardTemplateFilterModel}*/}
        {/*  loadData={loadData} className={"mr-2"}*/}
        {/*/>*/}
        <InlineDashboardTypeFilter
          loadData={loadData}
          setFilterModel={setDashboardTemplateFilterModel}
          filterModel={dashboardTemplateFilterModel}
          className={"mr-2"}
        />
      </div>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={dashboardTemplateFilterModel}
      setFilterDto={setDashboardTemplateFilterModel}
      supportSearch={true}
      isLoading={isLoading}
      body={getMainBody()}
      inlineFilters={getInlineFilters()}
      titleIcon={faChartUser}
      title={"Private Customer Dashboard Template Catalog"}
      className={"pb-2"}
    />
  );
}

CustomerDashboardCatalog.propTypes = {};

export default CustomerDashboardCatalog;
