import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import constantsHelper from "@opsera/definitions/constants/constants.helper";

const baseBucketUrl = `${process.env.REACT_APP_OPSERA_S3_STORAGE_URL}/icons`;

export const platformImageConstants = {};

platformImageConstants.PRODUCT_IMAGE_LINKS = {
  ADVANCED_OPTION: `${baseBucketUrl}/user_advanced_screen_150x121.png`,
  PIPELINES_GENERAL: `${baseBucketUrl}/pipelines_general_96x96.png`,
  SALESFORCE_GENERAL: `${baseBucketUrl}/cloud_code_generic_130x92.png`,
  SALESFORCE_GIT_TASK: `${baseBucketUrl}/git_user_generic_120x91.png`,
  WIZARD_GENERAL: `${baseBucketUrl}/wizard_panel_generic_150x143.png`,
  SOFTWARE_DEVELOPMENT_GENERAL: `${baseBucketUrl}/laptop_code_generic_140x92.png`,
  SOFTWARE_DEVELOPMENT_CLOUD: `${baseBucketUrl}/laptop_cloud_generic_140x92.png`,
};

platformImageConstants.PRODUCT_IMAGE_LINK_CARD_HEIGHTS = {
  ADVANCED_OPTION: undefined,
  PIPELINES_GENERAL: undefined,
  SALESFORCE_GENERAL: undefined,
  SALESFORCE_GIT_TASK: undefined,
  WIZARD_GENERAL: undefined,
  SOFTWARE_DEVELOPMENT_GENERAL: undefined,
  SOFTWARE_DEVELOPMENT_CLOUD: undefined,
};

platformImageConstants.getRecommendedCardPlatformImageHeight = (
  imageLink,
) => {
  if (!imageLink) {
    return undefined;
  }

  const key = constantsHelper.getKeyForValue(
    platformImageConstants.PRODUCT_IMAGE_LINKS,
    imageLink,
  );

  if (!key) {
    return undefined;
  }

  const recommendedHeight = DataParsingHelper.parseInteger(platformImageConstants.PRODUCT_IMAGE_LINK_CARD_HEIGHTS[key]);

  if (recommendedHeight) {
    return recommendedHeight;
  }
};

