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
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import ImageBase from "temp-library-components/image/ImageBase";

export function getLargeVendorIconFromToolIdentifier(
  toolIdentifier,
  defaultIcon = faWrench,
  maxHeight = 100,
  maxWidth = 220,
) {
  if (toolIdentifier == null) {
    return <></>;
  }

  const keys = Object.keys(vendorImageConstants.TOOL_IDENTIFIER_LOGOS);
  const noImage = [];

  keys.forEach((key) => {
    const logo = vendorImageConstants.TOOL_IDENTIFIER_LOGOS[key];

    if (logo == null) {
      noImage.push(toolIdentifierConstants.TOOL_IDENTIFIERS[key]);
    }
  });

  switch (toolIdentifier) {
    // case toolIdentifierConstants.TOOL_IDENTIFIERS.ANCHORE_SCAN:
    // case toolIdentifierConstants.TOOL_IDENTIFIERS.ANCHORE_INTEGRATOR:
    //   return (
    //     <ImageBase
    //       className={"d-flex h-100"}
    //       imageClassName={"my-auto"}
    //       height={75}
    //       imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.ANCHOR}
    //     />
    //   );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ANSIBLE:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.ANSIBLE}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.CHILD_PIPELINE:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.PARALLEL_PROCESSOR:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_REST_API_INTEGRATION:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.GITSCRAPER:
      return (
        <OpseraInfinityLogo
          desiredHeight={100}
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_ACCOUNT:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_LAMDA:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_DEPLOY:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_ECS_DEPLOY:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ELASTIC_BEANSTALK:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_CLI:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ACCOUNT:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_WEBAPPS:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_SCRIPTS:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ZIP_DEPLOYMENT:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_FUNCTIONS:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ACR_PUSH:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_AKS_DEPLOY:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.S3:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.BITBUCKET}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.DOCKER_CLI:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.DOCKER_PUSH:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.DOCKER}
          height={100}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.GCP_DEPLOY:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.GCP_ACCOUNT:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GOOGLE_CLOUD_PLATFORM}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GITHUB}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GITLAB}
        />
      );
    case "git":
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GIT}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.JIRA:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JIRA}
          height={60}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JENKINS}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.MONGO_DB:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.MONGODB_REALM:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.MONGO_DB}
        />
      );
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
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SELENIUM:
      return (
        <ImageBase
          height={50}
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SELENIUM}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SLACK:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={50}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SLACK}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TEAMS:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={50}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.MICROSOFT_TEAMS}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM_CLOUD:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM_VCS:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={50}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TERRAFORM}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      return getVendorTitle(toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO);
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SONAR:
    // TODO: Find better icon for Sonar. It looks bad
      return getVendorTitle("sonar");
      // return <ImageBase height={height} width={width} imageSource={`${vendorIconPrefix}/sonarcube-65-250.png`} className={"sonarqube-icon"} />;
    case toolIdentifierConstants.TOOL_IDENTIFIERS.JUNIT:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JUNIT}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.NEXUS:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.NEXUS}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SPINNAKER:
      // TODO: Find better icon for spinnaker. It looks bad
      return getVendorTitle("spinnaker");
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TEAMCITY:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={100}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TEAMCITY}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TWISTLOCK:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={50}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TWISTLOCK}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.XUNIT:
      return (
        <ImageBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          height={50}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.XUNIT}
        />
      );
    default:
      return (
        <IconBase
          icon={defaultIcon}
          iconClassName={"title-fa-icon wrench"}
        />
      );
  }
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