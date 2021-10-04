import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import sonarPipelineDetailsFilterMetadata from "../sonar-pipeline-details-filter-metadata";
import SonarPipelineTableMetadata from "../sonar-pipeline-table-metadata";
import { getChartTrendStatusColumn, getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";


function SonarPipelineWiseReliabilityDetails({dataObject}) {

  const { getAccessToken } = useContext(AuthContext);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({...sonarPipelineDetailsFilterMetadata.newObjectFields}, sonarPipelineDetailsFilterMetadata, false)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineVulnerabilityData, setPipelineVulnerabilityData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [footerData, setFooterData] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [issueTypeData, setIssueTypeData]=useState(undefined);


  const noDataMessage = "Sonar Reliability report is currently unavailable at this time";

  const fields = SonarPipelineTableMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "project")),
      getTableTextColumn(getField(fields, "runCount")),
      getChartTrendStatusColumn(getField(fields, "status")),
      getTableTextColumn(getField(fields, "critical")),
      getTableTextColumn(getField(fields, "major")),
      getTableTextColumn(getField(fields, "minor")),
      getTableTextColumn(getField(fields, "info")),   
      getTableTextColumn(getField(fields, "total_effort")),   

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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      const response ={data:
        {
            "issueTypeData" : [ 
                {
                    "minor" : 28.0,
                    "major" : 36.0,
                    "critical" : 32.0,
                    "info" : 2.0,
                    "bugs":23.0,
                }
            ],
            "projectData" : [ 
                {
                    "total_effort" : 651,
                    "status":'green',
                    "project" : "Node-Analytics-Services",
                    "runCount" : 54,
                    "minor" : 27.0,
                    "major" : 36.0,
                    "critical" : 32.0,
                    "info" : 2.0
                }, 
                {
                    "total_effort" : 1,
                    "project" : "Cypress-Example",
                    "runCount" : 52,
                    "status":'red',
                    "minor" : 1.0,
                    "major" : 0.0,
                    "critical" : 0.0,
                    "info" : 0.0
                },
                {
                  "total_effort" : 1,
                  "project" : "Cypress-Example",
                  "runCount" : 52,
                  "status":'red',
                  "minor" : 1.0,
                  "major" : 0.0,
                  "critical" : 0.0,
                  "info" : 0.0
              },
              {
                "total_effort" : 1,
                "project" : "Cypress-Example",
                "runCount" : 52,
                "status":'red',
                "minor" : 1.0,
                "major" : 0.0,
                "critical" : 0.0,
                "info" : 0.0
            }
            ],
            "totalDebtData" : [ 
                {
                    "minor" : 90,
                    "major" : 440,
                    "critical" : 122,
                    "info" : 0
                }
            ]
        }
        };
    /*await chartsActions.getSecondaryInsightsData(
        getAccessToken,
        cancelSource,
        "getPipelineSonarReliabilityData",
        {
          pipelineId: dataObject?.pipelineId, 
          projectName: dataObject?.projectName, 
          runCount: dataObject?.run_count
        },
        filterDto
      );*/

      //if (isMounted?.current === true && response?.status === 200) {
        const sonarIssues = response?.data?.projectData;
        setPipelineVulnerabilityData(sonarIssues);
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",sonarIssues.length
         // response?.data?.data[0]?.PipelineSonarReliabilityData?.data[0]?.count[0]?.count
        );
        setTableFilterDto({ ...newFilterDto });
        setMetrics(sonarIssues);
        setIssueTypeData(response?.data?.issueTypeData[0]);
        setFooterData(response?.data?.totalDebtData[0]);
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
          title={`Bugs Report`}
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
            <div className="font-weight-bold">{issueTypeData?.bugs}</div>
            <div className="w-100 text-muted mb-1">Bugs</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{issueTypeData?.critical}</div>
            <div className="w-100 text-muted mb-1">Critical</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{issueTypeData?.minor}</div>
            <div className="w-100 text-muted mb-1">Major</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{issueTypeData?.info}</div>
            <div className="w-100 text-muted mb-1">Info</div>
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
            <Col className="text-right">
              Total Debt for Remediating Critical Issues : {footerData?.critical} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="text-right">
              Total Debt for Remediating Major Issues : {footerData?.major} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="text-right">
              Total Debt for Remediating Minor Issues : {footerData?.minor} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="text-right">
              Total Debt for Remediating Info Issues : {footerData?.info} 
            </Col>
          </Row>
          </>);
  };
  
  const getTable = () => {    
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationModel={tableFilterDto}
        setPaginationModel={setTableFilterDto}
        loadData={loadData}
      />      
    );
  };

  return (
    <>
      {getBody()}      
    </>
  );

}

SonarPipelineWiseReliabilityDetails.propTypes = {
  dataObject: PropTypes.object,
};

export default SonarPipelineWiseReliabilityDetails;
