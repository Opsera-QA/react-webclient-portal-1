import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const notificationPolicyHelper = {};

notificationPolicyHelper.getManagementScreenLink = () => {
  return `/notifications`;
};

notificationPolicyHelper.getDetailViewLink = (notificationPolicyId) => {
  if (isMongoDbId(notificationPolicyId) !== true) {
    return null;
  }

  return `/notifications/details/${notificationPolicyId}/`;
};
