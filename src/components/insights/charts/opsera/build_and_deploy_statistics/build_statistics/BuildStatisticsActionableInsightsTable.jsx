import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import BuildDeployInsightsFilterMetadata from "../build-deploy-insights-filter-metadata";
import BuildStatisticsActionableInsightsMetadata from "./build-statistics-actionable-insights-metadata";
import { getTableTextColumn, getTableTextColumnWithoutField } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass, faExternalLink } from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TotalBuildsDeployments from "../data_blocks/TotalBuildsDeployments";
import SuccessfulBuildsDeployments from "../data_blocks/SuccessfulBuildsDeployments";
import FailedBuildsDeployments from "../data_blocks/FailedBuildsDeployments";
import AverageDuration from "../data_blocks/AverageDuration";
import AverageDurationToResolve from "../data_blocks/AverageDurationToResolve";

function BuildStatisticsActionableInsightsTable({ kpiConfiguration, dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [model, setModel] = useState(
    new Model({...BuildDeployInsightsFilterMetadata.newObjectFields}, BuildDeployInsightsFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [buildStatsData, setBuildStatsData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);  
  const [buildSummaryData, setBuildSummaryData]=useState(undefined);


  const noDataMessage = "Opsera Build Statistics report is currently unavailable at this time";

  const fields = BuildStatisticsActionableInsightsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipelineName")),
      getTableTextColumn(getField(fields, "total")),
      getTableTextColumn(getField(fields, "success")),
      getTableTextColumn(getField(fields, "failure")),
      getTableTextColumn(getField(fields, "duration")),
      getTableTextColumn(getField(fields, "timeToResolve")),
      getTableTextColumnWithoutField('Actions','_blueprint')

    ],
    []
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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = model) => {    
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "opseraBuildActionableInsights",
        kpiConfiguration,
        dashboardTags,        
        filterDto        
      );
      
      if (isMounted?.current === true && response?.status === 200) {
        const buildData = response?.data?.data[0]?.opseraBuildActionableInsights?.data[0]?.data;
        
        await setBuildStatsData(buildData.map((bd,index)=>({
              ...bd,              
              "_blueprint": <FontAwesomeIcon icon={faExternalLink} fixedWidth className="mr-2"/> ,
            })));
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", buildData.length);
        setModel({ ...newFilterDto });
        setBuildSummaryData( response?.data?.data[0]?.opseraBuildActionableInsights?.data[0]?.summaryData[0]);        
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

  const getBody = () => {
    return (
      <>
        
        {getBuildSummaryDetails()}
        <FilterContainer
          isLoading={isLoading}
          showBorder={false}
          title={`Opsera Build Statistics Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}          
          className={"px-2 pb-2"}
        />
        {getFooterDetails()}        
      </>
    );
  };

  const getBuildSummaryDetails = () => {
    if (!buildSummaryData){
      return null;
    }
    return (
      <Row className="pb-3 px-2">
        <Col xl={1} lg={1} sm={0} className="mt-3" ></Col>
        <Col xl={2} lg={2} sm={4} className="mt-3" >
          <TotalBuildsDeployments 
            displayValue={buildSummaryData?.total}
            displayText="Total Builds"
          />          
        </Col>
        <Col xl={2} lg={2} sm={4} className="mt-3" >
          <SuccessfulBuildsDeployments 
            displayValue={buildSummaryData?.success}
            displayText="Successful Builds"
          />          
        </Col>
        <Col xl={2} lg={2} sm={4} className="mt-3" >
          <FailedBuildsDeployments 
            displayValue={buildSummaryData?.failure}
            displayText="Failed Builds"
          />          
        </Col>
        <Col xl={2} lg={2} sm={4} className="mt-3" >
          <AverageDuration 
            displayValue={buildSummaryData?.avgDuration}
          />          
        </Col>
        <Col xl={2} lg={2} sm={4} className="mt-3" >
          <AverageDurationToResolve 
            displayValue={buildSummaryData?.avgTimeToResolve}
          />          
        </Col>        
      </Row>
    );
  };

  const getFooterDetails = () => {
    if (!buildSummaryData) {
      return null;
    }    

    return (
      <>
        <Row className="px-2">
          <Col className="footer-records text-right green">{`Total time spent to execute builds : ${buildSummaryData.duration}`}</Col>        
        </Row>
        <Row className="px-2">
          <Col className="footer-records text-right danger-red">{`Total time spent to resolve failed builds : ${buildSummaryData.timeToResolve}`}</Col>
        </Row>
      </>
      
    );
  };
  
  const getPaginationOptions = () => {
    return {
      pageSize: model.getData("pageSize"),
      totalCount: model.getData("totalCount"),
      currentPage: model.getData("currentPage"),
      gotoPageFn: gotoPage,
    };
  };
  
  const gotoPage = (pageNumber, pageSize) => {
    let newModel = {...model};
    newModel.setData("currentPage", pageNumber);
    newModel.setData("pageSize", pageSize);
    setModel({...newModel});
  };

  const onRowSelect = (rowData) => {
      toastContext.showOverlayPanel(<BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount} />);
  };

  const getTable = () => {    
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={buildStatsData}
        noDataMessage={noDataMessage}
        paginationOptions={getPaginationOptions()}
        loadData={`loadData`}
        onRowSelect={onRowSelect}
      />      
    );
  };

  return (
    <>
      {getBody()}      
    </>
  );

}

BuildStatisticsActionableInsightsTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default BuildStatisticsActionableInsightsTable;
