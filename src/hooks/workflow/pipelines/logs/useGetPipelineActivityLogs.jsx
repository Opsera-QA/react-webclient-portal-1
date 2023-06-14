import {useEffect, useRef, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import usePipelineActivityLogActions from "hooks/workflow/pipelines/logs/usePipelineActivityLogActions";
import PipelineActivityLogFilterModel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipelineActivityLogFilterModel";
import pipelineLogHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineLog.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import usePipelineActivityLogCollectionSubscriptionHelper
  from "core/websocket/hooks/collection/activity_logs/usePipelineActivityLogCollectionSubscriptionHelper";
import useGetPollingPipelineActivityLogCountForRun
  from "hooks/workflow/pipelines/logs/useGetPollingPipelineActivityLogCountForRun";

export default function useGetPipelineActivityLogs(
  pipelineId,
  currentRunNumber,
  pipelineRunCount,
  handleErrorFunction,
) {
  const pipelineActivityLogActions = usePipelineActivityLogActions();
  const [pipelineActivityFilterModel, setPipelineActivityFilterModel] = useState(new PipelineActivityLogFilterModel());
  const [pipelineActivityLogs, setPipelineActivityLogs] = useState([]);
  const pipelineLogsTree = useRef([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  usePipelineActivityLogCollectionSubscriptionHelper(
    liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.PIPELINE_ACTIVITY_LOGS,
    pipelineActivityLogs,
    setPipelineActivityLogs,
    pipelineId,
    currentRunNumber,
  );
  const {
    logCount,
  } = useGetPollingPipelineActivityLogCountForRun(
    pipelineId,
    currentRunNumber === pipelineRunCount ? currentRunNumber : undefined
  );

  useEffect(() => {
    setPipelineActivityLogs([]);

    if (currentRunNumber && pipelineId && loadData) {
      loadData(getPipelineActivityLogs, handleErrorFunction).catch(() => {
      });
    }
  }, [currentRunNumber, pipelineId]);

  useEffect(() => {
    const newPipelineTree = pipelineLogHelpers.constructTopLevelTreeBasedOnRunCount(pipelineRunCount);
    pipelineLogsTree.current = [...newPipelineTree];
  }, [pipelineRunCount]);

  useEffect(() => {
    if (logCount > pipelineActivityLogs.length) {
      console.debug(`logCount: [${logCount}], current log count: [${pipelineActivityLogs.length}]`);

      if (currentRunNumber && pipelineId && loadData) {
        loadData(getPipelineActivityLogs, handleErrorFunction).catch(() => {
        });
      }
    }
  }, [logCount]);

  const getPipelineActivityLogs = async (newFilterModel = pipelineActivityFilterModel) => {

    if (currentRunNumber === "latest") {
      await getLatestActivityLogs(newFilterModel);
    } else if (currentRunNumber === "secondary") {
      await getSecondaryActivityLogs(newFilterModel);
    } else if (currentRunNumber) {
      await getSingleRunLogs(newFilterModel);
    }
  };

  const getSecondaryActivityLogs = async (newFilterModel = pipelineActivityFilterModel) => {
    const response = await pipelineActivityLogActions.getSecondaryPipelineActivityLogs(pipelineId, newFilterModel);
    const pipelineActivityData = DataParsingHelper.parseNestedArray(response, "data.data", []);
    // newFilterModel.setData("totalCount", DataParsingHelper.parseNestedInteger(response, "data.count"));
    // newFilterModel.setData("activeFilters", newFilterModel?.getActiveFilters());
    // setPipelineActivityFilterModel({...newFilterModel})
    setPipelineActivityLogs([...pipelineActivityData]);
  };

  const getLatestActivityLogs = async (newFilterModel = pipelineActivityFilterModel) => {
    const response = await pipelineActivityLogActions.getLatestPipelineActivityLogsV3(pipelineId, newFilterModel);
    const pipelineActivityData = DataParsingHelper.parseNestedArray(response, "data.data", []);
    // newFilterModel.setData("totalCount", DataParsingHelper.parseNestedInteger(response, "data.count"));
    // newFilterModel.setData("activeFilters", newFilterModel?.getActiveFilters());
    // setPipelineActivityFilterModel({...newFilterModel})
    setPipelineActivityLogs([...pipelineActivityData]);
  };

  const getSingleRunLogs = async (newFilterModel = pipelineActivityFilterModel) => {
    const response = await pipelineActivityLogActions.getPipelineActivityLogs(pipelineId, newFilterModel, currentRunNumber);
    const pipelineActivityData = DataParsingHelper.parseNestedArray(response, "data.data", []);
    const triggeredBy = response?.data?.triggeredBy;

    setPipelineActivityLogs([...pipelineActivityData]);
    newFilterModel.setData("totalCount", DataParsingHelper.parseNestedInteger(response, "data.count"));
    newFilterModel.setData("activeFilters", newFilterModel?.getActiveFilters());
    setPipelineActivityFilterModel({...newFilterModel});

    const newTree = pipelineLogHelpers.updateSelectedRunNumberTree(pipelineLogsTree.current, currentRunNumber, pipelineActivityData, triggeredBy);

    if (Array.isArray(newTree) && newTree.length > 0) {
      pipelineLogsTree.current = [...newTree];
    }
  };

  return ({
    pipelineActivityLogs: pipelineActivityLogs,
    setPipelineActivityLogs: setPipelineActivityLogs,
    pipelineActivityFilterModel: pipelineActivityFilterModel,
    setPipelineActivityFilterModel: setPipelineActivityFilterModel,
    loadData: () => loadData(getPipelineActivityLogs, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
    pipelineLogsTree: pipelineLogsTree?.current,
  });
}
