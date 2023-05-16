import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {faSearchPlus} from "@fortawesome/pro-light-svg-icons";

export default function ViewPipelineButton(
  {
    pipelineId,
    buttonText,
    buttonSize,
    variant,
    className,
  }) {
  const history = useHistory();
  const { toastContext } = useComponentStateReference();

  const handleLoadFunction = async () => {
    history.push(pipelineHelper.getDetailViewLink(pipelineId));
    toastContext.clearOverlayPanel();
  };

  if (isMongoDbId(pipelineId) == null) {
    return null;
  }

  return (
    <VanityButtonBase
      onClickFunction={handleLoadFunction}
      normalText={buttonText}
      variant={variant}
      buttonSize={buttonSize}
      className={className}
      icon={faSearchPlus}
    />
  );
}

ViewPipelineButton.propTypes = {
  pipelineId: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.string,
  buttonSize: PropTypes.string,
  className: PropTypes.string,
};

ViewPipelineButton.defaultProps = {
  buttonText: "View Pipeline",
};
