import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import {pipelineCatalogHelper} from "components/workflow/catalog/pipelineCatalog.helper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function ViewCustomerPipelineTemplateDetailsButton(
  {
    templateId,
    className,
  }) {
  const history = useHistory();

  const showPipelineDetails = () => {
    history.push(pipelineCatalogHelper.getCustomerPipelineTemplateDetailViewLink(templateId));
  };

  return (
    <VanityButtonBase
      className={className}
      normalText={"Details"}
      variant={"outline-secondary"}
      icon={faSearch}
      onClickFunction={showPipelineDetails}
    />
  );
}

ViewCustomerPipelineTemplateDetailsButton.propTypes = {
  templateId: PropTypes.string,
  className: PropTypes.string,
};