import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import {
  pipelineRuntimeSettingsMetadata
} from "components/workflow/pipelines/action_controls/start/pipelineRuntimeSettings.metadata";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import CancelOverlayButton from "components/common/buttons/cancel/overlay/CancelOverlayButton";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faArrowRight, faDraftingCompass, faWandMagic} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

export default function PipelineActionRuntimeSettingsSelectionOverlay(
  {
    pipeline,
    handleRunPipelineFunction,
  }) {
  const [runtimeSettingsModel, setRuntimeSettingsModel] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    const runtimeSettings = {
      repository: DataParsingHelper.parseNestedString(pipeline, "workflow.source.repoId"),
      branch: DataParsingHelper.parseNestedString(pipeline, "workflow.source.branch"),
      toolId: DataParsingHelper.parseNestedString(pipeline, "workflow.source.accountId"),
      workspace: DataParsingHelper.parseNestedString(pipeline, "workflow.source.workspace"),
    };
    setRuntimeSettingsModel({...modelHelpers.parseObjectIntoModel(runtimeSettings, pipelineRuntimeSettingsMetadata)});
  }, [pipeline]);

  const getWelcomeText = () => {
    return (
      <div className={"mt-3 mb-4"}>
        <CenteredContentWrapper>
          <div className={"mx-auto"}>
            <OpseraInfinityLogo/>
          </div>
        </CenteredContentWrapper>
        <CenteredContentWrapper>
          <div className={"mx-auto mt-3"}>
            <div className={"focusText"}>Please complete these steps in order to start your Pipeline.</div>
          </div>
        </CenteredContentWrapper>
      </div>
    );
  };

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const handlePipelineRun = () => {
    handleRunPipelineFunction(runtimeSettingsModel?.getData("branch"));
    closePanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"p-3"}>
        <VanityButtonBase
          icon={faArrowRight}
          className={"mr-2"}
          normalText={"Run Pipeline"}
          variant={"success"}
          onClickFunction={handlePipelineRun}
          disabled={hasStringValue(runtimeSettingsModel?.getData("branch")) !== true}
        />
        <CancelOverlayButton className={"ml-2"}/>
      </ButtonContainerBase>
    );
  };

  if (pipeline == null || runtimeSettingsModel == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={`New Pipeline Run`}
      titleIcon={faDraftingCompass}
      showCloseButton={false}
      buttonContainer={getButtonContainer()}
    >
      <div className={"m-3"}>
        {getWelcomeText()}
        <H5FieldSubHeader
          subheaderText={"Pipeline Run: Pre Run Tasks"}
        />
        <div>Please select the branch you wish to use during this Pipeline run</div>
        <Row>
          <Col xs={3} />
          <Col xs={6}>
            <ToolNameField
              model={runtimeSettingsModel}
              fieldName={"toolId"}
            />
          </Col>
          <Col xs={3} />
          <Col xs={3} />
          <Col xs={6}>
            <TextFieldBase
              dataObject={runtimeSettingsModel}
              fieldName={"repository"}
            />
          </Col>
          <Col xs={3} />
          <Col xs={3} />
          <Col xs={6}>
            <GitBranchInput
              fieldName={"branch"}
              service={runtimeSettingsModel?.getData("service")}
              gitToolId={runtimeSettingsModel?.getData("toolId")}
              workspace={runtimeSettingsModel?.getData("workspace")}
              repoId={runtimeSettingsModel?.getData("repository")}
              dataObject={runtimeSettingsModel}
            />
          </Col>
          <Col xs={3} />
          <Col xs={3} />
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

PipelineActionRuntimeSettingsSelectionOverlay.propTypes = {
  pipeline: PropTypes.object,
  handleRunPipelineFunction: PropTypes.func,
};