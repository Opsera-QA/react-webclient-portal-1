import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {vendorImageConstants} from "temp-library-components/image/vendorImage.constants";
import React from "react";
import toolIdentifierConstants from "@opsera/definitions/constants/tool_identifiers/toolIdentifier.constants";
import constantsHelper from "@opsera/definitions/constants/constants.helper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import {platformImageConstants} from "temp-library-components/image/platformImage.constants";
import {ImageBase} from "@opsera/react-vanity-set";

export const pipelineStepIconConstants = {};

pipelineStepIconConstants.pipelineStepImageHeights = {
  ANCHOR: 33,
  ANSIBLE: 40,
  APIGEE: 19,
  ARGO: 40,
  AQUASEC: 33,
  AWS: 40,
  AZURE: 40,
  BITBUCKET: 33,
  BLACKDUCK: 40,
  BOOMI: 20,
  BUILDKITE: 32,
  COVERITY: 44,
  CYPRESS: 32,
  DOCKER: 40,
  DOTNET: 40,
  FLYWAY: 40,
  FORTIFY: 33,
  GIT: 33,
  GITHUB: 33,
  GITLAB: 33,
  GOOGLE_CHAT: 33,
  GOOGLE_CLOUD_PLATFORM: 33,
  HASHICORP: 33,
  HELM: 100,
  INFORMATICA: 50,
  JENKINS: undefined,
  JFROG: undefined,
  JIRA: 60,
  JMETER: 30,
  JUNIT: 90,
  KAFKA: 60,
  LIQUIBASE: 70,
  MICROSOFT: undefined,
  MICROSOFT_TEAMS: 50,
  MONGO_DB: 100,
  NEXUS: 100,
  NPM: undefined,
  NUNIT: undefined,
  OPSERA: 33,
  ORACLE: undefined,
  PROVAR: undefined,
  SAP: undefined,
  SELENIUM: 50,
  SERVICE_NOW: undefined,
  SLACK: 50,
  SNAPLOGIC: undefined,
  SNYK: undefined,
  SONAR: undefined,
  SPINNAKER: undefined,
  TEAMCITY: 100,
  TERRAFORM: 50,
  TERRASCAN: undefined,
  THYCOTIC_VAULT: undefined,
  TWISTLOCK: 50,
  XUNIT: 50,
};

pipelineStepIconConstants.getImageLinkForPipelineStep = (pipelineStep) => {
  const parsedPipelineStep = DataParsingHelper.parseObject(pipelineStep, {});
  const toolIdentifier = DataParsingHelper.parseNestedString(parsedPipelineStep, "tool.tool_identifier");
  const imageLink = vendorImageConstants.getVendorImageForToolIdentifier(toolIdentifier);

  if (!toolIdentifier || toolIdentifier === toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS || !imageLink) {
    return vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA;
  }

  return imageLink;
};

pipelineStepIconConstants.getRecommendedPipelineStepVendorImageHeightForImageLink = (
  vendorImageLink,
) => {
  const key = constantsHelper.getKeyForValue(
    vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS,
    vendorImageLink,
  );

  if (!key) {
    return undefined;
  }

  const recommendedHeight = DataParsingHelper.parseInteger(pipelineStepIconConstants.pipelineStepImageHeights[key]);

  if (recommendedHeight) {
    return recommendedHeight;
  }
};

pipelineStepIconConstants.getLargeVendorIconComponentFromPipelineStep = (pipelineStep, scaleFactor = 1) => {
  // const imageLink = pipelineStepIconConstants.getImageLinkForPipelineStep(pipelineStep);
  const imageLink = vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.HASHICORP;
  const imageHeight =
    vendorImageConstants.isValidVendorImageLink(imageLink) === true
      ? pipelineStepIconConstants.getRecommendedPipelineStepVendorImageHeightForImageLink(imageLink)
      : platformImageConstants.getRecommendedCardPlatformImageHeight(imageLink);
  const scaledImageHeight = imageHeight ? imageHeight * scaleFactor : imageHeight;

  if (imageLink === vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA) {
    return (
      <OpseraInfinityLogo
        desiredHeight={scaledImageHeight}
        className={"d-flex h-100"}
        imageClassName={"my-auto"}
      />
    );
  }

  return (
    <ImageBase
      height={scaledImageHeight}
      imageSource={imageLink}
    />
  );
};
