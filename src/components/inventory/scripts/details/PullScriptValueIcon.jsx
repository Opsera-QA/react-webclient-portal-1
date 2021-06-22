import React from "react";
import PropTypes from "prop-types";
import PullDataIcon from "components/common/icons/general/PullDataIcon";
import {processError} from "utils/helpers";

function PullScriptValueIcon({ scriptModel, setErrorMessage, setIsLoading, className }) {
  const pullScriptData = async () => {
    try {
      setIsLoading(true);
      await scriptModel.pullScriptFromDb();
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

  if (scriptModel == null || scriptModel?.isNew()) {
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
  scriptModel: PropTypes.object,
  setErrorMessage: PropTypes.func,
  setIsLoading: PropTypes.func,
  className: PropTypes.string,
};

export default PullScriptValueIcon;