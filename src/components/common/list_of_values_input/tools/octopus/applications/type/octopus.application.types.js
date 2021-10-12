// TODO: Would it be better to make fieldDefinitions and attach types and labels together?
export const OCTOPUS_APPLICATION_TYPES = {
  ACCOUNT: "account",
  ENVIRONMENT: "environment",
  EXTERNAL_FEED: "feed",
  TARGET: "target",
  TOMCAT_MANAGER: "tomcat",
};

export const OCTOPUS_APPLICATION_TYPE_LABELS = {
  ACCOUNT: "Account",
  ENVIRONMENT: "Environment",
  EXTERNAL_FEED: "External Feed",
  TARGET: "Target",
  TOMCAT_MANAGER: "Tomcat Manager",
};

export const getOctopusApplicationTypeLabel = (applicationType) => {
  switch (applicationType) {
    case OCTOPUS_APPLICATION_TYPES.ACCOUNT:
      return OCTOPUS_APPLICATION_TYPE_LABELS.ACCOUNT;
    case OCTOPUS_APPLICATION_TYPES.ENVIRONMENT:
      return OCTOPUS_APPLICATION_TYPE_LABELS.ENVIRONMENT;
    case OCTOPUS_APPLICATION_TYPES.EXTERNAL_FEED:
      return OCTOPUS_APPLICATION_TYPE_LABELS.EXTERNAL_FEED;
    case OCTOPUS_APPLICATION_TYPES.TARGET:
      return OCTOPUS_APPLICATION_TYPE_LABELS.TARGET;
    case OCTOPUS_APPLICATION_TYPES.TOMCAT_MANAGER:
      return OCTOPUS_APPLICATION_TYPE_LABELS.TOMCAT_MANAGER;
    default:
      return "";
  }
};