import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import RichTextInput from "components/common/inputs/rich_text/RichTextInput";
import PipelineInstructionsTypeSelectInput
  from "components/common/list_of_values_input/settings/pipelines/instructions/type/PipelineInstructionsTypeSelectInput";
import useGetPipelineInstructionsAttributesModel
  from "components/workflow/instructions/hooks/attributes/useGetPipelineInstructionsAttributesModel";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

export default function PipelineInstructionsAttributesEditorPanel(
  {
    attributes,
    setAttributesData,
  }) {
  const [attributesModel, setAttributesModel] = useState(undefined);
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
          setDataObject={setAttributesModel}
        />
      </Col>
      <Col xs={12} sm={6}>
        <TextInputBase
          fieldName={"action_owner"}
          dataObject={attributesModel}
          setDataObject={setAttributesModel}
        />
      </Col>
      <Col xs={12} sm={6}>
        <TextInputBase
          fieldName={"jira"}
          dataObject={attributesModel}
          setDataObject={setAttributesModel}
        />
      </Col>
      <Col xs={12}>
        <TagMultiSelectInput
          fieldName={"environments"}
          dataObject={attributesModel}
          setDataObject={setAttributesModel}
        />
      </Col>
      <Col xs={12}>
        <TagMultiSelectInput
          fieldName={"release"}
          dataObject={attributesModel}
          setDataObject={setAttributesModel}
        />
      </Col>
      <Col xs={12} sm={6}>
        <TextInputBase
          fieldName={"point_of_contact"}
          dataObject={attributesModel}
          setDataObject={setAttributesModel}
        />
      </Col>
    </>
  );
}

PipelineInstructionsAttributesEditorPanel.propTypes = {
  attributes: PropTypes.object,
  setAttributesData: PropTypes.func,
};


