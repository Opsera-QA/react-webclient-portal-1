import React, { useState } from "react";
import PropTypes from "prop-types";
import {faPlus, faShareAll} from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import pipelineActions from "components/workflow/pipeline-actions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import {useHistory} from "react-router-dom";

export default function DeployCustomerPipelineButton(
  {
    disabled,
    className,
    buttonSize,
    templateId,
    roles,
  }) {
  const history = useHistory();
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    cancelTokenSource,
    toastContext,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  const handleDeployPipelineFunction = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      const result = await pipelineActions.deployTemplateV2(
        getAccessToken,
        cancelTokenSource,
        templateId,
        roles,
      );
      const newPipelineId = result?.data?._id;
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      toastContext.clearOverlayPanel();

      if (isMongoDbId(newPipelineId) === true) {
        history.push(pipelineHelper.getDetailViewLink(newPipelineId));
      }
    } catch (error) {
      if (isMounted?.current === true) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showSystemErrorToast(error, "There was an issue deploying this Pipeline Template");
      }
    }
  };

  return (
    <VanityButtonBase
      className={className}
      icon={faPlus}
      disabled={disabled}
      onClickFunction={handleDeployPipelineFunction}
      buttonSize={buttonSize}
      buttonState={buttonState}
      variant={"success"}
      normalText={"Create Pipeline"}
      errorText={"Failed to Create Pipeline"}
      successText={"Successfully Created Pipeline"}
      busyText={"Creating Pipeline"}
    />
  );
}

DeployCustomerPipelineButton.propTypes = {
  templateId: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  buttonSize: PropTypes.string,
  roles: PropTypes.array,
};