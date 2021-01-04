import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faPlug, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";

function InstallJiraAppButton({ toolData, disable }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isTesting, setIsTesting] = useState(false);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);

  const testConnection = async () => {
    try {
      setIsTesting(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);
      let response = await toolsActions.installJiraApp(toolData.getData("_id"), getAccessToken);

      if (response?.data?.status === 200) {
        setSuccessfulConnection(true);
      }
      else {
        setFailedConnection(true);
      }
    }
    catch (error) {
      setFailedConnection(true);
    }
    finally {
      setIsTesting(false);
    }
  }

  const getVariant = () => {
    if (successfulConnection) {
      return "success";
    }

    if (failedConnection) {
      return "danger";
    }

    return ("secondary");
  };

  const getLabel = () => {
    if (isTesting) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Installing</span>);
    }

    if (failedConnection) {
      return (<span><FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" fixedWidth/>Installation Failed!</span>);
    }

    if (successfulConnection) {
      return (<span><FontAwesomeIcon icon={faPlug} className="mr-2" fixedWidth/>Installation Succeeded!</span>);
    }

    return (<span><FontAwesomeIcon icon={faPlug} fixedWidth className="mr-2"/>Install Jira App</span>);
  };

  return (
    <div className="px-2">
      <Button size="sm" variant={getVariant()} disabled={isTesting || disable} onClick={() => testConnection()}>
        {getLabel()}
      </Button>
    </div>
  );
}

InstallJiraAppButton.propTypes = {
  toolData: PropTypes.object,
  disable: PropTypes.bool,
};

InstallJiraAppButton.defaultProps = {
  disable: false,
}

export default InstallJiraAppButton;