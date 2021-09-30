import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
// import { useHistory } from "react-router-dom";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {
  // getChartTrendStatusColumn,
  // getLimitedTableTextColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import chartsActions from "components/insights/charts/charts-actions";
import ReqCreationToBranchCreationMetaData from "components/insights/charts/github/req_create_to_branch_creation/ReqCreationToBranchCreationMetaData";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "../../../../blueprint/BlueprintLogOverlay";

function ReqCreationToBranchCreationSummaryPanel({ dashboardData, kpiConfiguration, setActiveTab }) {
  // const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const fields = ReqCreationToBranchCreationMetaData.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  // const [modalData, setModalData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, ReqCreationToBranchCreationMetaData, false)
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
  }, [JSON.stringify(dashboardData)]);

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount} />
    );
  };

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "requirementCreationToBranchCreation",
        kpiConfiguration,
        dashboardTags,
        filterDto
      );

      let dataObject = response?.data?.data[0]?.requirementCreationToBranchCreation?.data?.docs;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          response?.data?.data[0]?.requirementCreationToBranchCreation?.data?.docs?.length
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

  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "jiraIssueKey")),
      getTableTextColumn(getField(fields, "githubBranch")),
      getTableDateTimeColumn(getField(fields, "jiraIssueCreationTime")),
      getTableDateTimeColumn(getField(fields, "branchCreationTime")),
      getTableTextColumn(getField(fields, "secondsDifference")),
    ],
    []
  );

  const getChartTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
      />
    );
  };

  return <SummaryPanelContainer setActiveTab={setActiveTab}>{getChartTable()}</SummaryPanelContainer>;
}

ReqCreationToBranchCreationSummaryPanel.propTypes = {
  chartModel: PropTypes.object,
  setActiveTab: PropTypes.func,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
};

export default ReqCreationToBranchCreationSummaryPanel;
