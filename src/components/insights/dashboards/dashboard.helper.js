import React from "react";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const dashboardHelper = {};

dashboardHelper.getModelDetailViewLink = (dashboardModel) => {
  if (dashboardModel == null) {
    return null;
  }

  const dashboardId = dashboardModel?.getMongoDbId();

  if (isMongoDbId(dashboardId) !== true) {
    return `/insights`;
  }

  return dashboardHelper.getDetailViewLink(dashboardId);
};

dashboardHelper.getDetailViewLink = (dashboardId) => {
  if (isMongoDbId(dashboardId) !== true) {
    return null;
  }

  return `/insights/dashboards/${dashboardId}/viewer`;
};