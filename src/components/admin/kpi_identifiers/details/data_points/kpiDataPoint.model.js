import ModelBase from "core/data_model/model.base";
import {isActionAllowed} from "components/common/helpers/role-helpers";
import kpiDataPointActions from "components/admin/kpi_identifiers/details/data_points/kpiDataPoint.actions";

export class KpiDataPointModel extends ModelBase {
  constructor(
    data,
    metadata,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    customerAccessRules,
    roleDefinitions,
    setStateFunction,
    parentId,
  ) {
    super(data, metadata, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.setStateFunction = setStateFunction;
    this.customerAccessRules = customerAccessRules;
    this.roleDefinitions = roleDefinitions;
    this.updateAllowed = this.canPerformAction("update_kpi_data_point");
    this.deleteAllowed = this.canPerformAction("delete_kpi_data_point");
    this.kpiId = parentId;
  }

  createModel = async () => {
    return await kpiDataPointActions.createKpiDataPointV2(this.getAccessToken, this.cancelTokenSource, this, this.kpiId);
  };

  saveModel = async () => {
    return await kpiDataPointActions.updateKpiDataPointV2(this.getAccessToken, this.cancelTokenSource, this, this.kpiId);
  };

  deleteModel = async () => {
    await kpiDataPointActions.deleteKpiDataPointV2(this.getAccessToken, this.cancelTokenSource, this, this.kpiId);
  };

  getDetailViewTitle = () => {
    return `${this?.getOriginalValue("name")}`;
  };

  getType = () => {
    return `KPI Data Point`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new KpiDataPointModel(
      {...newData},
      this.metaData,
      this.newModel,
      this.getAccessToken,
      this.cancelTokenSource,
      this.loadData,
      this.customerAccessRules,
      this.roleDefinitions,
      this.setStateFunction,
      this.kpiId,
    );
  };

  canPerformAction = (action) => {
    return isActionAllowed(this.customerAccessRules, action, undefined, undefined, this.roleDefinitions, true);
  }
}

export default KpiDataPointModel;


