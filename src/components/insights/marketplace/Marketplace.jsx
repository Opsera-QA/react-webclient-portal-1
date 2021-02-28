import React, {useState, useEffect, useContext, useRef} from 'react';
import { CardColumns } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import Model from "core/data_model/model";
import "./marketplace.css";
import KpiActions from 'components/admin/kpi_editor/kpi-editor-actions';
import dashboardMetadata from "../dashboards/dashboard-metadata";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import kpiMarketplaceFilterMetadata from "components/insights/marketplace/kpi-marketplace-filter-metadata";
import MarketplaceCard from "components/insights/marketplace/MarketplaceCard";
import KpiInfoModal from "components/insights/marketplace/KpiInfoModal";
import axios from "axios";
import InlineKpiCategoryFilter
  from "components/common/filters/insights/marketplace/kpi_category/InlineKpiCategoryFilter";
import InlineToolIdentifierFilter from "components/common/filters/tools/tool_identifier/InlineToolIdentifierFilter";
import FilterContainer from "components/common/table/FilterContainer";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import Row from "react-bootstrap/Row";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faAnalytics, faChartNetwork, faChartArea} from "@fortawesome/pro-light-svg-icons";

export default function Marketplace () {  
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = contextType;
  const location = useLocation();
  const history = useHistory();
  const [error, setErrors] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [dashboardId, setDashboardId] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [marketplaceFilterDto, setMarketplaceFilterDto] = useState(new Model({ ...kpiMarketplaceFilterMetadata.newObjectFields }, kpiMarketplaceFilterMetadata, false));
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("marketplace");
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
      setShowModal(false);
      await getMarketKPIData(filterModel, cancelSource);

      const dashboardId  =  location?.state?.dashboardId;
      if(dashboardId) {
        setDashboardData(undefined);
        setDashboardId(dashboardId);
        await getDashboard(dashboardId, cancelSource);
      }
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

  const getMarketKPIData = async (filterModel = marketplaceFilterDto, cancelSource = cancelTokenSource) => {
    const kpiResponse = await KpiActions.getKpisV2(getAccessToken, cancelSource, filterModel);
    const kpis = kpiResponse?.data?.data;

    if (isMounted?.current === true && kpiResponse && kpis) {
      setKpis(kpis);
      let newFilterDto = filterModel;
      newFilterDto.setData("totalCount", kpiResponse?.data?.count);
      console.log("totalCount: " + JSON.stringify(kpiResponse.data.count))
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters())
      setMarketplaceFilterDto({...newFilterDto});
    }
  };

  const getDashboard = async (dashboardId, cancelSource = cancelTokenSource) => {
    try {
      setDashboardLoading(true);
      const response = await dashboardsActions.getDashboardByIdV2(getAccessToken, cancelSource, dashboardId);

      if (isMounted?.current === true && response?.data) {
        setDashboardData(new Model(response.data, dashboardMetadata, false));
      }
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setDashboardLoading(false);
      }
    }
  };

  const openModal = (data) => {
    setSelectedItem(data);
    setShowModal(true);
  }

  const getMainBody = () => {
    if (loading) {
      return (<LoadingDialog size={"sm"}/>);
    }

    if (!Array.isArray(kpis) || kpis.length === 0) {
      return (<InlineInformation message={"No Marketplace Items Found"} />);
    }

    return (
      <div className="px-2 pb-2 pt-2">
        <div>
          <CardColumns>
            {kpis.map((kpi, index) => {
              return (<MarketplaceCard key={index} kpi={kpi} openModal={openModal}/>)
            })}
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
        <InlineKpiCategoryFilter filterModel={marketplaceFilterDto} setFilterModal={setMarketplaceFilterDto} loadData={loadData} className={"mr-2"} />
        <InlineToolIdentifierFilter loadData={loadData} setFilterModel={setMarketplaceFilterDto} filterModel={marketplaceFilterDto} fieldName={"tool"} className={"mr-2"} />
      </div>
    )
  };

  const handleNavTabClick = (tabSelection) => async e => {
    e.preventDefault();

    if (tabSelection === "analytics") {
      history.push(`/analytics`);
      return;
    }

    if (tabSelection === "marketplace") {
      history.push(`/insights/marketplace`);
      return;
    }

    if (tabSelection === "dashboards") {
      history.push(`/insights/dashboards`);
      return;
    }

    setActiveTab(tabSelection);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faChartNetwork} tabName={"dashboards"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Dashboards"} />
        <NavigationTab icon={faChartArea} tabName={"marketplace"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Marketplace"} />
        <NavigationTab icon={faAnalytics} tabName={"analytics"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Analytics"} />
      </NavigationTabContainer>
    );
  }

  if (error) {
    return <ErrorDialog error={error} />;
  }

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      isLoading={loading}
      breadcrumbDestination={"marketplace"}
      pageDescription={`
        Opsera provides users with access to a vast repository of KPI. Access all available
        KPIs and configure them on your Opsera Analytics Dashboards.
      `}
    >
      <FilterContainer
        loadData={loadData}
        filterDto={marketplaceFilterDto}
        setFilterDto={setMarketplaceFilterDto}
        supportSearch={true}
        isLoading={loading}
        body={getMainBody()}
        inlineFilters={getInlineFilters()}
        titleIcon={faChartArea}
        title={"KPIs"}
        className={"px-2 pb-2"}
      />
      <KpiInfoModal setShowModal={setShowModal} showModal={showModal} kpiItem={selectedItem} dashboardData={dashboardData}/>
    </ScreenContainer>
  )
}

