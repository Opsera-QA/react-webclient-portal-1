import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import PipelineActivityLogTree
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTree";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";
import InlinePipelineStatusFilter from "components/common/filters/pipelines/status/InlinePipelineStatusFilter";
import PipelineActivityLogTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTable";
import PipelineActivityFilterModel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipelineActivity.filter.model";
import pipelineActivityLogsActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineActivityLogs.actions";
import pipelineLogHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineLog.helpers";
import CustomTable from "components/common/table/CustomTable";
import PaginationHelper from "@opsera/persephone/helpers/array/pagination.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPollingPipelineActivityLogCountForRun
  from "hooks/workflow/pipelines/logs/useGetPollingPipelineActivityLogCountForRun";

function PipelineActivityLogTreeTable(
  {
    pipeline,
    pipelineId,
    pipelineRunCount,
    className,
    showFilterContainerIcon,
    loadPipelineFunction,
  }) {
  const [pipelineActivityFilterModel, setPipelineActivityFilterModel] = useState(new PipelineActivityFilterModel());
  const [activityData, setActivityData] = useState([]);
  const [isLoadingActivityLogs, setIsLoadingActivityLogs] = useState(false);
  const pipelineTree = useRef([]);
  const [currentRunNumber, setCurrentRunNumber] = useState(pipelineRunCount);
  const [currentStepId, setCurrentStepId] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();
  const {
    logCount,
    isLoading,
  } = useGetPollingPipelineActivityLogCountForRun(
    pipelineId,
    currentRunNumber === pipelineRunCount ? currentRunNumber : undefined
  );

  useEffect(() => {
    loadData(pipelineActivityFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [logCount]);

  useEffect(() => {
    const newPipelineTree = pipelineLogHelpers.constructTopLevelTreeBasedOnRunCount(pipelineRunCount);
    pipelineTree.current = [...newPipelineTree];
  }, [pipelineRunCount]);

  useEffect(() => {
    setActivityData([]);

    if (currentRunNumber) {
      pullLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentRunNumber]);

  const loadData = async (newFilterModel = pipelineActivityFilterModel) => {
    if (isLoadingActivityLogs || typeof pipelineRunCount !== "number" || pipelineRunCount <= 0) {
      return;
    }

    try {
      console.log("pulling pipeline logs");
      setIsLoadingActivityLogs(true);
      await getSingleRunLogs(newFilterModel);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {

      if (isMounted?.current === true) {
        setIsLoadingActivityLogs(false);
      }
    }
  };

  const pullLogs = async (newFilterModel = pipelineActivityFilterModel) => {
    try {
      setIsLoadingActivityLogs(true);

      console.log("pulling pipeline logs");
      if (currentRunNumber === "latest") {
        await getLatestActivityLogs(newFilterModel);
      } else if (currentRunNumber === "secondary") {
        await getSecondaryActivityLogs(newFilterModel);
      } else {
        await getSingleRunLogs(newFilterModel);
      }

    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoadingActivityLogs(false);
      }
    }
  };

  const getSingleRunLogs = async (newFilterModel = pipelineActivityFilterModel) => {
    const response = await pipelineActivityLogsActions.getPipelineActivityLogsV3(getAccessToken, cancelTokenSource, pipelineId, newFilterModel, currentRunNumber);
    const pipelineActivityData = response?.data?.data;
    const activityLogCount = response?.data?.count;
    const triggeredBy = response?.data?.triggeredBy;

    if (isMounted?.current === true && Array.isArray(pipelineActivityData)) {
      setActivityData([...pipelineActivityData]);
      newFilterModel.setData("totalCount", activityLogCount);
      newFilterModel.setData("activeFilters", newFilterModel?.getActiveFilters());
      setPipelineActivityFilterModel({...newFilterModel});
      const newTree = pipelineLogHelpers.updateSelectedRunNumberTree(pipelineTree.current, currentRunNumber, pipelineActivityData, triggeredBy);

      if (Array.isArray(newTree) && newTree.length > 0) {
        pipelineTree.current = [...newTree];
      }
    }
  };

  const getLatestActivityLogs = async (filterDto = pipelineActivityFilterModel,) => {
    const response = await pipelineActivityLogsActions.getLatestPipelineActivityLogsV3(getAccessToken, cancelTokenSource, pipelineId, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(pipelineActivityData)) {
      setActivityData([...pipelineActivityData]);
    }
  };

  const getSecondaryActivityLogs = async (filterDto = pipelineActivityFilterModel,) => {
    const response = await pipelineActivityLogsActions.getSecondaryPipelineActivityLogsV3(getAccessToken, cancelTokenSource, pipelineId, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(pipelineActivityData)) {
      setActivityData([...pipelineActivityData]);
    }
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterModel?.getActiveFilters()?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    if (currentRunNumber === "secondary") {
      return ("There are no secondary logs.");
    }

    if (currentRunNumber === "latest") {
      return ("Pipeline activity data has not been generated yet.\n Once this pipeline begins running, it will publish details here.");
    }

    if (currentRunNumber === 0) {
      return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
    }

    if (currentRunNumber == null) {
      return ("Please select a run to view its logs");
    }

    return (`There are no log associated with run ${currentRunNumber}`);
  };

  const getTable = () => {
    return (
      <PipelineActivityLogTable
        isLoading={isLoadingActivityLogs || isLoading}
        pipeline={pipeline}
        pipelineLogData={activityData}
        latestPipelineLogId={PaginationHelper.getLatestCreatedItemInDataArray(activityData)?._id}
        pipelineActivityFilterDto={pipelineActivityFilterModel}
        currentRunNumber={currentRunNumber}
        currentStepId={currentStepId}
        loadPipelineFunction={loadPipelineFunction}
      />
    );
  };

  const getTree = () => {
    return (
      <PipelineActivityLogTree
        pipelineLogTree={pipelineTree?.current}
        setCurrentRunNumber={setCurrentRunNumber}
        setCurrentStepId={setCurrentStepId}
        pipelineRunCount={pipelineRunCount}
      />
    );
  };

  const getPipelineActivityTable = () => {
    if (pipelineRunCount === 0) {
      return (
        <CustomTable
          isLoading={isLoadingActivityLogs || isLoading}
          data={[]}
          noDataMessage={getNoDataMessage()}
        />
      );
    }

    return (
      <TreeAndTableBase
        data={activityData}
        isLoading={isLoadingActivityLogs || isLoading}
        noDataMessage={getNoDataMessage()}
        tableComponent={getTable()}
        loadData={loadData}
        treeComponent={getTree()}
        treeColumnSize={3}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlinePipelineStatusFilter
        loadData={loadData}
        filterModel={pipelineActivityFilterModel}
        setFilterModel={setPipelineActivityFilterModel}
        className={"mr-2"}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <PipelineStatusFilter
        filterModel={pipelineActivityFilterModel}
        setFilterModel={setPipelineActivityFilterModel}
      />
    );
  };

  return (
    <div className={className}>
      <FilterContainer
        loadData={loadData}
        filterDto={pipelineActivityFilterModel}
        setFilterDto={setPipelineActivityFilterModel}
        isLoading={isLoadingActivityLogs}
        title={"Pipeline Logs"}
        inlineFilters={getInlineFilters()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={showFilterContainerIcon !== false ? faClipboardList : undefined}
        body={getPipelineActivityTable()}
        supportSearch={true}
        exportButton={
          <ExportPipelineActivityLogButton
            className={"ml-2"}
            isLoading={isLoadingActivityLogs}
            activityLogData={activityData}
          />
        }
      />
    </div>
  );
}

PipelineActivityLogTreeTable.propTypes = {
  pipeline: PropTypes.object,
  pipelineId: PropTypes.string,
  pipelineRunCount: PropTypes.number,
  className: PropTypes.string,
  showFilterContainerIcon: PropTypes.bool,
  loadPipelineFunction: PropTypes.func,
};

export default PipelineActivityLogTreeTable;