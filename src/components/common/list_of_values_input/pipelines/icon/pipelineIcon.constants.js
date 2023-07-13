import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {vendorImageConstants} from "temp-library-components/image/vendorImage.constants";
import React from "react";
import toolIdentifierConstants from "@opsera/definitions/constants/tool_identifiers/toolIdentifier.constants";
import constantsHelper from "@opsera/definitions/constants/constants.helper";

export const pipelineIconConstants = {};

pipelineIconConstants.pipelineStepImageHeights = {
  ANCHOR: 75,
  ANSIBLE: 100,
  APIGEE: undefined,
  ARGO: 100,
  AQUASEC: 40,
  AWS: 100,
  AZURE: 100,
  BITBUCKET: undefined,
  BLACKDUCK: undefined,
  BOOMI: undefined,
  BUILDKITE: undefined,
  COVERITY: undefined,
  CYPRESS: undefined,
  DOCKER: 100,
  DOTNET: 65,
  FLYWAY: 90,
  FORTIFY: undefined,
  GIT: 100,
  GITHUB: 100,
  GITLAB: 100,
  GOOGLE_CHAT: 75,
  GOOGLE_CLOUD_PLATFORM: 90,
  HASHICORP: 75,
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
  OPSERA: 100,
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

pipelineIconConstants.getImageLinkForPipelineStep = (pipelineStep) => {
  const parsedPipelineStep = DataParsingHelper.parseObject(pipelineStep, {});
  const toolIdentifier = DataParsingHelper.parseNestedString(parsedPipelineStep, "tool.tool_identifier");
  const imageLink = vendorImageConstants.getVendorImageForToolIdentifier(toolIdentifier);

  if (!toolIdentifier || toolIdentifier === toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS || !imageLink) {
    return vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA;
  }

  return imageLink;
};

pipelineIconConstants.getRecommendedPipelineStepVendorImageHeightForImageLink = (
  vendorImageLink,
) => {
  const key = constantsHelper.getKeyForValue(
    vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS,
    vendorImageLink,
  );

  if (!key) {
    return undefined;
  }

  const recommendedHeight = DataParsingHelper.parseInteger(pipelineIconConstants.pipelineStepImageHeights[key]);

  if (recommendedHeight) {
    return recommendedHeight;
  }
};
