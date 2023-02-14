import React, { useState } from "react";
import PropTypes from "prop-types";
import {faShareAll} from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import {
  customerPipelineTemplateCatalogActions
} from "components/workflow/catalog/private/customerPipelineTemplateCatalog.actions";

export default function PublishPipelineToPrivateCatalogButton(
  {
    disabled,
    className,
    buttonSize,
    publishPipelineModel,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    cancelTokenSource,
    toastContext,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  const handlePublishPipelineFunction = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await customerPipelineTemplateCatalogActions.publishPipelineToCustomerCatalog(
        getAccessToken,
        cancelTokenSource,
        publishPipelineModel,
      );
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      toastContext.showSystemInformationToast("You have published a copy of this pipeline template in your organization's private catalog for others in your organization to use.  Overall settings of the pipeline are shared but no tools or activity logs have been duplicated in this process.");
      toastContext.clearOverlayPanel();
    } catch (error) {
      if (isMounted?.current === true) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showSystemErrorToast(error, "There was an issue publishing this Pipeline");
      }
    }
  };

  return (
    <VanityButtonBase
      className={className}
      icon={faShareAll}
      disabled={disabled}
      onClickFunction={handlePublishPipelineFunction}
      buttonSize={buttonSize}
      buttonState={buttonState}
      normalText={"Publish Pipeline to Private Catalog"}
      errorText={"Failed to Publish Pipeline to Private Catalog"}
      successText={"Successfully Published Pipeline to Private Catalog"}
      busyText={"Publishing Pipeline to Private Catalog"}
    />
  );
}

PublishPipelineToPrivateCatalogButton.propTypes = {
  publishPipelineModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  buttonSize: PropTypes.string,
};