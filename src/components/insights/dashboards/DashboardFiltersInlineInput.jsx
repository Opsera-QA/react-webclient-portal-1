import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import FiltersInlineInputBase from "components/common/inputs/tags/inline/FiltersInlineInputBase";
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
      newModel.setData("amexFilters", getMetricFilterValue(model?.getData("filters"), "amexFilters"));
      setTemporaryModel({...newModel});
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [model]);

  const updateDashboardTags = async (newDataModel) => {
    const newModel = modelHelpers.setDashboardFilterModelField(model, "amexFilters", newDataModel?.getData("amexFilters"));
    const response = await dashboardsActions.updateDashboardV2(getAccessToken, cancelTokenSource, newModel);
    loadData();
    return response;
  };

  if (model == null) {
    return null;
  }

  return (
    <FiltersInlineInputBase
      tagLocation={"Dashboard"}
      disabled={disabled}
      visible={visible}
      model={temporaryModel}
      fieldName={"amexFilters"}
      badgeClassName={"metric-badge"}
      saveDataFunction={updateDashboardTags}
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