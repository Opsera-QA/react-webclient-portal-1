import React,  { useState, useEffect, useContext } from 'react';
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
import KpiCategoryFilter from "components/common/filters/insights/kpi_marketplace/KpiCategoryFilter";
import ToolIdentifierFilter from "components/common/filters/tools/ToolIdentifierFilter";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import kpiMarketplaceFilterMetadata from "components/insights/marketplace/kpi-marketplace-filter-metadata";
import MarketplaceCard from "components/insights/marketplace/MarketplaceCard";
import KPIInfoModal from "components/insights/marketplace/KPIInfoModal";

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [marketplaceFilterDto, setMarketplaceFilterDto] = useState(new Model({ ...kpiMarketplaceFilterMetadata.newObjectFields }, kpiMarketplaceFilterMetadata, false));
  
  useEffect(() => {
    const dashboardId  =  location?.state?.dashboardId;
    if(dashboardId) {
      setDashboardData(undefined);
      setDashboardId(dashboardId);
      getDashboard(dashboardId);
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setShowModal(false);
      await getMarketKPIData();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setLoading(false);
    }
  };

  const getDashboard = async (dashboardId) => {
    try {
      setDashboardLoading(true);
      const response = await dashboardsActions.get(dashboardId, getAccessToken);
      // console.log(response);
      if (response != null && response.data) {
        setDashboardData(new Model(response.data, dashboardMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setDashboardLoading(false);
    }
  };

  const handleSearch = async () => {
    let newFilterDto = marketplaceFilterDto;
    newFilterDto.setData("pageSize", 10);
    newFilterDto.setData("currentPage", 1);
    newFilterDto.setData("search", searchKeyword);
    setMarketplaceFilterDto({ ...newFilterDto });

    // TODO: check with Todd on how this needs to be filtered, for now on every change it gets filtered
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

  const getMarketKPIData = async () => {
    const res = await KpiActions.getKpis(marketplaceFilterDto, getAccessToken);
    let dataObject = res?.data?.data;
    // update the total count
    let newFilterDto = marketplaceFilterDto;
    newFilterDto.setData("totalCount", res.data.count);
    newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters())
    setMarketplaceFilterDto({...newFilterDto});
    // update the data obj to render
    setData(dataObject);
  };

  const getPaginator = (dtoObj, setDto, loading, loadData) => {
    return (
      <div className="mx-auto">{dtoObj && dtoObj.getData("totalCount") != null &&
      <DtoBottomPagination paginationStyle={"stacked"} paginationDto={dtoObj} setPaginationDto={setDto} isLoading={loading}
                           loadData={loadData}/>}</div>
    );
  };

  const openModal = (data) => {
    setSelectedItem(data);
    setShowModal(true);
  }

  const getMainBody = () => {
    if (loading) {
      return (<LoadingDialog size={"sm"}/>);
    }

    if (data && data.length > 0) {
      return (
        <CardColumns>
          {data.map((data, index) => {
            return (<MarketplaceCard key={index} data={data} openModal={openModal}/>)
          })}
        </CardColumns>
      );
    }

    return (<InlineInformation message={"No Marketplace Items Found"} />);
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
      <div className="px-3">
        <Row>
          <Col>
            <KpiCategoryFilter filterDto={marketplaceFilterDto} setFilterDto={setMarketplaceFilterDto} setDataFunction={setFilterData}/>
          </Col>
          <Col>
            <ToolIdentifierFilter
              setDataFunction={setFilterData}
              setFilterDto={setMarketplaceFilterDto}
              filterDto={marketplaceFilterDto}
              fieldName={"tool"}
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
          {/* pagination */}
          {getPaginator(marketplaceFilterDto, setMarketplaceFilterDto, loading, getMarketKPIData)}
        </Row>
        <Row>
          {marketplaceFilterDto.getData("activeFilters").map((filter, key) => getFilterActiveButton(filter, key))}
        </Row>
        <Row className="marketplace-cards">
          {getMainBody()}
        </Row>
        <Row>
          {/* pagination */}
          {getPaginator(marketplaceFilterDto, setMarketplaceFilterDto, loading, getMarketKPIData)}
        </Row>

        {/* modal for displaying complete info */}
        <KPIInfoModal setShowModal={setShowModal} showModal={showModal} kpiItem={selectedItem} dashboardData={dashboardData}/>
      </div>
    </ScreenContainer>
  )
}

