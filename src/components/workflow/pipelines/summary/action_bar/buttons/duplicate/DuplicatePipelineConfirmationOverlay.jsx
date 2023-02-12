import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {faCopy} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";
import DuplicatePipelineButton
  from "components/workflow/pipelines/summary/action_bar/buttons/duplicate/DuplicatePipelineButton";
import modelHelpers from "components/common/model/modelHelpers";
import {
  duplicatePipelineMetadata
} from "components/workflow/pipelines/summary/action_bar/buttons/duplicate/duplicatePipeline.metadata";

export default function DuplicatePipelineConfirmationOverlay(
  {
    pipelineModel,
  }) {
  const [duplicatePipelineModel, setDuplicatePipelineModel] = useState(undefined);
  const {
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    if (pipelineModel) {
      const data = {
        _id: pipelineModel?.getMongoDbId(),
        name: pipelineModel?.getData("name"),
        roles: pipelineModel?.getData("roles"),
        description: pipelineModel?.getData("description"),
      };

      setDuplicatePipelineModel({...modelHelpers.parseObjectIntoModel(data, duplicatePipelineMetadata)});
    }
  }, []);

  const {
    toastContext,
  } = useComponentStateReference();

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (duplicatePipelineModel == null || PipelineRoleHelper.canPublishPipelineToCatalog(userData, pipelineModel?.getCurrentData()) !== true) {
    return null;
  }

  return (
    <CenterOverlayContainer
      showCloseButton={false}
      titleText={`Duplicate Pipeline?`}
      showToasts={true}
      titleIcon={faCopy}
      closePanel={closePanelFunction}
    >
      <div className={"p-3"}>
        <H5FieldSubHeader
          subheaderText={"Are you sure you would like to duplicate this Pipeline?"}
          className={"mb-2"}
        />
        <div className={"mb-1"}>
          {`Please specify a Pipeline Name, any notes you would like the Pipeline to have, and the Access Rule restrictions for this Pipeline. By default, it copies these fields from the original Pipeline.`}
        </div>
        <Row>
          <Col xs={12}>
            <TextInputBase
              fieldName={"name"}
              dataObject={duplicatePipelineModel}
              setDataObject={setDuplicatePipelineModel}
            />
          </Col>
          <Col xs={12}>
            <RoleAccessInput
              model={duplicatePipelineModel}
              setModel={setDuplicatePipelineModel}
            />
          </Col>
          <Col xs={12}>
            <TextAreaInputBase
              fieldName={"description"}
              model={duplicatePipelineModel}
              setModel={setDuplicatePipelineModel}
            />
          </Col>
        </Row>
        <ButtonContainerBase className={"pt-3"}>
          <CancelButton
            cancelFunction={closePanelFunction}
            size={"md"}
            className={"ml-3"}
          />
          <DuplicatePipelineButton
            duplicatePipelineModel={duplicatePipelineModel}
            className={"ml-3"}
          />
        </ButtonContainerBase>
      </div>
    </CenterOverlayContainer>
  );
}

DuplicatePipelineConfirmationOverlay.propTypes = {
  pipelineModel: PropTypes.object,
};
