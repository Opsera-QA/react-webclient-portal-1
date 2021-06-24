import React from "react";
import PropTypes from "prop-types";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";

function StepToolHelpIcon({type, tool}) {
  // TODO: Alphabetize when adding new help panels
  const getToolHelpPanel = () => {
    switch (tool) {
      case "azure-devops":
      case "jenkins":
      case "junit":
      case "xunit":
      case "sonar":
      case "command-line":
      case "npm":
      case "teamcity":
      case "jmeter":
      case "selenium":
      case "twistlock":
      case "aws-deploy":
      case "gcp-deploy":
      case "s3":
      case "databricks-notebook":
      case "ssh-upload":
      case "spinnaker":
      case "approval":
      case "cypress":
      case "docker-push":
      case "argo":
      case "anchore-scan":
      case "anchore-integrator":
      case "sfdc-configurator":
      case "nexus":
      case "octopus":
      case "terraform":
      case "elastic-beanstalk":
      case "child-pipeline":
      case "mock-step":
      case "parallel-processor":
      case "conditional-operator":
      case "powershell":
      case "dotnet":
      case "nunit":
      case "jfrog_artifactory_docker":
      case "terrascan":
      case "kafka_connect":
      default:
        return null;
    }

  };

  const getHelpComponent = () => {
    if (type === "source") {
      return null;
    }

    if (type === "notification") {
      return null;
    }

    if (type === "step") {
      return null;
    }

    return (getToolHelpPanel());
  };

  return (
    <LaunchHelpIcon className={"mr-2 my-auto"}  helpComponent={getHelpComponent()} />
  );
}

StepToolHelpIcon.propTypes = {
  type: PropTypes.string,
  tool: PropTypes.string,
};

export default StepToolHelpIcon;
