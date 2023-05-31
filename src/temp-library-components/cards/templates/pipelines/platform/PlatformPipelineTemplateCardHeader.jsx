import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";
import CreateCustomerPipelineButton from "temp-library-components/cards/templates/pipelines/customer/deploy/CreateCustomerPipelineButton";
import useGetCustomerPipelineTemplateModel from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateModel";
import CreatePlatformPipelineButton from "temp-library-components/cards/templates/pipelines/platform/deploy/CreatePlatformPipelineButton";

export default function PlatformPipelineTemplateCardHeader(
  {
    pipelineTemplate,
    activeTemplates,
  }) {
  const {getCustomerPipelineTemplateModel} = useGetCustomerPipelineTemplateModel();
  const customerPipelineTemplateModel = getCustomerPipelineTemplateModel(pipelineTemplate, false);

  if (pipelineTemplate == null) {
    return null;
  }

  return (
    <CardHeaderBase>
      <div className={"d-flex w-100"}>
        <CreatePlatformPipelineButton
          customerPipelineTemplateModel={customerPipelineTemplateModel}
          activeTemplates={activeTemplates}
          buttonSize={"sm"}
          variant={"link"}
          showText={false}
          className={"mx-auto"}
        />
      </div>
    </CardHeaderBase>
  );
}

PlatformPipelineTemplateCardHeader.propTypes = {
  pipelineTemplate: PropTypes.object,
  activeTemplates: PropTypes.array,
};
