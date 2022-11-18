import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import useGetPipelineInstructionsAttributesModel
  from "components/workflow/instructions/hooks/attributes/useGetPipelineInstructionsAttributesModel";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TagManager from "components/common/inputs/tags/TagManager";

export default function PipelineInstructionsAttributesEditorPanel(
  {
    attributes,
    attributesModel,
    setAttributesModel,
    setAttributesData,
  }) {
  const {
    getPipelineInstructionsAttributesModel,
  } = useGetPipelineInstructionsAttributesModel();

  useEffect(() => {
    setAttributesModel({...getPipelineInstructionsAttributesModel(attributes)});
  }, []);

  const updateModelFunction = (fieldName, value) => {
    attributesModel?.setData(fieldName, value);
    setAttributesModel({...attributesModel});
    setAttributesData(attributesModel?.getPersistData());
  };

  const setModelFunction = (newModel) => {
    setAttributesData(newModel?.getPersistData());
    setAttributesModel({...newModel});
  };

  if (attributesModel == null) {
    return null;
  }

  return (
    <>
      <Col xs={12} sm={6}>
        <BooleanToggleInput
          fieldName={"required_post_refresh"}
          dataObject={attributesModel}
          setDataObject={setModelFunction}
        />
      </Col>
      <Col xs={12} sm={6}>
        {/*<BooleanToggleInput*/}
        {/*  fieldName={"data_migration"}*/}
        {/*  dataObject={attributesModel}*/}
        {/*  setDataObject={setModelFunction}*/}
        {/*/>*/}
      </Col>
      <Col xs={12} sm={6}>
        <TextInputBase
          fieldName={"action_owner"}
          dataObject={attributesModel}
          setDataObject={setModelFunction}
        />
      </Col>
      <Col xs={12} sm={6}>
        <TextInputBase
          fieldName={"jira"}
          dataObject={attributesModel}
          setDataObject={setModelFunction}
        />
      </Col>
      <Col xs={12}>
        <TagManager
          type={"environment"}
          fieldName={"environments"}
          allowedTypes={["environment"]}
          dataObject={attributesModel}
          setDataObject={setModelFunction}
        />
      </Col>
      <Col xs={12}>
        <TagManager
          type={"release"}
          fieldName={"release"}
          allowedTypes={["release"]}
          dataObject={attributesModel}
          setDataObject={setModelFunction}
        />
      </Col>
      <Col xs={12} sm={6}>
        <TextInputBase
          fieldName={"point_of_contact"}
          dataObject={attributesModel}
          setDataObject={setModelFunction}
        />
      </Col>
    </>
  );
}

PipelineInstructionsAttributesEditorPanel.propTypes = {
  attributes: PropTypes.object,
  attributesModel: PropTypes.object,
  setAttributesModel: PropTypes.func,
  setAttributesData: PropTypes.func,
};


