import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export const organizationHelper = {};

organizationHelper.getManagementScreenLink = () => {
  return `/settings/organizations`;
};

organizationHelper.getDetailViewLink = (organizationId) => {
  if (isMongoDbId(organizationId) !== true) {
    return null;
  }

  return `/settings/organizations/details/${organizationId}`;
};
