import {faOctopusDeploy, faSalesforce} from "@fortawesome/free-brands-svg-icons";
import {
  faClipboardListCheck,
  faDraftingCompass,
  faShieldKeyhole,
  faTasks,
  faWrench
} from "@fortawesome/pro-light-svg-icons";
import React from "react";
import {TASK_TYPE_CATEGORIES, TASK_TYPES, taskTypeConstants} from "components/tasks/task.types";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import IconBase from "components/common/icons/IconBase";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {
  PIPELINE_TYPES,
  pipelineTypeConstants
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import {vendorImageConstants} from "temp-library-components/image/vendorImage.constants";
import {ImageBase} from "@opsera/react-vanity-set";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";

export const getToolIdentifiersWithMissingImages = () => {
  const keys = Object.keys(vendorImageConstants.TOOL_IDENTIFIER_LOGOS);
  const noImage = [];

  keys.forEach((key) => {
    const logo = vendorImageConstants.TOOL_IDENTIFIER_LOGOS[key];

    if (logo == null) {
      noImage.push(toolIdentifierConstants.TOOL_IDENTIFIERS[key]);
    }
  });

  return noImage;
};

export function getLargeVendorIconFromToolIdentifier(
  toolIdentifier,
  defaultIcon = faWrench,
) {
  if (toolIdentifier == null) {
    return <></>;
  }

  switch (toolIdentifier) {
    case toolIdentifierConstants.TOOL_IDENTIFIERS.OCTOPUS:
      return (
        <IconBase
          icon={faOctopusDeploy}
          iconStyling={{color: "#0D80D8"}}
          iconClassName={"title-fa-icon"}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR:
      return (
        <IconBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          icon={faSalesforce}
          iconStyling={{color: "#0D80D8"}}
          iconClassName={"title-fa-icon"}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      return getVendorTitle(toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO);
  }

  const imageLink = vendorImageConstants.getVendorImageForToolIdentifier(toolIdentifier);
  const imageHeight = vendorImageConstants.getRecommendedCardVendorImageHeight(toolIdentifier);

  if (imageLink === vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA) {
    return (
      <OpseraInfinityLogo
        desiredHeight={100}
        className={"d-flex h-100"}
        imageClassName={"my-auto"}
      />
    );
  }

  if (imageLink) {
    return (
      <ImageBase
        className={"d-flex h-100"}
        imageClassName={"my-auto"}
        height={imageHeight}
        imageSource={imageLink}
      />
    );
  }

  return (
    <IconBase
      icon={defaultIcon}
      iconClassName={"title-fa-icon wrench"}
    />
  );
}

export function getLargeVendorIconComponentFromTaskType (taskType) {
  if (taskType == null) {
    return <></>;
  }

  if (taskType === TASK_TYPES.GITSCRAPER) {
    return (
      <IconBase
        icon={faShieldKeyhole}
        iconClassName={"title-fa-icon"}
      />
    );
  }

  const category = taskTypeConstants.getTaskCategoryForType(taskType);

  switch (category) {
    case TASK_TYPE_CATEGORIES.SALESFORCE:
      return (
        <IconBase
          icon={faSalesforce}
          iconStyling={{color: "#0D80D8"}}
          iconClassName={"title-fa-icon"}
        />
      );
    case TASK_TYPE_CATEGORIES.GIT:
      return (
        <ImageBase
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GIT}
        />
      );
    case TASK_TYPE_CATEGORIES.AWS:
      return (
        <ImageBase
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS}
        />
      );
    case TASK_TYPE_CATEGORIES.COMPLIANCE:
      return (
        <IconBase
          icon={faClipboardListCheck}
          iconClassName={"title-fa-icon"}
        />
      );
    case TASK_TYPE_CATEGORIES.AZURE:
      return (
        <ImageBase
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE}
        />
      );
    default:
      return (
        <IconBase
          icon={faTasks}
          iconClassName={"title-fa-icon"}
        />
      );
  }
}

export function getLargeVendorIconFromTaskType (taskType) {
  if (taskType == null) {
    return <></>;
  }

  if (taskType === TASK_TYPES.GITSCRAPER) {
    return faShieldKeyhole;
  }

  const category = taskTypeConstants.getTaskCategoryForType(taskType);

  switch (category) {
    case TASK_TYPE_CATEGORIES.SALESFORCE:
      return faSalesforce;
    case TASK_TYPE_CATEGORIES.GIT:
      return vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GIT;
    case TASK_TYPE_CATEGORIES.AWS:
      return vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS;
    case TASK_TYPE_CATEGORIES.COMPLIANCE:
      return faClipboardListCheck;
    case TASK_TYPE_CATEGORIES.AZURE:
      return vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE;
    default:
      return faTasks;
  }
}

export function getLargeVendorIconComponentFromPipeline (pipeline) {
  const type = pipelineTypeConstants.getTypeForTypesArray(pipeline);

  if (hasStringValue(type) !== true) {
    return (
      <IconBase
        icon={faDraftingCompass}
        iconClassName={"title-fa-icon"}
      />
    );
  }

  const toolIdentifier = pipelineHelper.getFirstPipelineStepIdentifier(pipeline);

  if (type !== PIPELINE_TYPES.SOFTWARE_DEVELOPMENT || !toolIdentifier) {
    return (
      <IconBase
        icon={pipelineTypeConstants.getIconForPipelineType(type)}
        iconClassName={"title-fa-icon"}
      />
    );
  }

  return getLargeVendorIconFromToolIdentifier(
    toolIdentifier,
    faDraftingCompass,
  );
}

export function getVendorTitle (toolIdentifier) {
  if (toolIdentifier == null) {
    return "";
  }

  switch (toolIdentifier) {
    case "jira":
      return "Jira";
    case "aws_account":
      return "AWS";
    case "elastic-beanstalk":
      return "Elastic Beanstalk";
    case "bitbucket":
      return "BitBucket";
    case "docker-push":
      return "Docker";
    case "github":
      return "Github";
    case "gitlab":
      return "Gitlab";
    case "azure":
      return "Azure";
    case "octopus":
      return "Octopus Deploy";
    case "sfdc":
      return "Salesforce";
    case "slack":
      return "Slack";
    case "jenkins":
      return "Jenkins";
    case "teams":
      return "Teams";
    case "terraform":
      return "Terraform";
    case "gcp-deploy":
      return "Google Cloud Platform";
    case "junit":
      return "JUnit";
    case "selenium":
      return "Selenium";
    case "anchor":
      return "Anchor";
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      return "Argo CD";
    case "sonar":
      return "SonarQube";
    case "spinnaker":
      return "Spinnaker";
    case "xunit":
      return "xUnit";
    case "teamcity":
      return "TeamCity";
    case "twistlock":
      return "Twistlock";
    default:
      return "";
  }
}