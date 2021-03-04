import React, {useState, useEffect, useContext, useRef} from 'react';
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import {faChartArea} from "@fortawesome/pro-light-svg-icons";
import dashboardTemplateFilterMetadata
  from "components/insights/marketplace/dashboards/dashboard-template-filter-metadata";
import dashboardTemplatesActions from "components/insights/marketplace/dashboards/dashboard-template-actions";
import InlineDashboardTemplateSourceFilterInput
  from "components/common/filters/insights/marketplace/dashboards/InlineDashboardTemplateSourceFilterInput";
import InlineDashboardTypeFilter from "components/common/filters/dashboards/dashboard_type/InlineDashboardTypeFilter";
import DashboardTemplateCardView from "components/insights/marketplace/dashboards/DashboardTemplateCardView";

function MarketplaceDashboardCatalog ({ }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [dashboardTemplates, setDashboardTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardTemplateFilterModel, setDashboardTemplateFilterModel] = useState(new Model({ ...dashboardTemplateFilterMetadata.newObjectFields }, dashboardTemplateFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(dashboardTemplateFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const loadData = async (filterModel = dashboardTemplateFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getDashboardTemplates(filterModel, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDashboardTemplates = async (filterModel = dashboardTemplateFilterModel, cancelSource = cancelTokenSource) => {
    const response = await dashboardTemplatesActions.getDashboardTemplatesV2(getAccessToken, cancelSource, filterModel);
    const dashboardTemplates = response?.data?.data;

    if (isMounted?.current === true && dashboardTemplates) {
      setDashboardTemplates(dashboardTemplates);
      let newFilterDto = filterModel;
      newFilterDto.setData("totalCount", dashboardTemplates?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters())
      setDashboardTemplateFilterModel({...newFilterDto});
    }
  };

  const getMainBody = () => {
    return (
      <DashboardTemplateCardView
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
        <InlineDashboardTemplateSourceFilterInput filterModel={dashboardTemplateFilterModel} setFilterModel={setDashboardTemplateFilterModel} loadData={loadData} className={"mr-2"} />
        {/*<InlineDashboardPersonaFilter filterModel={dashboardTemplateFilterModel} setFilterModel={setDashboardTemplateFilterModel} loadData={loadData} className={"mr-2"} />*/}
        <InlineDashboardTypeFilter loadData={loadData} setFilterModel={setDashboardTemplateFilterModel} filterModel={dashboardTemplateFilterModel} className={"mr-2"} />
      </div>
    )
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
      titleIcon={faChartArea}
      title={"Dashboard Templates"}
      className={"pb-2"}
    />
  )
}

MarketplaceDashboardCatalog.propTypes = {};

export default MarketplaceDashboardCatalog;
