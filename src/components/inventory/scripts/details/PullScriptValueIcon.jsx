import React from "react";
import PropTypes from "prop-types";
import PullDataIcon from "components/common/icons/general/PullDataIcon";
import {processError} from "utils/helpers";

function PullScriptValueIcon(
  {
    setErrorMessage,
    setIsLoading,
    loadScriptFunction,
    className,
  }) {
  const pullScriptData = async () => {
    try {
      setIsLoading(true);

      if (loadScriptFunction) {
        await loadScriptFunction();
      }
    }
    catch (error) {
      const parsedError = processError(error);
      console.error(`Error Pulling Script From Database: ${parsedError}. Full error below.`);
      console.error(error);
      setErrorMessage(`Error Pulling Script From Database: ${parsedError}`);
    }
    finally {
      setIsLoading(false);
    }
  };

  if (loadScriptFunction == null) {
    return null;
  }

  return (
    <PullDataIcon
      className={className}
      pullDataFunction={pullScriptData}
      tooltipText={"Pull Script from Database"}
    />
  );
}

PullScriptValueIcon.propTypes = {
  setErrorMessage: PropTypes.func,
  setIsLoading: PropTypes.func,
  loadScriptFunction: PropTypes.func,
  className: PropTypes.string,
};

export default PullScriptValueIcon;