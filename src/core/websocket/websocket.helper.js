import React from "react";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const websocketLiveUpdateHelper = {};

websocketLiveUpdateHelper.handleSingleObjectLiveUpdate = (
  originalObject,
  updatedObject,
  setObjectFunction,
) => {
  if (ObjectHelper.areObjectsEqualLodash(originalObject, updatedObject) !== true) {
    const parsedUpdatedObject = DataParsingHelper.parseObject(updatedObject);

    if (parsedUpdatedObject) {
      setObjectFunction({...parsedUpdatedObject});
    } else {
      setObjectFunction(undefined);
    }
  }
};

websocketLiveUpdateHelper.handleModelLiveUpdate = (
  model,
  setModel,
  getModelFunction,
  liveUpdateObject,
) => {
  if (liveUpdateObject == null) {
    setModel(undefined);
  } else {
    if (model == null) {
      const newModel = getModelFunction(liveUpdateObject);

      if (newModel) {
        setModel({...newModel});
      } else {
        setModel(undefined);
      }
    } else {
      const hasUpdate = model.replaceOriginalData(liveUpdateObject);

      if (hasUpdate === true) {
        setModel({...model});
      }
    }
  }
};
