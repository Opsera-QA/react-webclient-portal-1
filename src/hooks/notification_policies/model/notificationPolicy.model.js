import ModelBase from "core/data_model/model.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {notificationPolicyHelper} from "hooks/notification_policies/notificationPolicy.helper";
import notificationPolicyMetadata
  from "@opsera/definitions/constants/notification_policies/notificationPolicy.metadata";

export default class NotificationPolicyModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      notificationPolicyMetadata,
      newModel,
    );
  }

  getDetailViewTitle = () => {
    return this.getData("name");
  };

  getDetailViewLink = () => {
    return `${notificationPolicyHelper.getDetailViewLink(this.getMongoDbId())}`;
  };

  getManagementScreenLink = () => {
    return `${notificationPolicyHelper.getManagementScreenLink()}`;
  };

  clone = () => {
    const newModel = new NotificationPolicyModel(
      DataParsingHelper.cloneDeep(this.data),
      this.isNew(),
    );

    newModel.userData = this.userData;

    return newModel;
  };

  getType = () => {
    return "Notification Policy";
  };
}


