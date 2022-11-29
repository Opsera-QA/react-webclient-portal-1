import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import {pipelineCatalogHelper} from "components/workflow/catalog/pipelineCatalog.helper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ViewPlatformPipelineTemplateDetailsButton(
  {
    templateId,
    className,
  }) {
  const history = useHistory();
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  const showPipelineDetails = () => {
    if (isOpseraAdministrator === true) {
      history.push(`/admin/templates/details/${templateId}`);
    } else {
      history.push(pipelineCatalogHelper.getPlatformPipelineTemplateDetailViewLink(templateId));
    }
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

ViewPlatformPipelineTemplateDetailsButton.propTypes = {
  templateId: PropTypes.string,
  className: PropTypes.string,
};