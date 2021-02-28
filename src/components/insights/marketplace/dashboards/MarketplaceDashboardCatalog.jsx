import React, {useState, useEffect, useContext, useRef} from 'react';
import { CardColumns } from "react-bootstrap";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import {faChartArea} from "@fortawesome/pro-light-svg-icons";
import dashboardTemplateFilterMetadata
  from "components/insights/marketplace/dashboards/dashboard-template-filter-metadata";
import dashboardTemplatesActions from "components/insights/marketplace/dashboards/dashboard-template-actions";

function MarketplaceDashboardCatalog ({ }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [dashboardTemplates, setDashboardTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marketplaceFilterDto, setMarketplaceFilterDto] = useState(new Model({ ...dashboardTemplateFilterMetadata.newObjectFields }, dashboardTemplateFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    
    loadData(marketplaceFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const loadData = async (filterModel = marketplaceFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      await getMarketKpiData(filterModel, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getMarketKpiData = async (filterModel = marketplaceFilterDto, cancelSource = cancelTokenSource) => {
    const response = await dashboardTemplatesActions.getDashboardTemplatesV2(getAccessToken, cancelSource, filterModel);
    const dashboardTemplates = response?.data?.data;

    if (isMounted?.current === true && dashboardTemplates) {
      setDashboardTemplates(dashboardTemplates);
      let newFilterDto = filterModel;
      newFilterDto.setData("totalCount", dashboardTemplates?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters())
      setMarketplaceFilterDto({...newFilterDto});
    }
  };

  const getMainBody = () => {
    if (loading) {
      return (<LoadingDialog size={"sm"}/>);
    }

    if (!Array.isArray(dashboardTemplates) || dashboardTemplates.length === 0) {
      return (<InlineInformation message={"No Marketplace Items Found"} />);
    }

    return (
      <div className="px-2 pb-2 pt-2">
        <div>
          <CardColumns>
            {JSON.stringify(dashboardTemplates)}
          </CardColumns>
        </div>
        <div>
          <div className="mx-auto">
            <DtoBottomPagination
              paginationStyle={"stacked"}
              paginationDto={marketplaceFilterDto}
              setPaginationDto={setMarketplaceFilterDto}
              isLoading={loading}
              loadData={loadData}
            />
          </div>
        </div>
      </div>
    );
  };

  const getInlineFilters = () => {
    return (
      <div className="d-flex">
        {/*<InlineKpiCategoryFilter filterModel={marketplaceFilterDto} setFilterModal={setMarketplaceFilterDto} loadData={loadData} className={"mr-2"} />*/}
        {/*<InlineToolIdentifierFilter loadData={loadData} setFilterModel={setMarketplaceFilterDto} filterModel={marketplaceFilterDto} fieldName={"tool"} className={"mr-2"} />*/}
      </div>
    )
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={marketplaceFilterDto}
      setFilterDto={setMarketplaceFilterDto}
      supportSearch={true}
      isLoading={loading}
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
