import React from "react";
import CardHeaderBase from "temp-library-components/cards/CardHeaderBase";
import PropTypes from "prop-types";
import CreateCustomerPipelineButton from "temp-library-components/cards/templates/pipelines/customer/deploy/CreateCustomerPipelineButton";
import useGetCustomerPipelineTemplateModel from "hooks/workflow/catalog/customer/useGetCustomerPipelineTemplateModel";

export default function CustomerPipelineTemplateCardHeader(
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
        <CreateCustomerPipelineButton
          customerPipelineTemplateModel={customerPipelineTemplateModel}
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

CustomerPipelineTemplateCardHeader.propTypes = {
  pipelineTemplate: PropTypes.object,
  activeTemplates: PropTypes.array,
};
