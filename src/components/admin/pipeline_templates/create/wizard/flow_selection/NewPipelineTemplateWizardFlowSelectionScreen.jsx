import React from "react";
import PropTypes from "prop-types";
import OptionCardBase from "components/common/card/option/OptionCardBase";
import {
  NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS,
} from "components/admin/pipeline_templates/create/wizard/NewPipelineTemplateWizard";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import { faCopy, faPlusCircle } from "@fortawesome/pro-light-svg-icons";

function NewPipelineTemplateWizardFlowSelectionScreen({ setPipelineTemplateWizardScreen }) {
  const onClickFunction = (option) => {
    if (option === "import") {
      setPipelineTemplateWizardScreen(NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS.IMPORT_FROM_PIPELINE);
      return;
    }

    setPipelineTemplateWizardScreen(NEW_PIPELINE_TEMPLATE_WIZARD_SCREENS.PIPELINE_TEMPLATE_EDITOR_PANEL);
  };

  return (
    <div className={"mx-auto mt-5"}>
      <H5FieldSubHeader subheaderText={"How would you like to create a new Pipeline Template?"} className={"mb-3"} />
      <OptionCardBase
        body={
          <div className={"my-auto"}>
            Start from scratch
          </div>
        }
        icon={faPlusCircle}
        onClickFunction={() => onClickFunction("new")}
      />
      <OptionCardBase
        body={
          <div className={"my-auto"}>
            Import settings from an existing Pipeline
          </div>
        }
        icon={faCopy}
        onClickFunction={() => onClickFunction("import")}
      />
    </div>
  );
}

NewPipelineTemplateWizardFlowSelectionScreen.propTypes = {
  setPipelineTemplateWizardScreen: PropTypes.func,
};

export default NewPipelineTemplateWizardFlowSelectionScreen;


