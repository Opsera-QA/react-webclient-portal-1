import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {faIdBadge} from "@fortawesome/pro-light-svg-icons";

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

policyHelper.getPolicyIcon = () => {
  return faIdBadge;
};