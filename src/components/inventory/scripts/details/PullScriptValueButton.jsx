import React from "react";
import PropTypes from "prop-types";
import {processError} from "utils/helpers";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import useButtonState from "hooks/general/buttons/useButtonState";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function PullScriptValueButton(
  {
    setErrorMessage,
    setIsLoading,
    loadScriptFunction,
    className,
  }) {
  const { buttonState, buttonStateFunctions } = useButtonState();
  const pullScriptData = async () => {
    try {
      setIsLoading(true);
      buttonStateFunctions.setBusyState();

      if (loadScriptFunction) {
        await loadScriptFunction();
      }
    }
    catch (error) {
      const parsedError = processError(error);
      console.error(`Error Pulling Script From Database: ${parsedError}. Full error below.`);
      console.error(error);
      setErrorMessage(`Error Pulling Script From Database: ${parsedError}`);
      buttonStateFunctions.setErrorState();
    }
    finally {
      setIsLoading(false);
      buttonStateFunctions.setReadyState();
    }
  };

  if (loadScriptFunction == null) {
    return null;
  }

  return (
    <VanityButtonBase
      buttonState={buttonState}
      onClickFunction={pullScriptData}
      icon={faFileDownload}
      className={className}
      buttonSize={"sm"}
      variant={"outline-primary"}
    />
  );
}

PullScriptValueButton.propTypes = {
  setErrorMessage: PropTypes.func,
  setIsLoading: PropTypes.func,
  loadScriptFunction: PropTypes.func,
  className: PropTypes.string,
};
