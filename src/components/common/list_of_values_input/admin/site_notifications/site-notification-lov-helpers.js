const siteNotificationLovHelpers = {};

siteNotificationLovHelpers.viewLocations = [
  {id: "site", label: "Site-Wide"},
  {id: "pipelines", label: "Pipelines"},
  {id: "analytics", label: "Analytics"},
  {id: "toolchain", label: "Toolchain"},
  {id: "registry", label: "Tool Registry"},
];

siteNotificationLovHelpers.getViewLocationById = (id) => {
  return siteNotificationLovHelpers.viewLocations.find((filter) => filter.id === id);
};

siteNotificationLovHelpers.notificationTypes = [
  {id: "warning", label: "System Maintenance Notice"},
  {id: "error", label: "Service Outage Notice"},
  {id: "success", label: "Success"},
  {id: "information", label: "Informational Message"},
];

siteNotificationLovHelpers.getTypeById = (id) => {
  return siteNotificationLovHelpers.notificationTypes.find((filter) => filter.id === id);
};

export default siteNotificationLovHelpers;