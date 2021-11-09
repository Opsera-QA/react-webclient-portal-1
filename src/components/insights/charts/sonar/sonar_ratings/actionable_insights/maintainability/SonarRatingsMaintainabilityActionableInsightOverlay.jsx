import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import sonarPipelineDetailsFilterMetadata from "components/insights/charts/sonar/sonar_ratings/sonar.pipeline.details.filter.metadata";
import SonarPipelineTableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar.pipeline.table.metadata";
import {
  getChartTrendStatusColumn,
  getTableTextColumnWithoutField,
  getKpiSonarPipelineTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
  faExternalLink,
  faTable,
} from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-details.css";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {
  getColor,
  getTimeDisplay
} from "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-utility";
import SonarCodeSmellsDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/code_smells/total/SonarCodeSmellsDataBlock";
import SonarCriticalCodeSmellsDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/code_smells/critical/SonarCriticalCodeSmellsDataBlock";
import SonarBlockerCodeSmellsDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/code_smells/blocker/SonarBlockerCodeSmellsDataBlock";
import SonarMinorCodeSmellsDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/code_smells/minor/SonarMinorCodeSmellsDataBlock";
import SonarMajorCodeSmellsDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/code_smells/major/SonarMajorCodeSmellsDataBlock";
import SonarInfoCodeSmellsDataBlock
  from "components/common/metrics/data_blocks/tools/sonar/code_smells/info/SonarInfoCodeSmellsDataBlock";

function SonarRatingsMaintainabilityActionableInsightOverlay() {
  const { getAccessToken } = useContext(AuthContext);
  const [model, setModel] = useState(
    new Model({ ...sonarPipelineDetailsFilterMetadata.newObjectFields }, sonarPipelineDetailsFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [maintainibilityData, setMaintainibilityData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [footerData, setFooterData] = useState(undefined);
  const [issueTypeData, setIssueTypeData] = useState(undefined);

  const noDataMessage = "Sonar Code Smell report is currently unavailable at this time";

  const fields = SonarPipelineTableMetadata.fields;

  const columns = useMemo(
    () => [
      getKpiSonarPipelineTableTextColumn(getField(fields, "project")),
      getKpiSonarPipelineTableTextColumn(getField(fields, "runCount")),
      getChartTrendStatusColumn(getField(fields, "status"), "text-center", true),
      getKpiSonarPipelineTableTextColumn(getField(fields, "critical"), "critical"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "blocker"), "blocker"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "major"), "major"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "minor"), "minor"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "info"), "info"),
      getKpiSonarPipelineTableTextColumn(getField(fields, "effort")),
      getTableTextColumnWithoutField("Actions", "_blueprint", "text-center"),
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

  const calculateTrend = (maintainibility) => {
    if (maintainibility.currentScanIssuesCount || !maintainibility.previousScanIssuesCount) {
      return "-";
    } else if (maintainibility.currentScanIssuesCount > maintainibility.previousScanIssuesCount) {
      return "green";
    } else if (maintainibility.currentScanIssuesCount < maintainibility.previousScanIssuesCount) {
      return "red";
    } else {
      return "neutral";
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
        undefined
      );
      if (isMounted?.current === true && response?.status === 200) {
        const sonarMaintainability = response?.data?.data[0]?.sonarCodeSmells?.data[0]?.projectData;
        await setMaintainibilityData(
          sonarMaintainability.map((maintainibility, index) => ({
            ...maintainibility,
            status: calculateTrend(maintainibility),
            _blueprint: <FontAwesomeIcon icon={faExternalLink} fixedWidth className="mr-2" />,
          }))
        );
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", sonarMaintainability.length);
        setModel({ ...newFilterDto });
        setIssueTypeData(response?.data?.data[0]?.sonarCodeSmells?.data[0]?.typeData[0]);
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


  const getPipelineDetails = () => {
    if (!issueTypeData) {
      return null;
    }
    const code_smells = getColor("code_smells", issueTypeData?.total);
    const critical = getColor("critical", issueTypeData?.critical);
    const blocker = getColor("blocker", issueTypeData?.blocker);
    const major = getColor("major", issueTypeData?.major);
    const minor = getColor("minor", issueTypeData?.minor);
    const info = getColor("info", issueTypeData?.info);

    return (
      <Row className="py-3 px-2">
        <Col xl={2} lg={2} sm={4}>
          <SonarCodeSmellsDataBlock
            codeSmellCount={issueTypeData?.total}
            className={`p-2 ${code_smells}`}
          />
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <SonarCriticalCodeSmellsDataBlock
            className={`p-2 ${critical}`}
            criticalCodeSmellCount={issueTypeData?.critical}
          />
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <SonarBlockerCodeSmellsDataBlock
            blockerCodeSmellCount={issueTypeData?.blocker}
            className={`p-2 ${blocker}`}
          />
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <SonarMajorCodeSmellsDataBlock
            majorCodeSmellCount={issueTypeData?.major}
            className={`p-2 ${major}`}
          />
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <SonarMinorCodeSmellsDataBlock
            minorCodeSmellCount={issueTypeData?.minor}
            className={`p-2 ${minor}`}
          />
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <SonarInfoCodeSmellsDataBlock
            infoCodeSmellCount={issueTypeData?.info}
            className={`p-2 ${info}`}
          />
        </Col>
      </Row>
    );
  };

  const getFooterDetails = () => {
    if (!footerData) {
      return null;
    }

    const mins = footerData?.totalEffort ? footerData?.totalEffort : 0;
    const display = getTimeDisplay(mins);

    return (
      <Row className="px-2">
        <Col className="footer-records text-right">Total Remediation Efforts : {mins === 0 ? "0 minutes" : display}</Col>
      </Row>
    );
  };

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount} />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={maintainibilityData}
        noDataMessage={noDataMessage}
        loadData={loadData}
        onRowSelect={onRowSelect}
        className='sonar-pipeline-details-table'
      />
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Sonar Ratings: Maintainability`}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
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
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

export default SonarRatingsMaintainabilityActionableInsightOverlay;
