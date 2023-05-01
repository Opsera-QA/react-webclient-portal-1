import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import constantsHelper from "@opsera/definitions/constants/constants.helper";

const baseImageBucketUrl = `${process.env.REACT_APP_OPSERA_S3_STORAGE_URL}/icons`;
const publicGraphicsBucketUrl = `${process.env.REACT_APP_OPSERA_S3_STORAGE_URL}/graphics`;

export const platformImageConstants = {};

platformImageConstants.PLATFORM_IMAGE_LINKS = {
  ADVANCED_OPTION: `${baseImageBucketUrl}/user_advanced_screen_150x121.png`,
  COLLABORATION: `${publicGraphicsBucketUrl}/team_collab_750x509.png`,
  COLLABORATION_ALT: `${publicGraphicsBucketUrl}/team_collab_2sm_375x298.png`,
  PIPELINES_GENERAL: `${baseImageBucketUrl}/pipelines_general_96x96.png`,
  SALESFORCE_GENERAL: `${baseImageBucketUrl}/cloud_code_generic_130x92.png`,
  SALESFORCE_GIT_TASK: `${baseImageBucketUrl}/git_user_generic_120x91.png`,
  SOFTWARE_DEVELOPMENT_GENERAL: `${baseImageBucketUrl}/laptop_code_generic_140x92.png`,
  SOFTWARE_DEVELOPMENT_CLOUD: `${baseImageBucketUrl}/laptop_cloud_generic_140x92.png`,
  WIZARD_GENERAL: `${baseImageBucketUrl}/wizard_panel_generic_150x143.png`,
};

platformImageConstants.PRODUCT_IMAGE_LINK_CARD_HEIGHTS = {
  ADVANCED_OPTION: undefined,
  COLLABORATION: undefined,
  COLLABORATION_ALT: undefined,
  PIPELINES_GENERAL: undefined,
  SALESFORCE_GENERAL: undefined,
  SALESFORCE_GIT_TASK: undefined,
  SOFTWARE_DEVELOPMENT_GENERAL: undefined,
  SOFTWARE_DEVELOPMENT_CLOUD: undefined,
  WIZARD_GENERAL: undefined,
};

platformImageConstants.getRecommendedCardPlatformImageHeight = (
  imageLink,
) => {
  if (!imageLink) {
    return undefined;
  }

  const key = constantsHelper.getKeyForValue(
    platformImageConstants.PLATFORM_IMAGE_LINKS,
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

