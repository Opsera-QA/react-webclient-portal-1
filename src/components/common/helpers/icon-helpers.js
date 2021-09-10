import {Image} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faOctopusDeploy, faSalesforce} from "@fortawesome/free-brands-svg-icons";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import React from "react";

export function getLargeVendorIconFromToolIdentifier (s3Bucket, toolIdentifier) {
  if (toolIdentifier == null) {
    return <></>;
  }

  const vendorIconPrefix = `${s3Bucket}/vendor-logos`;

  switch (toolIdentifier) {
    case "jira":
      return <Image src={`${vendorIconPrefix}/jira-74-220.png`} className={"jira-icon"} />;
    case "aws_account":
    case "elastic-beanstalk":
    case "aws-deploy":
      return <Image src={`${vendorIconPrefix}/icons8-amazon-web-services-96.png`} />;
    case "bitbucket":
      return <Image src={`${vendorIconPrefix}/bitbucket-76-75.png`} className={"bitbucket-icon"} />;
    case "docker-push":
      return <Image src={`${vendorIconPrefix}/icons8-docker-96.png`} />;
    case "github":
      return <Image src={`${vendorIconPrefix}/icons8-github-96.png`} />;
    case "gitlab":
      return <Image src={`${vendorIconPrefix}/icons8-gitlab-96.png`} />;
    case "git":
      return <Image src={`${vendorIconPrefix}/icons8-git-96.png`} />;
    case "azure":
    case "azure-devops":
    case "azure-functions":
    case "azure_account":
      return <Image src={`${vendorIconPrefix}/icons8-azure-96.png`} />;
    case "octopus":
      return <FontAwesomeIcon icon={faOctopusDeploy} fixedWidth style={{color: "#0D80D8"}} className={"title-fa-icon"} />;
    case "slack":
      return <Image src={`${vendorIconPrefix}/slack-64-252.png`} className={"slack-icon"} />;
    case "sfdc-configurator":
      return <FontAwesomeIcon icon={faSalesforce} fixedWidth style={{color: "#0D80D8"}} className={"title-fa-icon"} />;
    case "jenkins":
      return <Image src={`${vendorIconPrefix}/jenkins-98-113.png`} className={"jenkins-icon"} />;
    case "teams":
      return <Image src={`${vendorIconPrefix}/icons8-microsoft-teams-48.png`} className={"small-title-icon"} />;
    case "terraform":
      return <Image src={`${vendorIconPrefix}/hashicorp-terraform-48.png`} className={"small-title-icon"} />;
    case "gcp-deploy":
      return <Image src={`${vendorIconPrefix}/icons8-google-cloud-platform-64.png`} className={"small-title-icon"} />;
    case "selenium":
      return <Image src={`${vendorIconPrefix}/selenium-64-261.png`} className={"selenium-icon"} />;
    case "anchor":
      return <Image src={`${vendorIconPrefix}/anchor-96-256.png`} />;
    case "argo":
      return getVendorTitle("argo");
    case "sonar":
    // TODO: Find better icon for Sonar. It looks bad
      return getVendorTitle("sonar");
      // return <Image src={`${vendorIconPrefix}/sonarcube-65-250.png`} className={"sonarqube-icon"} />;
    case "junit":
      return <Image src={`${vendorIconPrefix}/junit-97-172.png`} className={"junit-icon"} />;
    case "nexus":
      return <Image src={`${vendorIconPrefix}/nexus-122-116.png`} />;
    case "spinnaker":
      // TODO: Find better icon for spinnaker. It looks bad
      return getVendorTitle("spinnaker");
    case "teamcity":
      return <Image src={`${vendorIconPrefix}/teamcity-120-120.png`} className={"teamcity-icon"} />;
    case "twistlock":
      return <Image src={`${vendorIconPrefix}/twistlock-64-254.png`} className={"twistlock-icon"} />;
    case "xunit":
      return <Image src={`${vendorIconPrefix}/xunit-60-213.png`} className={"xunit-icon"} />;
    case "ansible":
      return <Image src={`${vendorIconPrefix}/ansible-98-124.png`} className={"ansible-icon"} />;
    case "mongodb":
    case "mongodb_realm":
      return <Image src={`${vendorIconPrefix}/icons8-mongodb-96.png`} />;
    default:
      return <FontAwesomeIcon icon={faWrench} fixedWidth className={"title-fa-icon wrench"} />;
  }
}

export function getLargeVendorIconFromTaskType (s3Bucket, taskType) {
  if (taskType == null) {
    return <></>;
  }

  const vendorIconPrefix = `${s3Bucket}/vendor-logos`;

  switch (taskType) {
    case "jira":
      return <Image src={`${vendorIconPrefix}/jira-74-220.png`} className={"jira-icon"} />;
    case "aws_account":
    case "elastic-beanstalk":
    case "aws-deploy":
      return <Image src={`${vendorIconPrefix}/icons8-amazon-web-services-96.png`} />;
    case "bitbucket":
      return <Image src={`${vendorIconPrefix}/bitbucket-76-75.png`} className={"bitbucket-icon"} />;
    case "docker-push":
      return <Image src={`${vendorIconPrefix}/icons8-docker-96.png`} />;
    case "github":
      return <Image src={`${vendorIconPrefix}/icons8-github-96.png`} />;
    case "gitlab":
      return <Image src={`${vendorIconPrefix}/icons8-gitlab-96.png`} />;
    case "git":
      return <Image src={`${vendorIconPrefix}/icons8-git-96.png`} />;
    case "azure":
    case "azure-devops":
    case "azure-functions":
    case "azure_account":
      return <Image src={`${vendorIconPrefix}/icons8-azure-96.png`} />;
    case "octopus":
      return <FontAwesomeIcon icon={faOctopusDeploy} fixedWidth style={{color: "#0D80D8"}} className={"title-fa-icon"} />;
    case "slack":
      return <Image src={`${vendorIconPrefix}/slack-64-252.png`} className={"slack-icon"} />;
    case "sfdc-configurator":
      return <FontAwesomeIcon icon={faSalesforce} fixedWidth style={{color: "#0D80D8"}} className={"title-fa-icon"} />;
    case "jenkins":
      return <Image src={`${vendorIconPrefix}/jenkins-98-113.png`} className={"jenkins-icon"} />;
    case "teams":
      return <Image src={`${vendorIconPrefix}/icons8-microsoft-teams-48.png`} className={"small-title-icon"} />;
    case "terraform":
      return <Image src={`${vendorIconPrefix}/hashicorp-terraform-48.png`} className={"small-title-icon"} />;
    case "gcp-deploy":
      return <Image src={`${vendorIconPrefix}/icons8-google-cloud-platform-64.png`} className={"small-title-icon"} />;
    case "selenium":
      return <Image src={`${vendorIconPrefix}/selenium-64-261.png`} className={"selenium-icon"} />;
    case "anchor":
      return <Image src={`${vendorIconPrefix}/anchor-96-256.png`} />;
    case "argo":
      return getVendorTitle("argo");
    case "sonar":
      // TODO: Find better icon for Sonar. It looks bad
      return getVendorTitle("sonar");
    // return <Image src={`${vendorIconPrefix}/sonarcube-65-250.png`} className={"sonarqube-icon"} />;
    case "junit":
      return <Image src={`${vendorIconPrefix}/junit-97-172.png`} className={"junit-icon"} />;
    case "nexus":
      return <Image src={`${vendorIconPrefix}/nexus-122-116.png`} />;
    case "spinnaker":
      // TODO: Find better icon for spinnaker. It looks bad
      return getVendorTitle("spinnaker");
    case "teamcity":
      return <Image src={`${vendorIconPrefix}/teamcity-120-120.png`} className={"teamcity-icon"} />;
    case "twistlock":
      return <Image src={`${vendorIconPrefix}/twistlock-64-254.png`} className={"twistlock-icon"} />;
    case "xunit":
      return <Image src={`${vendorIconPrefix}/xunit-60-213.png`} className={"xunit-icon"} />;
    case "ansible":
      return <Image src={`${vendorIconPrefix}/ansible-98-124.png`} className={"ansible-icon"} />;
    default:
      return <FontAwesomeIcon icon={faWrench} fixedWidth className={"title-fa-icon wrench"} />;
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
    case "argo":
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