import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import DeployPlatformPipelineButton from "components/workflow/catalog/platform/deploy/DeployPlatformPipelineButton";

export default function DeployPlatformPipelineOverlay(
  {
    platformPipelineTemplateModel,
  }) {
  const [pipelineTemplateModelCopy, setPipelineTemplateModelCopy] = useState(undefined);

  useEffect(() => {
    if (platformPipelineTemplateModel) {
      setPipelineTemplateModelCopy({...platformPipelineTemplateModel.clone()});
    }
  }, [platformPipelineTemplateModel]);

  const {
    toastContext,
  } = useComponentStateReference();

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"bg-white"}>
        <div className={"m-3 d-flex"}>
          <CancelButton
            cancelFunction={closePanelFunction}
            size={"md"}
            className={"mr-2"}
          />
          <DeployPlatformPipelineButton
            templateId={pipelineTemplateModelCopy?.getMongoDbId()}
            roles={pipelineTemplateModelCopy?.getData("roles")}
          />
        </div>
      </ButtonContainerBase>
    );
  };

  return (
    <CenterOverlayContainer
      showPanel={true}
      titleText={`Create Pipeline From Template`}
      showToasts={true}
      titleIcon={faDraftingCompass}
      closePanel={closePanelFunction}
      buttonContainer={getButtonContainer()}
    >
      <div className={"p-3"}>
        <H5FieldSubHeader
          subheaderText={"Are you sure you would like to create a Pipeline from this template?"}
          className={"mb-2"}
        />
        <div className={"my-3"}>
          {`Please specify the access rule restrictions for this Pipeline. By default, it copies the access rules applied to the Template.`}
        </div>
        <Row>
          <Col xs={12}>
            <RoleAccessInput
              model={pipelineTemplateModelCopy}
              setModel={setPipelineTemplateModelCopy}
            />
          </Col>
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

DeployPlatformPipelineOverlay.propTypes = {
  platformPipelineTemplateModel: PropTypes.object,
};