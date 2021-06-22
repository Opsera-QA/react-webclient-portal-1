import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faLaptopMedical } from "@fortawesome/pro-light-svg-icons";
import { faExclamationTriangle } from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import { AuthContext } from "contexts/AuthContext";
import OctopusStepActions from "../octopus-step-actions";
import InputContainer from "../../../../../../../../common/inputs/InputContainer";

function ValidateProjectButton({ toolDataDto, disable }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isTesting, setIsTesting] = useState(false);
  const [successfulValidation, setSuccessfulValidation] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);

  const testConnection = async () => {
    try {
      setIsTesting(true);
      setSuccessfulValidation(false);
      setFailedConnection(false);
      let response;

      if (toolDataDto != null) {
        response = await OctopusStepActions.validateProjectName(
          toolDataDto.getData("octopusToolId"),
          toolDataDto.getData("spaceId"),
          toolDataDto.getData("projectName"),
          toolDataDto,
          getAccessToken
        );
      }

      if (response && response.data != null && response.data.status === "Success") {
        setSuccessfulValidation(true);
      } else {
        setFailedConnection(true);
      }
    } catch (error) {
      setFailedConnection(true);
    } finally {
      setIsTesting(false);
    }
  };

  const getVariant = () => {
    if (successfulValidation) {
      return "success";
    }

    if (failedConnection) {
      return "danger";
    }

    return "secondary";
  };

  const getLabel = () => {
    if (isTesting) {
      return (
        <span>
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth />
          {`Validating Project Name`}
        </span>
      );
    }

    if (failedConnection) {
      return (
        <span>
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" fixedWidth />
          {`Name Already in Use`}
        </span>
      );
    }

    if (successfulValidation) {
      return (
        <span>
          <FontAwesomeIcon icon={faLaptopMedical} className="mr-2" fixedWidth />
          Project Name Validated
        </span>
      );
    }

    return (
      <span>
        <FontAwesomeIcon icon={faLaptopMedical} fixedWidth className="mr-2" />
        {`Validate Project Name`}
      </span>
    );
  };

  return (
    <InputContainer>
      <label></label>
      <div className="mt-6">
        <Button size="sm" variant={getVariant()} disabled={isTesting || disable} onClick={() => testConnection()}>
          {getLabel()}
        </Button>
      </div>
    </InputContainer>
  );
}

ValidateProjectButton.propTypes = {
  toolDataDto: PropTypes.object,
  disable: PropTypes.bool,
  toolName: PropTypes.string,
};

ValidateProjectButton.defaultProps = {
  disable: false,
};

export default ValidateProjectButton;
