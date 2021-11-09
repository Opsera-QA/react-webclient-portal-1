import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import sonarPipelineDetailsFilterMetadata from "components/insights/charts/sonar/sonar_ratings/sonar.pipeline.details.filter.metadata";
import SonarPipelineTableMetadata from "components/insights/charts/sonar/sonar_ratings/sonar.pipeline.table.metadata";
import {
  getChartTrendStatusColumn,
  getTableTextColumn,
  getTableTextColumnWithoutField,
  getKpiSonarPipelineTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
  faExternalLink,
  faExclamationTriangle,
  faExclamation,
  faSirenOn,
  faInfoCircle,
  faBan,
  faBug, faTable,
} from "@fortawesome/pro-light-svg-icons";

import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-details.css";
import { getColor, getTimeDisplay, getField_custom } from "components/insights/charts/sonar/sonar_ratings/data_blocks/sonar-ratings-pipeline-utility";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

function SonarRatingsReliabilityActionableInsightOverlay() {
  const { getAccessToken } = useContext(AuthContext);
  const [model, setModel] = useState(
    new Model({ ...sonarPipelineDetailsFilterMetadata.newObjectFields }, sonarPipelineDetailsFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [bugsData, setBugsData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [footerData, setFooterData] = useState(undefined);
  const [issueTypeData, setIssueTypeData] = useState(undefined);

  const noDataMessage = "Sonar Bugs report is currently unavailable at this time";

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

  const calculateTrend = (bug) => {
    if (bug.currentScanIssuesCount || !bug.previousScanIssuesCount) {
      return "-";
    } else if (bug.currentScanIssuesCount > bug.previousScanIssuesCount) {
      return "green";
    } else if (bug.currentScanIssuesCount < bug.previousScanIssuesCount) {
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
        "sonarRatingsBugsActionableInsights",
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
        const sonarBugs = response?.data?.data[0]?.sonarBugs?.data[0]?.projectData;
        await setBugsData(
          sonarBugs.map((bug, index) => ({
            ...bug,
            status: calculateTrend(bug),
            _blueprint: <FontAwesomeIcon icon={faExternalLink} fixedWidth className="mr-2" />,
          }))
        );
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", sonarBugs.length);
        setModel({ ...newFilterDto });
        setIssueTypeData(response?.data?.data[0]?.sonarBugs?.data[0]?.typeData[0]);
        setFooterData(response?.data?.data[0]?.sonarBugs?.data[0]?.debtData[0]);
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

    const bugs = getColor("bugs", issueTypeData?.total);
    const critical = getColor("critical", issueTypeData?.critical);
    const blocker = getColor("blocker", issueTypeData?.blocker);
    const major = getColor("major", issueTypeData?.major);
    const minor = getColor("minor", issueTypeData?.minor);
    const info = getColor("info", issueTypeData?.info);

    return (
      <Row className="py-3 px-2">
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faBug} fixedWidth className={`mr-2 ${bugs}`} />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className={`font-weight-bold ${bugs}`}>{issueTypeData?.total}</div>
            </div>
            <div className={`w-100 mb-1 ${bugs}`}>Bugs</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faSirenOn} fixedWidth className={`mr-2 ${critical}`} />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className={`font-weight-bold ${critical}`}>{issueTypeData?.critical}</div>
            </div>
            <div className={`w-100 mb-1 ${critical}`}>Critical</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faBan} fixedWidth className={`mr-2 ${blocker}`} />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className={`font-weight-bold ${blocker}`}>{issueTypeData?.blocker}</div>
            </div>
            <div className={`w-100 mb-1 ${blocker}`}>Blocker</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center ">
            <div className="box-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} className={`mr-2 ${major}`} />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className={`font-weight-bold ${major}`}>{issueTypeData?.major}</div>
            </div>
            <div className={`w-100 mb-1 ${major}`}>Major</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faExclamation} fixedWidth className={`mr-2 ${minor}`} />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className={`font-weight-bold ${minor}`}>{issueTypeData?.minor}</div>
            </div>
            <div className={`w-100 mb-1 ${minor}`}>Minor</div>
          </div>
        </Col>
        <Col xl={2} lg={2} sm={4}>
          <div className="metric-box p-3 text-center">
            <div className="box-icon">
              <FontAwesomeIcon icon={faInfoCircle} fixedWidth className={`mr-2 ${info}`} />
            </div>
            <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
              <div className={`font-weight-bold ${info}`}>{issueTypeData?.info}</div>
            </div>
            <div className={`w-100 mb-1 ${info}`}>Info</div>
          </div>
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
        <Col className="footer-records text-right">Total Remediation Efforts : {mins == 0 ? "0 minutes" : display}</Col>
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
    let newModel = { ...model };
    newModel.setData("currentPage", pageNumber);
    newModel.setData("pageSize", pageSize);
    setModel({ ...newModel });
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
        data={bugsData}
        noDataMessage={noDataMessage}
        paginationOptions={getPaginationOptions()}
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
      titleText={`Sonar Ratings: Reliability`}
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
          title={`Bugs Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}
          className={"px-2 pb-2"}
        />
        {getFooterDetails()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SonarRatingsReliabilityActionableInsightOverlay.propTypes = {
  dataObject: PropTypes.object,
};

export default SonarRatingsReliabilityActionableInsightOverlay;
