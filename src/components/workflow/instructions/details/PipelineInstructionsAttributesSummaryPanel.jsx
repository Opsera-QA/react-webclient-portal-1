import React from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import useGetPipelineInstructionsAttributesModel
  from "components/workflow/instructions/hooks/attributes/useGetPipelineInstructionsAttributesModel";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function PipelineInstructionsAttributesSummaryPanel(
  {
    attributes,
    tags,
  }) {
  const {
    getPipelineInstructionsAttributesModel,
  } = useGetPipelineInstructionsAttributesModel();
  const pipelineInstructionsAttributesModel = getPipelineInstructionsAttributesModel(attributes);
  const environmentTags = DataParsingHelper.parseArray(tags?.filter(tag => tag.type === "environment"), []);
  const releaseTags = DataParsingHelper.parseArray(tags?.filter(tag => tag.type === "release"), []);
  pipelineInstructionsAttributesModel?.setData("environments", environmentTags);
  pipelineInstructionsAttributesModel?.setData("release", releaseTags);

  if (pipelineInstructionsAttributesModel == null) {
    return <></>;
  }

  return (
    <>
      <Col lg={6}>
        <BooleanField
          dataObject={pipelineInstructionsAttributesModel}
          fieldName={"required_post_refresh"}
        />
      </Col>
      <Col lg={6}>
        <BooleanField
          dataObject={pipelineInstructionsAttributesModel}
          fieldName={"data_migration"}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          fieldName={"action_owner"}
          dataObject={pipelineInstructionsAttributesModel}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          fieldName={"point_of_contact"}
          dataObject={pipelineInstructionsAttributesModel}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          fieldName={"jira"}
          dataObject={pipelineInstructionsAttributesModel}
        />
      </Col>
      <Col lg={12}>
        <TagField
          dataObject={pipelineInstructionsAttributesModel}
          fieldName={"release"}
        />
      </Col>
      <Col lg={12}>
        <TagField
          dataObject={pipelineInstructionsAttributesModel}
          fieldName={"environments"}
        />
      </Col>
    </>
  );
}

PipelineInstructionsAttributesSummaryPanel.propTypes = {
  attributes: PropTypes.object,
  tags: PropTypes.array,
};
