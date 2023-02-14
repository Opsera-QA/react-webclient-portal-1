import ModelBase from "core/data_model/model.base";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetModelBase() {
  const {
    userData,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  const getModelBase = (data, metadata, newModel) => {
    const model = new ModelBase(data, metadata, newModel);
    model.userData = userData;
    model.cancelTokenSource = cancelTokenSource;
    model.getAccessToken = getAccessToken;

    return model;
  };

  return getModelBase;
}


