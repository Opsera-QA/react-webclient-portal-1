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
import RequirementToBranchCreationTableMetadata from "./Req-creation-to-branch-creation.js";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { faDraftingCompass, faTable } from "@fortawesome/pro-light-svg-icons";
import { getField } from "components/common/metadata/metadata-helpers";
import { getTableDateTimeColumn } from "components/common/table/column_definitions/model-table-column-definitions";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";

function RequirementCreationToBranchCreation({ dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [branchMetric, setBranchMetric] = useState([]);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, RequirementToBranchCreationTableMetadata, false)
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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);

      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      const branchResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "gitlabRequirementCreationToBranchCreation",
        null,
        dashboardTags,
        dashboardOrgs
      );

      let branchDataObject = branchResponse?.data
        ? branchResponse?.data?.data[0]?.gitlabRequirementCreationToBranchCreation?.data
        : [];

      let branchNewFilterDto = filterDto;
      branchNewFilterDto.setData("totalCount", branchDataObject?.docs?.length);
      setTableFilterDto({ ...branchNewFilterDto });

      if (isMounted?.current === true && branchDataObject) {
        setBranchMetric(branchDataObject);
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
        data={branchMetric?.docs}
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
    newFilterDto.setData("totalCount", branchMetric?.docs?.length);
    setTableFilterDto({ ...newFilterDto });

    return (
      <FilterContainer
        // isLoading={isLoading}
        showBorder={false}
        title={`Requirement Creation To Branch Creation`}
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
        titleText={`Requirement to Branch Creation`}
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
    { id: "gitlabBranch", label: "Gitlab Branch" },
    { id: "jiraIssueCreationTime", label: "Jira Issue Creation Time" },
    { id: "branchCreationTime", label: "Branch Creation Time" },
    { id: "daysDifference", label: "Duration (in Days)" },
  ];

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "jiraIssueKey")),
      getTableTextColumn(getField(fields, "gitlabBranch")),
      getTableDateTimeColumn(getField(fields, "jiraIssueCreationTime")),
      getTableDateTimeColumn(getField(fields, "branchCreationTime")),
      getTableTextColumn(getField(fields, "daysDifference")),
    ],
    []
  );

  return (
    <ThreeLineDataBlockBase
      onClickFunction={(thisData) => onRowSelect(thisData)}
      className={"p-2"}
      topText={"Requirement to Branch Creation"}
      middleText={
        <MetricScoreText
          score={branchMetric.averageReqCreationToBranchCreationSecs}
          qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
        />
      }
      bottomText={"Average in Days"}
    />
  );
}

RequirementCreationToBranchCreation.propTypes = {
  dashboardData: PropTypes.object,
};

export default RequirementCreationToBranchCreation;
