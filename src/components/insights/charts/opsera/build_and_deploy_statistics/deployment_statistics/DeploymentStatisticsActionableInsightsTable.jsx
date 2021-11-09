import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import BuildDeployInsightsFilterMetadata from "../build-deploy-insights-filter-metadata";
import DeploymentStatisticsActionableInsightsMetadata from "./deployment-statistics-actionable-insights-metadata";
import { getTableTextColumn, getTableTextColumnWithoutField } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass, faExternalLink, faLockOpenAlt, faSirenOn, faExclamation, faExclamationTriangle, faInfoCircle, faBan } from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function DeploymentStatisticsActionableInsightsTable({ kpiConfiguration, dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [model, setModel] = useState(
    new Model({...BuildDeployInsightsFilterMetadata.newObjectFields}, BuildDeployInsightsFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [deploymentStatsData, setDeploymentStatsData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);  
  const [deploymentSummaryData, setDeploymentSummaryData]=useState(undefined);


  const noDataMessage = "Opsera Deployment Statistics report is currently unavailable at this time";

  const fields = DeploymentStatisticsActionableInsightsMetadata.fields;

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
        "opseraDeployActionableInsights",
        kpiConfiguration,
        dashboardTags,        
        filterDto
      );
      
      if (isMounted?.current === true && response?.status === 200) {
        const deploymentData = response?.data?.data[0]?.opseraDeploymentActionableInsights?.data[0]?.data;
        
        await setDeploymentStatsData(deploymentData.map((dd,index)=>({
              ...dd,
              "_blueprint": <FontAwesomeIcon icon={faExternalLink} fixedWidth className="mr-2"/> ,
            })));
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", deploymentData.length);
        setModel({ ...newFilterDto });
        setDeploymentSummaryData( response?.data?.data[0]?.opseraDeploymentActionableInsights?.data[0]?.summaryData[0]);        
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
        
        {getDeploymentSummaryDetails()}
        <FilterContainer
          isLoading={isLoading}
          showBorder={false}
          title={`Opsera Deployment Statistics Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}          
          className={"px-2 pb-2"}
        />        
      </>
    );
  };

  const getDeploymentSummaryDetails = () => {
    if (!deploymentSummaryData){
      return null;
    }
    return (
      <Row className="py-3 px-2">
        <Col xl={1} lg={1} sm={0} ></Col>
        <Col xl={2} lg={2} sm={4} >
          <div className="metric-box p-3 text-center">            
            <div className="box-metric d-flex flex-row" style={{alignItems: 'center', justifyContent: 'center'}}>
              <div className="font-weight-bold">{deploymentSummaryData?.total}</div>
            </div>
            <div className="w-100 text-muted mb-1">Total Deployments</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">            
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold green">{deploymentSummaryData?.success}</div>
            </div>
            <div className="w-100 green mb-1">Successful Deployments</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">            
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold red">{deploymentSummaryData?.failure}</div>
            </div>
            <div className="w-100 red mb-1 ">Failed Deployments</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">            
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold green">{deploymentSummaryData?.avgDuration} <span className="metric-box-subtext"> mins</span></div>
            </div>
            <div className="w-100 green mb-1">Average Duration</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">            
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold red">{deploymentSummaryData?.avgTimeToResolve}<span className="metric-box-subtext"> hrs</span></div>
            </div>
            <div className="w-100 red mb-1 ">Average Duration to Resolve</div>
          </div>
        </Col>        
      </Row>
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
        data={deploymentStatsData}
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

DeploymentStatisticsActionableInsightsTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default DeploymentStatisticsActionableInsightsTable;
