import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TagsInlineInputBase from "components/common/inputs/tags/inline/TagsInlineInputBase";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import {getMetricFilterValue} from "components/common/helpers/metrics/metricFilter.helpers";
import Model from "core/data_model/model";

function DashboardTagsInlineInput(
  {
    model,
    loadData,
    disabled,
    visible,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [temporaryModel, setTemporaryModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (model) {
      const newModel = {...new Model({...model.getPersistData()}, model?.getMetaData(), false)};
      newModel.setData("tags", getMetricFilterValue(model?.getData("filters"), "tags"));
      setTemporaryModel({...newModel});
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const saveDataFunction = async (newDataModel) => {
    const newModel = modelHelpers.setDashboardFilterModelField(model, "tags", newDataModel?.getData("tags"));
    return await dashboardsActions.updateDashboardFiltersV2(
      getAccessToken,
      cancelTokenSource,
      newModel?.getMongoDbId(),
      newModel?.getData("filters"),
    );
  };

  if (model == null) {
    return null;
  }

  return (
    <TagsInlineInputBase
      tagLocation={"Dashboard"}
      disabled={disabled || model?.canUpdateDashboardFilters() !== true}
      visible={visible}
      model={temporaryModel}
      fieldName={"tags"}
      badgeClassName={"metric-badge"}
      saveDataFunction={saveDataFunction}
      loadData={loadData}
    />
  );
}

DashboardTagsInlineInput.propTypes = {
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  loadData: PropTypes.func,
};

export default DashboardTagsInlineInput;