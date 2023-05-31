import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
  faQuestionCircle,
} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeployCustomerPipelineButton
  from "temp-library-components/cards/templates/pipelines/customer/deploy/DeployCustomerPipelineButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";

export default function DeployCustomerPipelineForm(
  {
    customerPipelineTemplateModel,
    backButtonFunction,
    setButtonContainer
  }) {
  const [pipelineTemplateModelCopy, setPipelineTemplateModelCopy] =
    useState(undefined);
  const {toastContext} = useComponentStateReference();

  useEffect(() => {
    if (customerPipelineTemplateModel) {
      setPipelineTemplateModelCopy({
        ...customerPipelineTemplateModel.clone(),
      });
    }
  }, [customerPipelineTemplateModel]);

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <div className={"mt-auto bg-white p-3"}>
          {getButtonContainer()}
        </div>
      );
    }
  }, [pipelineTemplateModelCopy]);

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase
        className={"bg-white p-3"}
        leftSideButtons={
          <BackButtonBase backButtonFunction={backButtonFunction}/>
        }
      >
        <div className={"d-flex"}>
          <DeployCustomerPipelineButton
            templateId={pipelineTemplateModelCopy?.getMongoDbId()}
            pipelineTemplateModel={pipelineTemplateModelCopy}
            disabled={
              !pipelineTemplateModelCopy?.isFieldValidV2("name") ||
              !pipelineTemplateModelCopy?.isFieldValidV2("description")
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
    <div className={"p-3"}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          icon={faQuestionCircle}
          subheaderText={
            "Are you sure you would like to create a Pipeline from this template?"
          }
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
  );
}

DeployCustomerPipelineForm.propTypes = {
  customerPipelineTemplateModel: PropTypes.object,
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
};
