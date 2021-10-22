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
import CodeCommitToE3DeployMetaData from "./code-commit-to-E3-deploy";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { faDraftingCompass, faTable } from "@fortawesome/pro-light-svg-icons";
import { getField } from "components/common/metadata/metadata-helpers";
import { getTableDateTimeColumn } from "components/common/table/column_definitions/model-table-column-definitions";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";

function CodeCommitToE3Deploy({ dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, CodeCommitToE3DeployMetaData, false)
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
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let dateRange =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "date")]?.value;
      const response = await chartsActions.getEnvironmentMetrics(
        getAccessToken,
        cancelSource,
        "codeCommitToE3Deploy",
        null,
        dashboardTags,
        dashboardOrgs,
        dateRange
      );
      let dataObject = response?.data ? response?.data?.data[0]?.codeCommitToE3Deploy?.data[0] : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setIsLoading(false);
      } else {
        setMetrics([]);
        setIsLoading(false);
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
        title={`Code Commit to E3 Deploy`}
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
        titleText={`Code Commit to E3 Deploy`}
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
    { id: "jiraIssueKey", label: "Issue Key" },
    { id: "unitTestingStageIssueUpdated", label: "Code Commit Time" },
    { id: "productDeploymentStageIssueUpdated", label: "E3 Deploy Time" },
    { id: "codeCommitToEnvDeploy", label: "Duration (in Days)" },
  ];

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "jiraIssueKey")),
      // getTableTextColumn(getField(fields, "gitlabBranch")),
      getTableDateTimeColumn(getField(fields, "unitTestingStageIssueUpdated")),
      getTableDateTimeColumn(getField(fields, "productDeploymentStageIssueUpdated")),
      getTableTextColumn(getField(fields, "codeCommitToEnvDeploy")),
    ],
    []
  );

  return (
    <ThreeLineDataBlockBase
      onClickFunction={(thisData) => onRowSelect(thisData)}
      className={"p-2"}
      topText={"Code Commit to E3 Deploy"}
      middleText={
        <MetricScoreText
          score={
            isLoading === true ? (
              <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1" />
            ) : metrics.avgCodeCommitToEnvDeploy ? (
              metrics.avgCodeCommitToEnvDeploy
            ) : (
              "N/A"
            )
          }
          qualityLevel={METRIC_QUALITY_LEVELS.DEFAULT}
        />
      }
      bottomText={"Average in Days"}
    />
  );
}

CodeCommitToE3Deploy.propTypes = {
  dashboardData: PropTypes.object,
};

export default CodeCommitToE3Deploy;
