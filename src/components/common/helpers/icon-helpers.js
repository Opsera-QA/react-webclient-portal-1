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
      return <Image src={`${vendorIconPrefix}/icons8-jira-64.png`} className={"jira-icon"} />;
    case "aws_account":
    case "elastic-beanstalk":
    case "aws-deploy":
      return <Image src={`${vendorIconPrefix}/icons8-amazon-web-services-96.png`} />;
    case "bitbucket":
      return <Image src={`${vendorIconPrefix}/icons8-bitbucket-96.png`} />;
    case "docker-push":
      return <Image src={`${vendorIconPrefix}/icons8-docker-96.png`} />;
    case "github":
      return <Image src={`${vendorIconPrefix}/icons8-github-96.png`} />;
    case "gitlab":
      return <Image src={`${vendorIconPrefix}/icons8-gitlab-96.png`} />;
    case "azure":
      return <Image src={`${vendorIconPrefix}/cons8-azure-96.png`} />;
    case "octopus":
      return <FontAwesomeIcon icon={faOctopusDeploy} fixedWidth style={{color: "#0D80D8"}} className={"title-fa-icon"} />;
    case "slack":
      return <Image src={`${vendorIconPrefix}/icons8-slack-80.png`} className={"slack-icon"} />;
    case "sfdc-configurator":
      return <FontAwesomeIcon icon={faSalesforce} fixedWidth style={{color: "#0D80D8"}} className={"title-fa-icon"} />;
    case "jenkins":
      return <Image src={`${vendorIconPrefix}/icons8-jenkins-96.png`} />;
    case "teams":
      return <Image src={`${vendorIconPrefix}/icons8-microsoft-teams-48.png`} className={"small-title-icon"} />;
    case "terraform":
      return <Image src={`${vendorIconPrefix}/hashicorp-terraform-48.png`} className={"small-title-icon"} />;
    case "gcp-deploy":
      return <Image src={`${vendorIconPrefix}/icons8-google-cloud-platform-64.png`} className={"small-title-icon"} />;
    case "selenium":
      return <Image src={`${vendorIconPrefix}/icons8-selenium-50.png`} className={"small-title-icon"} />;
    case "anchor":
      return <Image src={`${vendorIconPrefix}/anchor-96-256.png`} />;
    case "argo":
      return getVendorTitle("argo");
    case "sonar":
    // TODO: Find better icon for Sonar. It looks bad
      return getVendorTitle("sonar");
    case "junit":
      return getVendorTitle("junit");
    case "nexus":
      return <Image src={`${vendorIconPrefix}/nexus-122-116.png`} />;
    case "spinnaker":
      // TODO: Find better icon for spinnaker. It looks bad
      return getVendorTitle("spinnaker");
    case "teamcity":
      return <Image src={`${vendorIconPrefix}/TeamCity-120-120.png`} />;
    case "twistlock":
      return getVendorTitle("twistlock");
    case "xunit":
      return getVendorTitle("xunit");


    // base example
    // case "":
    //   return <Image src={`${vendorIconPrefix}/`} />;
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
      return "TeamCity"
    case "twistlock":
      return "Twistlock"
    default:
      return "";
  }
}