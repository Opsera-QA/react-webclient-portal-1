import ModelBase from "core/data_model/model.base";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useModelBase(
  data,
  metadata,
  newModel,
  ) {
  const {
    userData,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  const model = new ModelBase(data, metadata, newModel);
  model.userData = userData;
  model.cancelTokenSource = cancelTokenSource;
  model.getAccessToken = getAccessToken;

  return model;
}


