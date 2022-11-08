import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import RichTextField from "components/common/fields/rich_text/RichTextField";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import AccessRoleDisplayer from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayer";
import RichTextInput from "components/common/inputs/rich_text/RichTextInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import CancelButton from "components/common/buttons/CancelButton";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import { faPencilAlt } from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";

export default function PipelineInstructionsFieldBase(
  {
    pipelineInstructionsId,
    className,
    label,
    showInstructions,
    instructionsDisplayerMinimumHeight,
    instructionsDisplayerMaximumHeight,
    showLabel,
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    isLoading,
    error,
    allowEditing,
  }) {
  const [inEditMode, setInEditMode] = useState(false);

  const getAccessRoleDisplayerField = () => {
    if (isLoading !== true && pipelineInstructionsModel != null) {
      return (
        <Col xs={12} md={4}>
          <AccessRoleDisplayer
            className={"mt-3"}
            roles={pipelineInstructionsModel?.getArrayData("roles")}
            noDataMessage={"This set of Pipeline Instructions does not have Access Roles applied, so anyone can see and use it."}
          />
        </Col>
      );
    }
  };

  const handleSave = async () => {
    const response = await pipelineInstructionsModel?.saveModel();
    setInEditMode(false);
    return response;
  };

  const handleCancel = () => {
    pipelineInstructionsModel?.resetData();
    setPipelineInstructionsModel(pipelineInstructionsModel);
    setInEditMode(false);
  };

  const getSaveButtonContainer = () => {
    return (
      <ButtonContainerBase>
        <CancelButton
          className={"mr-2"}
          cancelFunction={handleCancel}
        />
        <StandaloneSaveButton
          saveFunction={handleSave}
          type={"Pipeline Instructions"}
        />
      </ButtonContainerBase>
    );
  };

  const getEditButton = () => {
    if (allowEditing === true && pipelineInstructionsModel?.canUpdate() === true) {
      return (
        <VanityButtonBase
          onClickFunction={() => setInEditMode(true)}
          buttonSize={"sm"}
          normalText={"Edit Pipeline Instructions"}
          icon={faPencilAlt}
          variant={"outline-primary"}
        />
      );
    }
  };

  const getPipelineInstructionsComponent = () => {
    if (setPipelineInstructionsModel && allowEditing === true && inEditMode === true && pipelineInstructionsModel?.canUpdate() === true) {
      return (
        <RichTextInput
          fieldName={"instructions"}
          model={pipelineInstructionsModel}
          setModel={setPipelineInstructionsModel}
          customTitle={pipelineInstructionsModel?.getData("name")}
          minimumHeight={instructionsDisplayerMinimumHeight}
          maximumHeight={instructionsDisplayerMaximumHeight}
          isLoading={isLoading}
          titleRightSideButton={getSaveButtonContainer()}
        />
      );
    }

    return (
      <RichTextField
        titleRightSideButtons={getEditButton()}
        fieldName={"instructions"}
        model={pipelineInstructionsModel}
        customTitle={pipelineInstructionsModel?.getData("name")}
        minimumHeight={instructionsDisplayerMinimumHeight}
        maximumHeight={instructionsDisplayerMaximumHeight}
        isLoading={isLoading}
      />
    );
  };

  const getPipelineInstructionsField = () => {
    if (isLoading === true && pipelineInstructionsModel == null && showInstructions !== false) {
      return (
        <Row>
          <Col xs={12} lg={8}>
            <FieldContainer>
              <InfoContainer
                isLoading={true}
                minimumHeight={instructionsDisplayerMinimumHeight}
                maximumHeight={instructionsDisplayerMaximumHeight}
                titleText={"Loading Pipeline Instructions"}
              />
            </FieldContainer>
          </Col>
        </Row>
      );
    }

    if (
      (isLoading === true || pipelineInstructionsModel != null)
      && showInstructions !== false
    ) {

      return (
        <Row>
          <Col xs={12} lg={8}>
            {getPipelineInstructionsComponent()}
          </Col>
          {getAccessRoleDisplayerField()}
        </Row>
      );
    }
  };

  const getName = () => {
    if (showLabel === false) {
      return null;
    }

    if (isMongoDbId(pipelineInstructionsId) !== true) {
      return "";
    }

    if (isLoading === true) {
      return pipelineInstructionsId;
    }

    if (error) {
      return (
        <div className={"error-text-alt"}>
          {
            `Error pulling Pipeline Instructions with ID [${pipelineInstructionsId}]. 
          The Pipeline Instructions may have been deleted or its access rules may have changed.`
          }
        </div>
      );
    }

    return pipelineInstructionsModel?.getData("name");
  };

  return (
    <FieldContainer className={className}>
      <div className={"d-flex"}>
        <FieldLabelBase
          label={label}
          isLoading={isLoading}
          showLabel={showLabel}
        />
        {getName()}
      </div>
      {getPipelineInstructionsField()}
    </FieldContainer>
  );
}

PipelineInstructionsFieldBase.propTypes = {
  showInstructions: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  pipelineInstructionsId: PropTypes.string,
  instructionsDisplayerMinimumHeight: PropTypes.string,
  instructionsDisplayerMaximumHeight: PropTypes.string,
  showLabel: PropTypes.bool,
  pipelineInstructionsModel: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  allowEditing: PropTypes.bool,
  setPipelineInstructionsModel: PropTypes.func,
};

PipelineInstructionsFieldBase.defaultProps = {
  label: "Pipeline Instructions",
  instructionsDisplayerMinimumHeight: "250px",
  instructionsDisplayerMaximumHeight: "1000px",
};