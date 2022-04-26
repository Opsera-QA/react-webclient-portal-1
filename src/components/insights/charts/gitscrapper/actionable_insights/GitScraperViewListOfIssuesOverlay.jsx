import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import FilterContainer from "components/common/table/FilterContainer";
import GitScraperActionableInsightsCardView from "./card/GitScraperActionableInsightsCardView";
import gitScrapperPipelineFilterMetadata from "../git-scrapper-pipeline-filter-metadata";
import { Row, Col } from "react-bootstrap";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

function GitScraperViewListOfIssuesOverlay({ dataObject, kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [actionableInsightsData, setActionableInsightsData] = useState([]);
  const [actionableInsightsMetadata, setActionableInsightsMetadata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...gitScrapperPipelineFilterMetadata.newObjectFields }, gitScrapperPipelineFilterMetadata, false)
  );

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);
  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;

      const {repository, branch} = dataObject.getPersistData();

      const response = await chartsActions.getGitScraperIssuesActionableInsights(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs,
        null, 
        repository, 
        branch
      );

      const dataBlocks = response?.data && response?.status === 200 ? 
                                                  response?.data?.data?.data : [];      

      if (isMounted?.current === true && dataBlocks) {
        setActionableInsightsData(dataBlocks[0].data);
        setActionableInsightsMetadata(dataBlocks[0].metadata);
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          dataBlocks[0].count[0].count
        );
        setTableFilterDto({ ...newFilterDto });
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getCardView = () => {
    return (
      <GitScraperActionableInsightsCardView
        gitScraperDataFilterDto={tableFilterDto}
        setGitScraperDataFilterDto={setTableFilterDto}
        isLoading={isLoading}
        data={actionableInsightsData}
        metadata={actionableInsightsMetadata}
        loadData={loadData}
      />
    );
  };

  const getFilterContainer = () => {
    return (
      <FilterContainer
        filterDto={tableFilterDto}
        setFilterDto={setTableFilterDto}
        body={getCardView()}
        isLoading={isLoading}
        loadData={loadData}
        supportSearch={true}
      />
    );
  };
  

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const getMetadata = () => {
    if(actionableInsightsMetadata && actionableInsightsMetadata.length > 0) {
      return (
        <Row className="p-2 gray">
          <Col md={4}>            
            <StandaloneTextFieldBase label={"Repository"} text={actionableInsightsMetadata[0].repository} />
          </Col>
          <Col md={4}>            
            <StandaloneTextFieldBase label={"Branch"} text={actionableInsightsMetadata[0].branch} />
          </Col>
          <Col md={4}>
            <StandaloneTextFieldBase label={"Library"} text={actionableInsightsMetadata[0].library} />            
          </Col>
        </Row>      
      );
    }    
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Git Scraper Issues"}
      showToasts={true}
      titleIcon={faTable}
      isLoading={isLoading}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        {getDateRange()}
        {getMetadata()}
        {getFilterContainer()}        
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitScraperViewListOfIssuesOverlay.propTypes = {  
  dataObject: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GitScraperViewListOfIssuesOverlay;
