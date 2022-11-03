import React from "react";
import PropTypes from "prop-types";
import useGetPipelineInstructionModelById
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionModelById";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import RichTextField from "components/common/fields/rich_text/RichTextField";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import AccessRoleDisplayer from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayer";

export default function PipelineInstructionsFieldBase(
  {
    pipelineInstructionsId,
    className,
    label,
    showInstructions,
    instructionsDisplayerMinimumHeight,
    instructionsDisplayerMaximumHeight,
  }) {
  const {
    pipelineInstructionsModel,
    isLoading,
    error,
  } = useGetPipelineInstructionModelById(
    pipelineInstructionsId,
    false,
  );

  const getAccessRoleDisplayerField = () => {
    if (isLoading !== true) {
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

  const getPipelineInstructionsField = () => {
    if (
      (isLoading === true || pipelineInstructionsModel !== null)
      && showInstructions === true
      && error == null
    ) {
      return (
        <Row>
          <Col xs={12} lg={8}>
            <RichTextField
              fieldName={"instructions"}
              model={pipelineInstructionsModel}
              customTitle={pipelineInstructionsModel?.getData("name")}
              minimumHeight={instructionsDisplayerMinimumHeight}
              maximumHeight={instructionsDisplayerMaximumHeight}
              isLoading={isLoading}
            />
          </Col>
          {getAccessRoleDisplayerField()}
        </Row>
      );
    }
  };

  const getName = () => {
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
};

PipelineInstructionsFieldBase.defaultProps = {
  label: "Pipeline Instructions",
  instructionsDisplayerMinimumHeight: "250px",
  instructionsDisplayerMaximumHeight: "1000px",
};