// TODO: This is the first prototype of something like this, so it might not be very good.
export const SALESFORCE_WIZARD_CONFIGURATION_CONTAINER_HEIGHTS = {};

SALESFORCE_WIZARD_CONFIGURATION_CONTAINER_HEIGHTS.MAIN_CONTAINER = "max(calc(100vh - 305px), 500px)";
SALESFORCE_WIZARD_CONFIGURATION_CONTAINER_HEIGHTS.COMPONENT_TYPE_LIST = `calc(${SALESFORCE_WIZARD_CONFIGURATION_CONTAINER_HEIGHTS.MAIN_CONTAINER} - 50px)`;
SALESFORCE_WIZARD_CONFIGURATION_CONTAINER_HEIGHTS.COMPONENT_TYPE_LIST_CONTAINER_HEIGHT = `calc(${SALESFORCE_WIZARD_CONFIGURATION_CONTAINER_HEIGHTS.COMPONENT_TYPE_LIST} - 120px)`;
