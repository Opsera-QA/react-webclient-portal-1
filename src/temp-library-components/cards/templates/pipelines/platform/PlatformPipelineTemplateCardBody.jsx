import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import SelectButtonBase from "components/common/buttons/select/base/SelectButtonBase";
import modelHelpers from "components/common/model/modelHelpers";
import {createPipelineFromTemplateMetadata} from "components/workflow/catalog/createPipelineFromTemplate.metadata";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import {truncateString} from "components/common/helpers/string-helpers";
import CreatePlatformPipelineButton from "temp-library-components/cards/templates/pipelines/platform/deploy/CreatePlatformPipelineButton";
import ViewPlatformPipelineTemplateDetailsButton
  from "components/workflow/catalog/platform/ViewPlatformPipelineTemplateDetailsButton";

export default function PlatformPipelineTemplateCardBody(
  {
    template,
    disabled,
    selectTemplateFunction,
  }) {
  const getBody = () => {
    if (disabled === true) {
      return;
    }

    if (selectTemplateFunction) {
      return (
        <Col xs={12} className={"mt-3 px-0"}>
          <SelectButtonBase
            setDataFunction={() => selectTemplateFunction(modelHelpers.parseObjectIntoModel(template, createPipelineFromTemplateMetadata))}
            selectOption={template}
            icon={faDraftingCompass}
            selectText={"Select Pipeline"}
            variant={"primary"}
            className={"w-100"}
          />
        </Col>
      );
    }

    return (
      <>
        <Col xs={6} className={"mt-3 px-0"}>
          <CreatePlatformPipelineButton
            platformPipelineTemplateModel={modelHelpers.parseObjectIntoModel(template, createPipelineFromTemplateMetadata)}
            className={"mr-1"}
          />
        </Col>
        <Col xs={6} className={"mt-3 px-0"}>
          <ViewPlatformPipelineTemplateDetailsButton
            templateId={template?._id}
            className={"ml-1"}
          />
        </Col>
      </>
    );
  };

  if (template == null) {
    return undefined;
  }

  return (
    <div className={"mb-1"}>
      <Row className={"small"}>
        <Col xs={12}>
          <div
            className={"w-100 d-flex mt-2"}
            style={{
              minHeight: "50px",
              maxHeight: "50px",
            }}
          >
            {truncateString(template?.description, 150)}
          </div>
        </Col>
      </Row>
      <Row className={"mx-0"}>
        {getBody()}
      </Row>
    </div>
  );
}

PlatformPipelineTemplateCardBody.propTypes = {
  template: PropTypes.object,
  disabled: PropTypes.bool,
  selectTemplateFunction: PropTypes.func,
};
