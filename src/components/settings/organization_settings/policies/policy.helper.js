import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const policyHelper = {};

policyHelper.getDetailViewLink = (
  policiesId,
  ) => {
  if (isMongoDbId(policiesId) !== true) {
    return null;
  }

  return `/settings/organization-settings/policies/${policiesId}`;
};

policyHelper.getManagementScreenLink = () => {
  return `/settings/organization-settings/policies/`;
};