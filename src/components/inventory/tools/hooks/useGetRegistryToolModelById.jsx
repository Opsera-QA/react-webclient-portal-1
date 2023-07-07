import {useEffect, useState} from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetRegistryToolModel from "components/inventory/tools/hooks/useGetRegistryToolModel";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import {websocketLiveUpdateHelper} from "core/websocket/websocket.helper";
import useGetRegistryToolById from "components/inventory/tools/hooks/useGetRegistryToolById";

export default function useGetRegistryToolModelById(
  id,
  handleErrorFunction,
  rerouteOnDeletion,
) {
  const [toolModel, setToolModel] = useState(undefined);
  const {getRegistryToolModel} = useGetRegistryToolModel();
  const {
    isFreeTrial,
    isOpseraAdministrator,
    userData,
  } = useComponentStateReference();
  const {
    tool,
    error,
    isLoading,
    loadData,
  } = useGetRegistryToolById(
    id,
    handleErrorFunction,
    rerouteOnDeletion,
  );

  const getToolModel = (tool) => {
    return getRegistryToolModel(tool, false);
  };

  useEffect(() => {
    if (!tool) {
      setToolModel(undefined);
    } else if (
      isOpseraAdministrator === true
      || isFreeTrial !== true
      || ObjectAccessRoleHelper.isUserObjectOwner(userData, tool) === true
    ) {
      websocketLiveUpdateHelper.handleModelLiveUpdate(toolModel, setToolModel, getToolModel, tool);
    }
  }, [tool]);

  return ({
    toolModel: toolModel,
    setToolModel: setToolModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
  });
}
