import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import useGetScriptModel from "components/inventory/scripts/hooks/useGetScriptModel";

export default function useGetScriptModelById(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptModel, setScriptModel] = useState(undefined);
  const { getNewScriptModel } = useGetScriptModel();
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setScriptModel(undefined);

    if (isMongoDbId(id) === true) {
      loadData().catch(() => {
      });
    }
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getScript();
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getScript = async () => {
    const response = await scriptsActions.getScriptById(
      getAccessToken,
      cancelTokenSource,
      id,
    );

    const script = response?.data?.data;

    if (script) {
      const newModel = getNewScriptModel(
        script,
        false,
        setScriptModel,
        loadData,
      );
      setScriptModel({ ...newModel });
    }
  };

  return ({
    scriptModel: scriptModel,
    setScriptModel: setScriptModel,
    loadData: loadData,
    isLoading: isLoading,
  });
}
