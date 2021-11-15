import Model from "core/data_model/model";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotification.metadata";

const siteNotificationHelpers = {};

siteNotificationHelpers.parseSiteNotification = (siteNotificationsResponse, view) => {
  if (siteNotificationsResponse.length > 0) {
    let existingSiteNotification = siteNotificationsResponse.find((notification) => { return notification.view === view;});

    if (existingSiteNotification) {
      return new Model(existingSiteNotification, siteNotificationMetadata, false);
    }
  }

  let notificationDto = new Model({...siteNotificationMetadata.newObjectFields}, siteNotificationMetadata, true);
  notificationDto.setData("view", view);
  return notificationDto;
};

siteNotificationHelpers.getExistingSiteNotification = (siteNotificationsResponse, view) => {
  if (siteNotificationsResponse.length > 0) {
    let existingSiteNotification = siteNotificationsResponse.find((notification) => { return notification.view === view;});

    if (existingSiteNotification) {
      return new Model(existingSiteNotification, siteNotificationMetadata, false);
    }
  }

  return null;
};

export default siteNotificationHelpers;