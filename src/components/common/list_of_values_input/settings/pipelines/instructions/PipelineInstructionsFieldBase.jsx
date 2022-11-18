import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import RichTextField from "components/common/fields/rich_text/RichTextField";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import AccessRoleDisplayer from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayer";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import { faPencilAlt } from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import PipelineInstructionsInlineInput
  from "components/common/list_of_values_input/settings/pipelines/instructions/inline/PipelineInstructionsInlineInput";
import PipelineInstructionsTypeField
  from "components/common/list_of_values_input/settings/pipelines/instructions/type/PipelineInstructionsTypeField";
import InfoText from "components/common/inputs/info_text/InfoText";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetPipelineInstructionsAttributesModel
  from "components/workflow/instructions/hooks/attributes/useGetPipelineInstructionsAttributesModel";
import BooleanField from "components/common/fields/boolean/BooleanField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";

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
    setInEditModeVisibility,
  }) {
  const [inEditMode, setInEditMode] = useState(false);
  const {
    getPipelineInstructionsAttributesModel,
  } = useGetPipelineInstructionsAttributesModel();
  const pipelineInstructionsAttributesModel = {...getPipelineInstructionsAttributesModel(pipelineInstructionsModel?.getData("attributes"))};
  const tags = DataParsingHelper.parseArray(pipelineInstructionsModel?.getData("tags"), []);
  const environmentTags = DataParsingHelper.parseArray(tags?.filter(tag => tag.type === "environment"), []);
  const releaseTags = DataParsingHelper.parseArray(tags?.filter(tag => tag.type === "release"), []);
  pipelineInstructionsAttributesModel?.setData("environments", environmentTags);
  pipelineInstructionsAttributesModel?.setData("release", releaseTags);

  const getAccessRoleDisplayerField = () => {
    if (isLoading !== true && pipelineInstructionsModel != null) {
      return (
        <AccessRoleDisplayer
          className={"mt-3"}
          roles={pipelineInstructionsModel?.getArrayData("roles")}
          noDataMessage={"This set of Pipeline Instructions does not have Access Roles applied, so anyone can see and use it."}
        />
      );
    }
  };

  const toggleEditMode = (editMode) => {
    if (setInEditModeVisibility) {
      setInEditModeVisibility(editMode);
    }

    setInEditMode(editMode);
  };

  const getEditButton = () => {
    if (allowEditing === true && pipelineInstructionsModel?.canUpdate() === true) {
      return (
        <VanityButtonBase
          onClickFunction={() => toggleEditMode(true)}
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
        <>
          <PipelineInstructionsInlineInput
            fieldName={"instructions"}
            pipelineInstructionsModel={pipelineInstructionsModel}
            setPipelineInstructionsModel={setPipelineInstructionsModel}
            instructionsDisplayerMinimumHeight={instructionsDisplayerMinimumHeight}
            instructionsDisplayerMaximumHeight={instructionsDisplayerMaximumHeight}
            isLoading={isLoading}
            setInEditMode={toggleEditMode}
            className={"mt-2"}
          />
          <InfoText
            warningMessage={"Pipeline Instructions must be saved before the changes will take effect"}
          />
        </>
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
          <Col xs={12} md={4}>
            {getAccessRoleDisplayerField()}
            <H5FieldSubHeader subheaderText={"Attributes"} />
            <PipelineInstructionsTypeField
              model={pipelineInstructionsModel}
            />
            <TextFieldBase
              fieldName={"action_owner"}
              dataObject={pipelineInstructionsAttributesModel}
              requireSavedValue={true}
            />
            <TextFieldBase
              fieldName={"point_of_contact"}
              dataObject={pipelineInstructionsAttributesModel}
              requireSavedValue={true}
            />
            <TextFieldBase
              fieldName={"jira"}
              dataObject={pipelineInstructionsAttributesModel}
              requireSavedValue={true}
            />
            <BooleanField
              fieldName={"required_post_refresh"}
              dataObject={pipelineInstructionsAttributesModel}
            />
            <BooleanField
              fieldName={"data_migration"}
              dataObject={pipelineInstructionsAttributesModel}
            />
            <TagField
              fieldName={"environments"}
              dataObject={pipelineInstructionsAttributesModel}
              requireSavedValue={true}
            />
            <TagField
              fieldName={"release"}
              dataObject={pipelineInstructionsAttributesModel}
              requireSavedValue={true}
            />
          </Col>
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

  const getTextField = () => {
    if (showInstructions !== true) {
      return (
        <div className={"d-flex"}>
          <FieldLabelBase
            label={label}
            isLoading={isLoading}
            showLabel={showLabel}
          />
          {getName()}
        </div>
      );
    }
  };

  return (
    <FieldContainer className={className}>
      {getTextField()}
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
  setInEditModeVisibility: PropTypes.func,
};

PipelineInstructionsFieldBase.defaultProps = {
  label: "Pipeline Instructions",
  instructionsDisplayerMinimumHeight: "250px",
  instructionsDisplayerMaximumHeight: "1000px",
};