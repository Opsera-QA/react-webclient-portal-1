import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";
import CreatePlatformPipelineButton from "temp-library-components/cards/templates/pipelines/platform/deploy/CreatePlatformPipelineButton";
import useGetPlatformPipelineTemplateModel from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateModel";

export default function PlatformPipelineTemplateCardHeader(
  {
    pipelineTemplate,
    activeTemplates,
    visible,
  }) {
  const {getPlatformPipelineTemplateModel} = useGetPlatformPipelineTemplateModel();
  const platformPipelineTemplateModel = getPlatformPipelineTemplateModel(pipelineTemplate, false);

  if (pipelineTemplate == null || visible === false) {
    return null;
  }

  return (
    <CardHeaderBase>
      <div className={"d-flex w-100"}>
        <CreatePlatformPipelineButton
          platformPipelineTemplateModel={platformPipelineTemplateModel}
          activeTemplates={activeTemplates}
          buttonSize={"sm"}
          variant={"link"}
          showText={false}
          className={"mx-auto"}
          buttonClassName={"py-0"}
        />
      </div>
    </CardHeaderBase>
  );
}

PlatformPipelineTemplateCardHeader.propTypes = {
  pipelineTemplate: PropTypes.object,
  activeTemplates: PropTypes.array,
  visible: PropTypes.bool,
};
