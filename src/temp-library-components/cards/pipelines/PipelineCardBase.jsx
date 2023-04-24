import PropTypes from "prop-types";
import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  PIPELINE_TYPES,
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import PipelineCardFooter from "temp-library-components/cards/pipelines/PipelineCardFooter";
import PipelineCardHeader from "temp-library-components/cards/pipelines/PipelineCardHeader";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";
import {getLargeVendorIconComponentFromPipeline} from "components/common/helpers/icon-helpers";
import PipelineCardBody from "temp-library-components/cards/pipelines/PipelineCardBody";

// TODO: Rewrite
export default function PipelineCardBase(
  {
    pipelineModel,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    const icon = getLargeVendorIconComponentFromPipeline(pipelineModel?.getCurrentData());
    const pipelineType = pipelineModel?.getArrayData("type", 0);
    // const icon = pipelineTypeConstants.getIconForPipelineType(pipelineType);

    return (
      <CardIconTitleBar
        // icon={icon}
        formattedIcon={icon}
        iconSize={"4x"}
        iconColor={pipelineType === PIPELINE_TYPES.SALESFORCE ? themeConstants.COLOR_PALETTE.SALESFORCE_BLUE : undefined}
        title={`${pipelineModel?.getData("name")}`}
        className={"mx-1"}
      />
    );
  };

  if (pipelineModel == null) {
    return undefined;
  }

  return (
    <SelectionIconCard
      onClickFunction={onClickFunction}
      tooltip={tooltip}
      cardHeader={<PipelineCardHeader pipelineModel={pipelineModel} />}
      titleBar={getTitleBar()}
      contentBody={<PipelineCardBody pipelineModel={pipelineModel} />}
      cardFooter={<PipelineCardFooter />}
      selectedOption={selectedOption}
      option={option}
      highlightedBorderColor={themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE}
    />
  );
}

PipelineCardBase.propTypes = {
  pipelineModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
};