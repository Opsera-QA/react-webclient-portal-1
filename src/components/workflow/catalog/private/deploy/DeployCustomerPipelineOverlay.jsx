import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {faDraftingCompass, faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import DeployCustomerPipelineButton from "components/workflow/catalog/private/deploy/DeployCustomerPipelineButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";

export default function DeployCustomerPipelineOverlay(
  {
    customerPipelineTemplateModel,
    backButtonFunction,
  }) {
  const [pipelineTemplateModelCopy, setPipelineTemplateModelCopy] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (customerPipelineTemplateModel) {
      setPipelineTemplateModelCopy({...customerPipelineTemplateModel.clone()});
    }
  }, [customerPipelineTemplateModel]);

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase
        className={"bg-white p-3"}
        leftSideButtons={
          <BackButtonBase
            backButtonFunction={backButtonFunction}
          />
        }
      >
        <div className={"d-flex"}>
          <CancelButton
            cancelFunction={closePanelFunction}
            size={"md"}
            className={"mr-2"}
          />
          <DeployCustomerPipelineButton
            templateId={pipelineTemplateModelCopy?.getMongoDbId()}
            pipelineTemplateModel={pipelineTemplateModelCopy}
            disabled={
              pipelineTemplateModelCopy?.isFieldValidV2("name") !== true
              || pipelineTemplateModelCopy?.isFieldValidV2("description") !== true
            }
          />
        </div>
      </ButtonContainerBase>
    );
  };

  if (pipelineTemplateModelCopy == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      showPanel={true}
      titleText={`Create Pipeline From Template`}
      showToasts={true}
      titleIcon={faDraftingCompass}
      closePanel={closePanelFunction}
      buttonContainer={getButtonContainer()}
      bodyClassName={""}
    >
      <div className={"p-3"}>
        <CenteredContentWrapper>
          <H5FieldSubHeader
            icon={faQuestionCircle}
            subheaderText={"Are you sure you would like to create a Pipeline from this template?"}
            className={"my-3"}
          />
        </CenteredContentWrapper>
        <div className={"my-3"}>
          {`Please specify the access rule restrictions for this Pipeline. By default, it copies the access rules applied to the Template.`}
        </div>
        <Row>
          <Col xs={12}>
            <TextInputBase
              dataObject={pipelineTemplateModelCopy}
              setDataObject={setPipelineTemplateModelCopy}
              fieldName={"name"}
            />
          </Col>
          <Col xs={12}>
            <RoleAccessInput
              model={pipelineTemplateModelCopy}
              setModel={setPipelineTemplateModelCopy}
            />
          </Col>
          <Col xs={12}>
            <TextAreaInputBase
              model={pipelineTemplateModelCopy}
              setModel={setPipelineTemplateModelCopy}
              fieldName={"description"}
            />
          </Col>
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

DeployCustomerPipelineOverlay.propTypes = {
  customerPipelineTemplateModel: PropTypes.object,
  backButtonFunction: PropTypes.func,
};