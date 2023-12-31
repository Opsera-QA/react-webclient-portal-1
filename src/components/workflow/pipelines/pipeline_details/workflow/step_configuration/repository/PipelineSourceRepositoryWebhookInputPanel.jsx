import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import PipelineSourceWebhookTriggerDetailsPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceWebhookTriggerDetailsPanel";
import PipelineSourceRepositorySecretInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySecretInput";
import IconBase from "components/common/icons/IconBase";
import {faClipboardList, faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import RegisterSourceRepositoryHookButton
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/RegisterSourceRepositoryHookButton";
import {NODE_API_ORCHESTRATOR_SERVER_URL} from "config";

function PipelineSourceRepositoryWebhookInputPanel({
  className,
  model,
  setModel,
  disabled,
  pipeline,
  savePipelineFunction,
}) {
  const triggerUrl = `${NODE_API_ORCHESTRATOR_SERVER_URL}/hooks/${pipeline?.owner}/${pipeline?._id}/source`;

  const getDynamicText = () => {
    if (model?.getData("dynamicSettings") !== true) {
      return (
        <div className={"warning-text-alt ml-2"}>
          <IconBase
            icon={faTriangleExclamation}
            className={"mr-1"}
          />
          {`Please enable Dynamic Settings on this Pipeline to use this feature.`}
        </div>
      );
    }
  };

  const helpText = () => {
    return (
      <div>
        Please note, Dynamic Settings are required for this feature to work.
      </div>
    );
  };

  const getDynamicFields = () => {
    if (model?.getData("trigger_active") === true) {
      return (
        <>
          <PipelineSourceWebhookTriggerDetailsPanel
            model={model}
            setModel={setModel}
            className={"mt-4"}
          />
          <div className={"d-flex mt-4"}>
            <div className={"text-muted"}>
              Dynamic Branch Switching
            </div>
            {getDynamicText()}
          </div>
          <BooleanToggleInput
            dataObject={model}
            setDataObject={setModel}
            fieldName={"enableBranchSwitch"}
            customInfoText={getDynamicText()}
            helpTooltip={helpText()}
            disabled={!model?.getData("dynamicSettings")}
          />
          <PipelineSourceRepositorySecretInput
            model={model}
            setModel={setModel}
            visible={model.getData("service") !== "bitbucket"}
          />
          <div className={"text-muted mt-4"}>
            Settings
          </div>
          <div className={"d-flex"}>
            <div>
              <div className={"d-flex"}>
                <FieldLabelBase label={"Content Type"} />
                <div>
                  {`application/json`}
                </div>
              </div>
              <div className={"d-flex"}>
                <FieldLabelBase label={"SSL Verification"} />
                <div>
                  {`enabled`}
                </div>
              </div>
              {/* Note from Todd, keep webhook url at the bottom*/}
              <div className={"d-flex my-auto"}>
                <FieldLabelBase
                  label={"Webhook URL"}
                />
                <div>
                  {triggerUrl}
                </div>
                <CopyToClipboardIconBase
                  className={"ml-2"}
                  copyString={triggerUrl}
                  copyIcon={faClipboardList}
                />
              </div>
            </div>
          </div>
          <RegisterSourceRepositoryHookButton
            model={model}
            savePipelineFunction={savePipelineFunction}
            pipeline={pipeline}
            className={"mt-2"}
          />
        </>
      );
    }
  };

  const enableWebhookTrigger = (fieldName, newValue) => {
    const newModel = { ...model };
    newModel?.setData("trigger_active", newValue);
    newModel?.setData("isPushEvent", newValue === true);
    newModel?.setData("isPrEvent", false);
    setModel({ ...newModel });
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <H5FieldSubHeader
          className={"text-muted"}
          subheaderText={"Webhook"}
        />
        <BooleanToggleInput
          dataObject={model}
          setDataFunction={enableWebhookTrigger}
          setDataObject={setModel}
          fieldName={"trigger_active"}
          disabled={disabled}
          className={"ml-3"}
          showLabel={false}
        />
      </div>
      <div>
        Allow this pipeline to be started by a webhook event based on the Repository settings selected in the Repository tab. Once enabled, copy the webhook URL supplied into your repository or use the Register Webhook button.
      </div>
      {getDynamicFields()}
    </div>
  );
}

PipelineSourceRepositoryWebhookInputPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  savePipelineFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  pipeline: PropTypes.object,
};

export default PipelineSourceRepositoryWebhookInputPanel;
