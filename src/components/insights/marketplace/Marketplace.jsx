import React, {useState, useEffect, useContext, useRef} from 'react';
import { InputGroup, Form, CardColumns, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faSearch,
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import { useLocation } from 'react-router-dom';
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import Model from "core/data_model/model";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import "./marketplace.css";
import KpiActions from 'components/admin/kpi_editor/kpi-editor-actions';
import dashboardMetadata from "../dashboards/dashboard-metadata";
import KpiCategoryFilter from "components/common/filters/insights/marketplace/kpi_category/KpiCategoryFilter";
import ToolIdentifierFilter from "components/common/filters/tools/tool_identifier/ToolIdentifierFilter";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import kpiMarketplaceFilterMetadata from "components/insights/marketplace/kpi-marketplace-filter-metadata";
import MarketplaceCard from "components/insights/marketplace/MarketplaceCard";
import KPIInfoModal from "components/insights/marketplace/KPIInfoModal";
import axios from "axios";
import InlineKpiCategoryFilter
  from "components/common/filters/insights/marketplace/kpi_category/InlineKpiCategoryFilter";

export default function Marketplace () {  
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = contextType;
  const location = useLocation();

  const [error, setErrors] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [dashboardId, setDashboardId] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
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


    const dashboardId  =  location?.state?.dashboardId;
    if(dashboardId) {
      setDashboardData(undefined);
      setDashboardId(dashboardId);
      getDashboard(dashboardId, source);
    }

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

    if (isMounted?.current === true && kpiResponse) {
      let newFilterDto = filterModel;
      newFilterDto.setData("totalCount", kpiResponse?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters())
      setMarketplaceFilterDto({...newFilterDto});
      setKpis(kpis);
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

  const handleSearch = async () => {
    let newFilterDto = marketplaceFilterDto;
    newFilterDto.setData("pageSize", 10);
    newFilterDto.setData("currentPage", 1);
    newFilterDto.setData("search", searchKeyword);
    setMarketplaceFilterDto({ ...newFilterDto });

    await getMarketKPIData();
  };

  // TODO: This should really be triggered by a button that doesn't do it every filter change
  const setFilterData = async (fieldName, value) => {
    let newDataObject = marketplaceFilterDto;
    newDataObject.setData(fieldName, value);
    setMarketplaceFilterDto({...newDataObject});

    await getMarketKPIData();
  };
  
  const getFilterActiveButton = (filter, key) => {
    return (
      <Button variant="primary" size="sm" className="mx-2 my-2 filterActiveBtn" key={key}>
        <span className="mx-2">{filter["text"]}</span>
        <span className="ml-2" onClick={() => {removeFilterData(filter.filterId);}}>
              <FontAwesomeIcon icon={faTimes} fixedWidth/>
        </span>
      </Button>
    );
  };
  
  const removeFilterData = async (fieldName) => {
    let newDataObject = marketplaceFilterDto;
    newDataObject.setData(fieldName, null);
    newDataObject.setData("currentPage", 1);
    setMarketplaceFilterDto({...newDataObject});
    await getMarketKPIData();
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
      <CardColumns>
        {kpis.map((kpi, index) => {
          return (<MarketplaceCard key={index} kpi={kpi} openModal={openModal}/>)
        })}
      </CardColumns>
    );
  };

  if (error) {
    return <ErrorDialog error={error} />;
  }

  return (
    <ScreenContainer
      isLoading={loading}
      breadcrumbDestination={"marketplace"}
      pageDescription={`
        OpsERA provides users with access to a vast repository of KPI. Access all available
        KPIs and configure them on your OpsERA Analytics Dashboards.
      `}
    >
      <div className="px-4">
        <Row>
          <Col>
            <InlineKpiCategoryFilter filterModel={marketplaceFilterDto} setFilterModal={setMarketplaceFilterDto} loadData={loadData}/>
          </Col>
          <Col>
            <ToolIdentifierFilter
              setDataFunction={setFilterData}
              setFilterDto={setMarketplaceFilterDto}
              filterDto={marketplaceFilterDto}
              fieldName={"tool"}
              inline={true}
            />
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search"
                value={searchKeyword || ""}
                onChange={e => setSearchKeyword(e.target.value)}
              />
              <InputGroup.Append>
                <Button variant="primary" size="sm" onClick={handleSearch}>
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
                  ) : (
                    <FontAwesomeIcon icon={faSearch} fixedWidth className="mr-1"/>
                  )}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <div className="mx-auto">
            <DtoBottomPagination
              paginationStyle={"stacked"}
              paginationDto={marketplaceFilterDto}
              setPaginationDto={setMarketplaceFilterDto}
              isLoading={loading}
              loadData={loadData}
            />
          </div>
        </Row>
        <Row>
          {marketplaceFilterDto.getData("activeFilters").map((filter, key) => getFilterActiveButton(filter, key))}
        </Row>
        <Row className="marketplace-cards">
          {getMainBody()}
        </Row>
        <Row>
          <div className="mx-auto">
            <DtoBottomPagination
              paginationStyle={"stacked"}
              paginationDto={marketplaceFilterDto}
              setPaginationDto={setMarketplaceFilterDto}
              isLoading={loading}
              loadData={loadData}
            />
          </div>
        </Row>

        <KPIInfoModal setShowModal={setShowModal} showModal={showModal} kpiItem={selectedItem} dashboardData={dashboardData}/>
      </div>
    </ScreenContainer>
  )
}

