import React, {useState, useEffect, useContext, useRef} from 'react';
import Model from "core/data_model/model";
import KpiActions from 'components/admin/kpi_identifiers/kpi.actions';
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import kpiMarketplaceFilterMetadata from "components/insights/marketplace/charts/kpi-marketplace-filter-metadata";
import axios from "axios";
import InlineKpiCategoryFilter
  from "components/common/filters/insights/marketplace/kpi_category/InlineKpiCategoryFilter";
import InlineToolIdentifierFilter from "components/common/filters/tools/tool_identifier/InlineToolIdentifierFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faChartArea} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import MarketplaceChartCardView from "components/insights/marketplace/charts/MarketplaceChartCardView";

function MarketplaceCharts ({ dashboardId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [kpis, setKpis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [marketplaceFilterDto, setMarketplaceFilterDto] = useState(new Model({ ...kpiMarketplaceFilterMetadata.newObjectFields }, kpiMarketplaceFilterMetadata, false));
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
    };
  }, []);

  const loadData = async (filterModel = marketplaceFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    }
  };

  const getMarketKpiData = async (filterModel = marketplaceFilterDto, cancelSource = cancelTokenSource) => {
    const kpiResponse = await KpiActions.getKpisV2(getAccessToken, cancelSource, filterModel);
    const kpis = kpiResponse?.data?.data;

    if (isMounted?.current === true && kpiResponse && kpis) {
      setKpis(kpis);
      let newFilterDto = filterModel;
      newFilterDto.setData("totalCount", kpiResponse?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setMarketplaceFilterDto({...newFilterDto});
    }
  };

  const getMainBody = () => {
    return (
      <MarketplaceChartCardView
        isLoading={isLoading}
        loadData={loadData}
        dashboardId={dashboardId}
        marketplaceChartFilterModel={marketplaceFilterDto}
        marketplaceCharts={kpis}
        setMarketplaceChartFilterModel={setMarketplaceFilterDto}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <div className="d-flex">
        <InlineKpiCategoryFilter filterModel={marketplaceFilterDto} setFilterModal={setMarketplaceFilterDto} loadData={loadData} className={"mr-2"} />
        <InlineToolIdentifierFilter loadData={loadData} setFilterModel={setMarketplaceFilterDto} filterModel={marketplaceFilterDto} fieldName={"tool"} className={"mr-2"} />
      </div>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={marketplaceFilterDto}
      setFilterDto={setMarketplaceFilterDto}
      supportSearch={true}
      isLoading={isLoading}
      body={getMainBody()}
      inlineFilters={getInlineFilters()}
      titleIcon={faChartArea}
      title={"KPIs"}
      className={"pb-2"}
    />
  );
}

MarketplaceCharts.propTypes = {
  dashboardId: PropTypes.string
};

export default MarketplaceCharts;
