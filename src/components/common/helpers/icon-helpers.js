import {Image} from "react-bootstrap";
import {faAws, faGitAlt, faMicrosoft, faOctopusDeploy, faSalesforce} from "@fortawesome/free-brands-svg-icons";
import {faClipboardListCheck, faShieldKeyhole, faTasks, faWrench} from "@fortawesome/pro-light-svg-icons";
import React from "react";
import {TASK_TYPE_CATEGORIES, TASK_TYPES, taskTypeConstants} from "components/tasks/task.types";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import IconBase from "components/common/icons/IconBase";

export function getLargeVendorIconFromToolIdentifier(
  toolIdentifier,
  s3Bucket = process.env.REACT_APP_OPSERA_S3_STORAGE_URL,
  height,
  width,
) {
  if (toolIdentifier == null) {
    return <></>;
  }

  const vendorIconPrefix = `${s3Bucket}/vendor-logos`;

  switch (toolIdentifier) {
    case "jira":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/jira-74-220.png`} className={"jira-icon"} />;
    case "aws_account":
    case "elastic-beanstalk":
    case "aws-deploy":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-amazon-web-services-96.png`} />;
    case "bitbucket":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/bitbucket-76-75.png`} className={"bitbucket-icon"} />;
    case "docker-push":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-docker-96.png`} />;
    case "github":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-github-96.png`} />;
    case "gitlab":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-gitlab-96.png`} />;
    case "git":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-git-96.png`} />;
    case "azure":
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_CLI:
    case "azure-devops":
    case "azure-functions":
    case toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_WEBAPPS:
    case "azure_account":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-azure-96.png`} />;
    case "octopus":
      return <IconBase icon={faOctopusDeploy} iconStyling={{color: "#0D80D8"}} iconClassName={"title-fa-icon"} />;
    case "slack":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/slack-64-252.png`} className={"slack-icon"} />;
    case "sfdc-configurator":
      return <IconBase icon={faSalesforce} iconStyling={{color: "#0D80D8"}} iconClassName={"title-fa-icon"} />;
    case "jenkins":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/jenkins-98-113.png`} className={"jenkins-icon"} />;
    case "teams":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-microsoft-teams-48.png`} className={"small-title-icon"} />;
    case "terraform":
    case toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM_VCS:
      return <Image height={height} width={width} src={`${vendorIconPrefix}/hashicorp-terraform-48.png`} className={"small-title-icon"} />;
    case "gcp-deploy":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-google-cloud-platform-64.png`} className={"small-title-icon"} />;
    case "selenium":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/selenium-64-261.png`} className={"selenium-icon"} />;
    case "anchor":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/anchor-96-256.png`} />;
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      return getVendorTitle(toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO);
    case "sonar":
    // TODO: Find better icon for Sonar. It looks bad
      return getVendorTitle("sonar");
      // return <Image height={height} width={width} src={`${vendorIconPrefix}/sonarcube-65-250.png`} className={"sonarqube-icon"} />;
    case "junit":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/junit-97-172.png`} className={"junit-icon"} />;
    case "nexus":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/nexus-122-116.png`} />;
    case "spinnaker":
      // TODO: Find better icon for spinnaker. It looks bad
      return getVendorTitle("spinnaker");
    case "teamcity":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/teamcity-120-120.png`} className={"teamcity-icon"} />;
    case "twistlock":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/twistlock-64-254.png`} className={"twistlock-icon"} />;
    case "xunit":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/xunit-60-213.png`} className={"xunit-icon"} />;
    case "ansible":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/ansible-98-124.png`} className={"ansible-icon"} />;
    case "mongodb":
    case "mongodb_realm":
      return <Image height={height} width={width} src={`${vendorIconPrefix}/icons8-mongodb-96.png`} />;
    default:
      return <IconBase icon={faWrench} iconClassName={"title-fa-icon wrench"} />;
  }
}

export function getLargeVendorIconComponentFromTaskType (taskType) {
  if (taskType == null) {
    return <></>;
  }

  const vendorIconPrefix = `${process.env.REACT_APP_OPSERA_S3_STORAGE_URL}/vendor-logos`;

  if (taskType === TASK_TYPES.GITSCRAPER) {
    return (
      <IconBase
        icon={faShieldKeyhole}
        iconClassName={"title-fa-icon wrench"}
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
          iconClassName={"title-fa-icon icon-image"}
        />
      );
    case TASK_TYPE_CATEGORIES.GIT:
      return (
        <Image
          className={"icon-image"}
          src={`${vendorIconPrefix}/icons8-git-96.png`}
        />
      );
    case TASK_TYPE_CATEGORIES.AWS:
      return (
        <Image
          className={"icon-image"}
          src={`${vendorIconPrefix}/icons8-amazon-web-services-96.png`}
        />
      );
    case TASK_TYPE_CATEGORIES.COMPLIANCE:
      return (
        <IconBase
          icon={faClipboardListCheck}
          iconClassName={"title-fa-icon wrench"}
        />
      );
    case TASK_TYPE_CATEGORIES.AZURE:
      return (
        <Image
          className={"icon-image"}
          src={`${vendorIconPrefix}/icons8-azure-96.png`}
        />
      );
    default:
      return (
        <IconBase
          icon={faTasks}
          iconClassName={"title-fa-icon wrench"}
        />
      );
  }
}

export function getLargeVendorIconFromTaskType (taskType) {
  if (taskType == null) {
    return <></>;
  }

  const vendorIconPrefix = `${process.env.REACT_APP_OPSERA_S3_STORAGE_URL}/vendor-logos`;

  switch (taskType) {
    case TASK_TYPES.SYNC_SALESFORCE_REPO:
    case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
    case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      return faSalesforce;
    case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
    case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
    case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
      return `${vendorIconPrefix}/icons8-amazon-web-services-96.png`;
    case TASK_TYPES.SYNC_GIT_BRANCHES:
      return `${vendorIconPrefix}/icons8-git-96.png`;
    case TASK_TYPES.AZURE_CLUSTER_CREATION:
      return `${vendorIconPrefix}/icons8-azure-96.png`;
    default:
      return faTasks;
  }
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