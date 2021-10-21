import { React, useEffect, useState, useRef, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";
import { AuthContext } from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";
import Model from "../../../../../../core/data_model/model";
import genericChartFilterMetadata from "../../../../charts/generic_filters/genericChartFilterMetadata";
import CodeCommitToE1E2E3DeployMetaData from "./code-commit-to-E1-E2-E3-deploy";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { faDraftingCompass, faTable } from "@fortawesome/pro-light-svg-icons";
import { getField } from "components/common/metadata/metadata-helpers";
import { getTableDateTimeColumn } from "components/common/table/column_definitions/model-table-column-definitions";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";

function CodeCommitToE1Deploy({ dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, CodeCommitToE1E2E3DeployMetaData, false)
  );
  const toastContext = useContext(DialogToastContext);

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

    return () => {};
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      const response = await chartsActions.getEnvironmentMetrics(
        getAccessToken,
        cancelSource,
        "codeCommitToE1E2E3Deploy",
        null,
        dashboardTags,
        dashboardOrgs
      );
      let dataObject = response?.data ? response?.data?.data[0]?.codeCommitToE1E2E3Deploy?.data : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      } else {
        setMetrics([]);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getTable = () => {
    return (
      <VanityTable
        // isLoading={isLoading}
        columns={columns}
        data={metrics?.codeCommitToEnvDeploy}
        noDataMessage={"No Insights are available for this chart at this time"}
        paginationModel={tableFilterDto}
        setPaginationModel={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
      />
    );
  };

  const getBody = () => {
    let newFilterDto = tableFilterDto;
    newFilterDto.setData("totalCount", metrics?.codeCommitToEnvDeploy?.length);
    setTableFilterDto({ ...newFilterDto });

    return (
      <FilterContainer
        // isLoading={isLoading}
        showBorder={false}
        title={`Code Commit to E1 -> E2 -> E3 Deploy`}
        titleIcon={faDraftingCompass}
        body={getTable()}
        className={"px-2 pb-2"}
      />
    );
  };

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Code Commit to E1 -> E2 -> E3 Deploy`}
        showToasts={true}
        titleIcon={faTable}
        isLoading={false}
        linkTooltipText={"View Full Blueprint"}
      >
        <div className={"p-3"}>{getBody()}</div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const fields = [
    { id: "jiraIssueKey", label: "Jira Issue Key" },
    { id: "unitTestingStageIssueUpdated", label: "Stage 1" },
    { id: "peerReviewStageIssueUpdated", label: "Stage 2" },
    { id: "qaTestingStageIssueUpdated", label: "Stage 3" },
    { id: "productDeploymentStageIssueUpdated", label: "Stage 4" },
    // { id: "codeCommitToEnvDeploy", label: "Duration (in Days)" },
  ];

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "jiraIssueKey")),
      getTableDateTimeColumn(getField(fields, "unitTestingStageIssueUpdated")),
      getTableDateTimeColumn(getField(fields, "peerReviewStageIssueUpdated")),
      getTableDateTimeColumn(getField(fields, "qaTestingStageIssueUpdated")),
      getTableDateTimeColumn(getField(fields, "productDeploymentStageIssueUpdated")),
      // getTableTextColumn(getField(fields, "codeCommitToEnvDeploy")),
    ],
    []
  );

  return (
    <ThreeLineDataBlockBase
      onClickFunction={(thisData) => onRowSelect(thisData)}
      className={"p-2"}
      topText={"Code Commit to E1 -> E2 -> E3 Deploy"}
      middleText={
        <MetricScoreText score={metrics.avgCodeCommitToEnvDeploy} qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS} />
      }
      bottomText={"Average in Days"}
    />
  );
}

CodeCommitToE1Deploy.propTypes = {
  dashboardData: PropTypes.object,
};

export default CodeCommitToE1Deploy;
