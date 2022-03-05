import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import CustomTable from "components/common/table/CustomTable";
import Model from "core/data_model/model";
import sonarPipelineDetailsFilterMetadata from "components/insights/charts/sonar/table/sonar-pipeline-details-filter-metadata";
import SonarPipelineTableMetadata from "components/insights/charts/sonar/table/sonar-pipeline-table-metadata";
import { getTableTextColumn, getLimitedTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";

function SonarPipelineWiseVulnerabilitiesDetails({ dataObject }) {

  const { getAccessToken } = useContext(AuthContext);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({...sonarPipelineDetailsFilterMetadata.newObjectFields}, sonarPipelineDetailsFilterMetadata, false)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineVulnerabilityData, setPipelineVulnerabilityData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);

  const noDataMessage = "Sonar Vulnerabilities report is currently unavailable at this time";

  const fields = SonarPipelineTableMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "severity")),
      getTableTextColumn(getField(fields, "component")),
      getTableTextColumn(getField(fields, "line")),
      getLimitedTableTextColumn(getField(fields, "message"), 40),
      getTableTextColumn(getField(fields, "effort")),      
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "getPipelineSonarVulnerabilitiesData",
        undefined,
        undefined,        
        filterDto,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          pipelineId: dataObject?.pipelineId, 
          projectName: dataObject?.projectName, 
          runCount: dataObject?.run_count
        },
      );

      if (isMounted?.current === true && response?.status === 200) {
        const sonarIssues = response?.data?.data[0]?.PipelineSonarVulnerabilitiesData?.data[0]?.sonarIssues;
        setPipelineVulnerabilityData(sonarIssues.map(issue => {
          if(issue.component){
            const splitIssue = issue.component.split(":");
            if(splitIssue.length == 2){
              issue.component = splitIssue[1];
            }
          }          
          return issue;
        }));
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          response?.data?.data[0]?.PipelineSonarVulnerabilitiesData?.data[0]?.count[0]?.count
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

  const getBody = () => {

    return (
      <>
        {getPipelineDetails()}
        <FilterContainer
          isLoading={isLoading}
          title={`Vulnerabilities Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}          
          className={"px-2 pb-2"}
        />
      </>
    );
  };

  const getPipelineDetails = () => {
    return (
      <Row className="py-3 px-5">
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject?.projectName}</div>
            <div className="w-100 text-muted mb-1">Project Name</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject?.pipelineName}</div>
            <div className="w-100 text-muted mb-1">Pipeline Name</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject?.run_count}</div>
            <div className="w-100 text-muted mb-1">Run Count</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject?.sonarPrimaryLanguage}</div>
            <div className="w-100 text-muted mb-1">Language</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject?.sonarLatestMeasureValue}</div>
            <div className="w-100 text-muted mb-1">Vulnerabilities</div>
          </div>
        </Col>
      </Row>
    );
  };

  const getTable = () => {    
    return (      
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={pipelineVulnerabilityData}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}        
      />      
    );
  };

  return (
    <>
      {getBody()}      
    </>
  );

}

SonarPipelineWiseVulnerabilitiesDetails.propTypes = {
  dataObject: PropTypes.object,
};

export default SonarPipelineWiseVulnerabilitiesDetails;
