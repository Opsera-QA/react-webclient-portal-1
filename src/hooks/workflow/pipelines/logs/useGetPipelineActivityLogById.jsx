import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {websocketLiveUpdateHelper} from "core/websocket/websocket.helper";
import useItemSubscriptionHelper from "core/websocket/hooks/useItemSubscriptionHelper";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import usePipelineActivityLogActions from "hooks/workflow/pipelines/logs/usePipelineActivityLogActions";

export default function useGetPipelineActivityLogById(
  pipelineActivityLogId,
  handleErrorFunction,
  ) {
  const pipelineActivityLogActions = usePipelineActivityLogActions();
  const [pipelineActivityLog, setPipelineActivityLog] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  const onUpdateFunction = (newPipelineActivityLog) => {
    websocketLiveUpdateHelper.handleSingleObjectLiveUpdate(pipelineActivityLog, newPipelineActivityLog, setPipelineActivityLog);
  };

  useItemSubscriptionHelper(
    liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.PIPELINE_ACTIVITY_LOGS,
    pipelineActivityLogId,
    onUpdateFunction,
  );

  useEffect(() => {
    setPipelineActivityLog(undefined);

    if (isMongoDbId(pipelineActivityLogId) && loadData) {
      loadData(getCustomerPipelineActivityLogs, handleErrorFunction).catch(() => {});
    }
  }, [pipelineActivityLogId]);

  const getCustomerPipelineActivityLogs = async () => {
    setPipelineActivityLog(undefined);

    if (isMongoDbId(pipelineActivityLogId) !== true) {
      return;
    }

    const response = await pipelineActivityLogActions.getPipelineActivityLogById(pipelineActivityLogId);
    const pipelineActivityLog = DataParsingHelper.parseNestedObject(response, "data.data");
    setPipelineActivityLog(pipelineActivityLog);
  };

  return ({
    pipelineActivityLog: pipelineActivityLog,
    setPipelineActivityLog: setPipelineActivityLog,
    loadData: () => loadData(getCustomerPipelineActivityLogs, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
