import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useGetParameterModel from "components/inventory/parameters/hooks/useGetParameterModel";
import parametersActions from "components/inventory/parameters/parameters-actions";

export default function useGetParameterModelById(
  id,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [parameterModel, setParameterModel] = useState(undefined);
  const { getNewParameterModel } = useGetParameterModel();
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setParameterModel(undefined);

    if (isMongoDbId(id) === true) {
      loadData().catch(() => {
      });
    }
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getParameter();
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getParameter = async () => {
    const response = await parametersActions.getParameterByIdV2(
      getAccessToken,
      cancelTokenSource,
      id,
    );

    const parameter = response?.data?.data;

    if (parameter) {
      const newModel = getNewParameterModel(
        parameter,
        false,
        setParameterModel,
        loadData,
      );
      setParameterModel({...newModel});
    }
  };

  return ({
    scriptModel: parameterModel,
    setScriptModel: setParameterModel,
    loadData: loadData,
    isLoading: isLoading,
  });
}
