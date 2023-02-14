import ModelBase from "core/data_model/model.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import {notificationPolicyHelper} from "hooks/notification_policies/notificationPolicy.helper";
import notificationsMetadata from "components/notifications/notifications-metadata";

export default class NotificationPolicyModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      notificationsMetadata,
      newModel,
    );
  }

  getDetailViewTitle = () => {
    return policyConstants.getPolicyNameLabel(this.getData("name"));
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
  }
}


