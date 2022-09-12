import React, { useContext } from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  pipelineTemplateIdentifierConstants
} from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";

export default function PipelineTemplateIdentifierHelpOverlay() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearInfoOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleIcon={faDraftingCompass}
      titleText={`Pipeline Template Identifiers`}
    >
      <div className={"m-3"}>
        <H5FieldSubHeader
          subheaderText={"These are the identifiers currently in use in the application."}
        />
        <div>Please ensure there is only one template per identifier. The value (without quotation marks) is used in the application, not the capitalized ENUM Key</div>
        <StandaloneJsonField
          json={pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIERS}
        />
      </div>
    </CenterOverlayContainer>
  );
}