import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  PIPELINE_TYPES,
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import PipelineCardFooter from "temp-library-components/cards/pipelines/PipelineCardFooter";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";
import {getLargeVendorIconComponentFromPipeline} from "components/common/helpers/icon-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PlatformPipelineTemplateCardBody
  from "temp-library-components/cards/templates/pipelines/platform/PlatformPipelineTemplateCardBody";
import PlatformPipelineTemplateCardHeader
  from "temp-library-components/cards/templates/pipelines/platform/PlatformPipelineTemplateCardHeader";

// TODO: Rewrite to use model
export default function PlatformPipelineTemplateCard(
  {
    pipelineTemplateModel,
    tooltip,
    selectedOption,
    activeTemplates,
    selectTemplateFunction,
    template,
  }) {
  const { themeConstants } = useComponentStateReference();
  const [disabled, setDisabled] = useState(false);
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    if (isOpseraAdministrator !== true && (template.readOnly || (template.singleUse === true && activeTemplates.includes(template?._id?.toString())))) {
      setDisabled(true);
    }
  }, [template, activeTemplates]);

  const getTitleBar = () => {
    const icon = getLargeVendorIconComponentFromPipeline(template);
    const pipelineType = DataParsingHelper.parseNestedString(template, "type.0", undefined);

    return (
      <CardIconTitleBar
        formattedIcon={icon}
        iconSize={"4x"}
        iconColor={pipelineType === PIPELINE_TYPES.SALESFORCE ? themeConstants.COLOR_PALETTE.SALESFORCE_BLUE : undefined}
        title={`${template?.name}`}
        className={"mx-1"}
      />
    );
  };

  if (template == null) {
    return undefined;
  }

  return (
    <SelectionIconCard
      onClickFunction={selectTemplateFunction}
      tooltip={tooltip}
      cardHeader={
        <PlatformPipelineTemplateCardHeader
          pipelineTemplate={template}
          activeTemplates={activeTemplates}
        />
      }
      titleBar={getTitleBar()}
      contentBody={
        <PlatformPipelineTemplateCardBody template={template} />
      }
      cardFooter={<PipelineCardFooter />}
      selectedOption={selectedOption}
      option={template}
      highlightedBorderColor={themeConstants.RESOURCE_COLORS.PIPELINES}
    />
  );
}

PlatformPipelineTemplateCard.propTypes = {
  pipelineTemplateModel: PropTypes.object,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  activeTemplates: PropTypes.array,
  selectTemplateFunction: PropTypes.func,
  template: PropTypes.object,
};