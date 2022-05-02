import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import Model from "core/data_model/model";
import OrganizationsInlineInputBase from "components/common/inputs/tags/inline/OrganizationsInlineInputBase";

function DashboardOrganizationsInlineInput({ model, loadData, disabled, visible }) {
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
      const newModel = { ...new Model({ ...model.getPersistData() }, model?.getMetaData(), false) };
      newModel.setData("organizations", getMetricFilterValue(model?.getData("filters"), "organizations"));
      setTemporaryModel({ ...newModel });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [model]);

  const updateDashboardOrganizations = async (newDataModel) => {
    const newModel = modelHelpers.setDashboardFilterModelField(
      model,
      "organizations",
      newDataModel?.getData("organizations")
    );
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
    <OrganizationsInlineInputBase
      tagLocation={"Dashboard"}
      disabled={disabled || model?.canUpdateDashboardFilters() !== true}
      visible={visible}
      model={temporaryModel}
      fieldName={"organizations"}
      saveDataFunction={updateDashboardOrganizations}
      loadData={loadData}
    />
  );
}

DashboardOrganizationsInlineInput.propTypes = {
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  loadData: PropTypes.func,
};

export default DashboardOrganizationsInlineInput;
