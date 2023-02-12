import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const tagHelper = {};

tagHelper.getDetailViewLink = (
  tagId,
  ) => {
  if (isMongoDbId(tagId) !== true) {
    return null;
  }

  return `/settings/tags/${tagId}`;
};

tagHelper.getManagementScreenLink = () => {
  return `/settings/tags/`;
};