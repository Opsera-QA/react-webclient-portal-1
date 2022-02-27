import ModelBase from "core/data_model/model.base";
import {userDataMappingActions} from "components/settings/data_mapping/users/userDataMapping.actions";

export class UserDataMappingModel extends ModelBase {
  constructor(
    data,
    metaData,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    customerAccessRules,
    roleDefinitions,
    setStateFunction
  ) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.setStateFunction = setStateFunction;
    this.customerAccessRules = customerAccessRules;
    this.roleDefinitions = roleDefinitions;
    this.updateAllowed = true;
    this.deleteAllowed = true;
  }

  createModel = async () => {
    return await userDataMappingActions.createUserDataMappingV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await userDataMappingActions.updateUserDataMappingV2( this.getAccessToken, this.cancelTokenSource, this);
  };

  deleteModel = async () => {
    return await userDataMappingActions.deleteUserDataMappingV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  getDetailViewLink = () => {
    return `/settings/data_mapping/user_mapping/details/${this.getData("_id")}`;
  };

  getDetailViewTitle = () => {
    return `${this.getData("opsera_user_email")} User Data Mapping Tag`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new UserDataMappingModel(
      {...newData},
      this.metaData,
      this.newModel,
      this.getAccessToken,
      this.cancelTokenSource,
      this.loadData,
      this.customerAccessRules,
      this.roleDefinitions,
      this.setStateFunction
    );
  };
}

export default UserDataMappingModel;


