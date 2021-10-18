import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import sonarPipelineDetailsFilterMetadata from "../sonar.pipeline.details.filter.metadata";
import SonarPipelineTableMetadata from "../sonar.pipeline.table.metadata";
import { getChartTrendStatusColumn, getTableTextColumn, getTableTextColumnWithoutField } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass, faExternalLink, faExclamationTriangle, faExclamation, faSirenOn, faInfoCircle, faRadiationAlt, faBan} from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./sonar-ratings-pipeline-details.css";

function SonarPipelineWiseMaintainibilityDetails() {
  const { getAccessToken } = useContext(AuthContext);
  const [model, setModel] = useState(
    new Model({...sonarPipelineDetailsFilterMetadata.newObjectFields}, sonarPipelineDetailsFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [maintainibilityData, setMaintainibilityData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [footerData, setFooterData] = useState(undefined);
  const [issueTypeData, setIssueTypeData]=useState(undefined);


  const noDataMessage = "Sonar Code Smell report is currently unavailable at this time";

  const fields = SonarPipelineTableMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "project")),
      getTableTextColumn(getField(fields, "runCount")),
      getChartTrendStatusColumn(getField(fields, "status")),
      getTableTextColumn(getField(fields, "critical"),'red'),
      getTableTextColumn(getField(fields, "blocker"),'red'),
      getTableTextColumn(getField(fields, "major"),'opsera-yellow'),
      getTableTextColumn(getField(fields, "minor"),'green'),
      getTableTextColumn(getField(fields, "info"),'info-text'),    
      getTableTextColumn(getField(fields, "total_effort")), 
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

  const calculateTrend = (maintainibility)=>{
    if(maintainibility.currentScanIssuesCount || !maintainibility.previousScanIssuesCount ){
      return '-';
    } else if (maintainibility.currentScanIssuesCount > maintainibility.previousScanIssuesCount ){
      return 'green';
    } else if (maintainibility.currentScanIssuesCount < maintainibility.previousScanIssuesCount) {
      return 'red';
    } else {
      return 'neutral';
    }
  };

  const loadData = async (cancelSource = cancelTokenSource, filterDto = model) => {    
    try {
      setIsLoading(true);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarRatingsCodeSmellsActionableInsights",
        undefined,
        undefined,        
        filterDto,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      if (isMounted?.current === true && response?.status === 200) {
        const sonarMaintainability = response?.data?.data[0]?.sonarCodeSmells?.data[0]?.projectData;
        await setMaintainibilityData(sonarMaintainability.map((maintainibility,index)=>({
              ...maintainibility,
              status : calculateTrend(maintainibility),
              blocker: 10,
              // TODO: remove the hard coded pipelineId value replaces with the api response
              pipelineId: '60ae84a54fa0c75fc683ad2b',
              "_blueprint":  <FontAwesomeIcon icon={faExternalLink} fixedWidth className="mr-2"/> ,
            })));
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", sonarMaintainability.length);
        setModel({ ...newFilterDto });
        setIssueTypeData( response?.data?.data[0]?.sonarCodeSmells?.data[0]?.typeData[0]);
        setFooterData(response?.data?.data[0]?.sonarCodeSmells?.data[0]?.debtData[0]);
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
        {getPipelineDetails()}
        <FilterContainer
          isLoading={isLoading}
          showBorder={false}
          title={`Technical Debt Ratio Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}          
          className={"px-2 pb-2"}
        />
        {getFooterDetails()}
      </>
    );
  };

  const getPipelineDetails = () => {
    if (!issueTypeData){
      return null;
    }
    return (
      <Row className="py-3 px-5">
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="box-metric d-flex flex-row" style={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesomeIcon icon={faRadiationAlt} fixedWidth className="mr-2"/>
              <div className="font-weight-bold">{issueTypeData?.total}</div>
            </div>
            <div className="w-100 text-muted mb-1">Code Smells</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faSirenOn} fixedWidth className="mr-2 red" />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold red">{issueTypeData?.critical}</div>
            </div>
            <div className="w-100 red mb-1">Critical</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faBan} fixedWidth className="mr-2 red" />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold red">12</div>
            </div>
            <div className="w-100 red mb-1 ">Blocker</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center ">
            <div className="box-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} fixedWidth className="mr-2 opsera-yellow" />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold opsera-yellow">{issueTypeData?.major}</div>
            </div>
            <div className="w-100 opsera-yellow mb-1 ">Major</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faExclamation} fixedWidth className="mr-2 green" />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold green">{issueTypeData?.minor}</div>
            </div>
            <div className="w-100 green mb-1 ">Minor</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faInfoCircle} fixedWidth  />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className="font-weight-bold">{issueTypeData?.info}</div>
            </div>
            <div className="w-100  mb-1">Info</div>
          </div>
        </Col>
      </Row>
    );
  };

  const getFooterDetails =()=>{
    if(!footerData){
      return null;
    }
    return(<>
          <Row className="px-5">
            <Col className="footer-records">
              Total remediation for Critical Code Smells : {footerData?.critical} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="footer-records">
              Total remediation for Major Code Smells : {footerData?.major} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="footer-records">
              Total remediation for Minor Code Smells : {footerData?.minor} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="footer-records">
              Total remediation for Info Code Smells : {footerData?.info} 
            </Col>
          </Row>
          </>);
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
    if (rowData.id == 0) {
      toastContext.showOverlayPanel(<BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount} />);
    }
  };
  
  const getTable = () => {    
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={maintainibilityData}
        noDataMessage={noDataMessage}
        paginationOptions={getPaginationOptions()}
        loadData={loadData}
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

SonarPipelineWiseMaintainibilityDetails.propTypes = {
  dataObject: PropTypes.object,
};

export default SonarPipelineWiseMaintainibilityDetails;
