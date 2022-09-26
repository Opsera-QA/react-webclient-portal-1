import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useGetRegistryToolModel from "components/inventory/tools/hooks/useGetRegistryToolModel";

export default function useGetRegistryToolModelById(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [toolModel, setToolModel] = useState(undefined);
  const { getRegistryToolModel } = useGetRegistryToolModel();
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setToolModel(undefined);

    if (isMongoDbId(id) === true) {
      loadData().catch(() => {});
    }
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTool();
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTool = async () => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(
      getAccessToken,
      cancelTokenSource,
      id,
    );

    const tool = response?.data?.data;

    if (tool) {
      const newModel = getRegistryToolModel(tool, false);
      newModel.setSetStateFunction(setToolModel);
      setToolModel({...newModel});
    }
  };

  return ({
    toolModel: toolModel,
    setToolModel: setToolModel,
    loadData: loadData,
    isLoading: isLoading,
  });
}
