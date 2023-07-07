import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {websocketLiveUpdateHelper} from "core/websocket/websocket.helper";
import useItemSubscriptionHelper from "core/websocket/hooks/useItemSubscriptionHelper";
import {useHistory} from "react-router-dom";
import liveMessageTopicConstants from "@opsera/definitions/constants/websocket/constants/liveMessageTopic.constants";
import useRegistryToolActions from "hooks/tools/useRegistryToolActions";
import {toolHelper} from "components/inventory/tools/tool.helper";

export default function useGetRegistryToolById(
  toolId,
  handleErrorFunction,
  rerouteOnDeletion,
  ) {
  const {toastContext} = useComponentStateReference();
  const history = useHistory();
  const registryToolActions = useRegistryToolActions();
  const [tool, setTool] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  const onUpdateFunction = (newTool) => {
    websocketLiveUpdateHelper.handleSingleObjectLiveUpdate(tool, newTool, setTool);
  };

  const onDeleteFunction = (deletedTool) => {
    const parsedToolId = DataParsingHelper.parseNestedMongoDbId(deletedTool, "_id");

    if (parsedToolId === toolId) {
      toastContext.showSystemInformationToast("The Tool has been deleted.");

      if (rerouteOnDeletion !== false) {
        history.push(toolHelper.getManagementScreenLink());
      }
    }
  };

  useItemSubscriptionHelper(
    liveMessageTopicConstants.LIVE_MESSAGE_TOPICS.TOOLS,
    toolId,
    onUpdateFunction,
    onDeleteFunction,
  );

  useEffect(() => {
    setTool(undefined);

    if (isMongoDbId(toolId) && loadData) {
      loadData(getCustomerTools, handleErrorFunction).catch(() => {});
    }
  }, [toolId]);

  const getCustomerTools = async () => {
    setTool(undefined);

    if (isMongoDbId(toolId) !== true) {
      return;
    }

    const response = await registryToolActions.getRoleRestrictedToolById(toolId);
    const tool = DataParsingHelper.parseNestedObject(response, "data.data");
    setTool(tool);
  };

  return ({
    tool: tool,
    setTool: setTool,
    loadData: () => loadData(getCustomerTools, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
