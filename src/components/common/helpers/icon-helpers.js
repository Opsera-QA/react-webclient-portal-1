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
      return <Image src={`${vendorIconPrefix}/icons8-jira-64.png`} />;
    case "aws_account":
    case "elastic-beanstalk":
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
      return <FontAwesomeIcon icon={faOctopusDeploy} fixedWidth style={{color: "#0D80D8"}} />;
    case "slack":
      return <Image src={`${vendorIconPrefix}/icons8-slack-80.png`} />;
    case "sfdc-configurator":
      return <FontAwesomeIcon icon={faSalesforce} fixedWidth style={{color: "#0D80D8"}} />;
    case "jenkins":
      return <Image src={`${vendorIconPrefix}/icons8-jenkins-96.png`} />;
    case "teams":
      return <Image src={`${vendorIconPrefix}/icons8-microsoft-teams-48.png`} />;
    case "terraform":
      return <Image src={`${vendorIconPrefix}/hashicorp-terraform-48.png`} />;
    case "gcp-deploy":
      return <Image src={`${vendorIconPrefix}/icons8-google-cloud-platform-64.png`} />;
    case "selenium":
      return <Image src={`${vendorIconPrefix}/icons8-selenium-50.png`} />;
    case "anchor":
      return <Image src={`${vendorIconPrefix}/anchor-96-256.png`} />;
    case "argo":
      return <span className="tool-title-text">{getVendorTitle("argo")}</span>;
    // TODO: Find better icon for Sonar. It looks bad
    // case "sonar":
    //   return <Image src={`${vendorIconPrefix}/sonarcube-65-250.png`} />;
    // case "":
    //   return <Image src={`${vendorIconPrefix}/`} />;
    default:
      return <FontAwesomeIcon icon={faWrench} fixedWidth />;
  }
}

export function getVendorTitle (toolIdentifier) {
  if (toolIdentifier == null) {
    return "";
  }

  switch (toolIdentifier) {
    case "jira":
      return "";
    case "aws_account":
      return "";
    case "elastic-beanstalk":
      return "";
    case "bitbucket":
      return "";
    case "docker-push":
      return "";
    case "github":
      return "";
    case "gitlab":
      return "";
    case "azure":
      return "";
    case "octopus":
      return "";
    case "slack":
      return "";
    case "jenkins":
      return "";
    case "teams":
      return "";
    case "terraform":
      return "";
    case "gcp-deploy":
      return "";
    case "selenium":
      return "";
    case "anchor":
      return "";
    case "argo":
      return "Argo CD";
    case "sonar":
      return "";
    default:
      return "";
  }
}