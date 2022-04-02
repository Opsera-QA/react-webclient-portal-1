import React, {useState, useEffect, useContext, useRef} from 'react';
import Model from "core/data_model/model";
import KpiActions from 'components/admin/kpi_identifiers/kpi.actions';
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import kpiMarketplaceFilterMetadata from "components/insights/marketplace/charts/kpi-marketplace-filter-metadata";
import axios from "axios";
import InlineKpiCategoryFilterSelectInput
  from "components/common/filters/insights/kpi/category/InlineKpiCategoryFilterSelectInput";
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
    const kpiResponse = await KpiActions.getKpiIdentifiersV2(getAccessToken, cancelSource, filterModel);
    let kpis = kpiResponse?.data?.data;

    const gitscrapperObj = {"_id":"6114627f339b36c046070ab6","tools":["gitscrapper"],"category":["quality"],"supported_filters":[{"type":"tags","value":[]},{"type":"date","value":null}],"dataPoints":[{"_id":"61d5ed1abcfb9a00199a2ed1","name":"gitscrapper","type":"number","identifier":"git-scrapper-metrics","description":"","strategic_criteria":{"_id":"61d5ed1abcfb9a00199a2ed1","data_point_evaluation_rules":{"_id":"61d5ed1abcfb9a00199a2ed2","success_rule":{"_id":"61d5ed1abcfb9a00199a2ed3","type":"success","trigger_filter":"between_inclusive","primary_trigger_value":4,"secondary_trigger_value":8,"enabled":false},"warning_rule":{"_id":"61d5ed1abcfb9a00199a2ed4","type":"warning","trigger_filter":"greater_than","primary_trigger_value":8,"secondary_trigger_value":0,"enabled":false},"failure_rule":{"_id":"61d5ed1abcfb9a00199a2ed5","type":"failure","trigger_filter":"less_than","primary_trigger_value":4,"secondary_trigger_value":0,"enabled":false}}},"updatedAt":"2021-12-07T13:33:10.394Z","createdAt":"2021-12-07T13:33:10.394Z"}],"name":"GitScrapper Metrics","description":"Cumulative Trend Overview of GitScrapper Metrics, including High, Medium and Low","identifier":"git-scrapper-metrics","type":"number","componentName":"","active":true,"policySupport":false,"thumbnailPath":"","createdAt":"2021-04-22T21:59:46.160Z","updatedAt":"2021-12-07T13:33:10.394Z","__v":0,"settings":{}};
    kpis[0] = gitscrapperObj;
    console.log('kpis', kpis);

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
        <InlineKpiCategoryFilterSelectInput filterModel={marketplaceFilterDto} setFilterModel={setMarketplaceFilterDto} loadData={loadData} className={"mr-2"} />
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
