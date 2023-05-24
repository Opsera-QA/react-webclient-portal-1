import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
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
import PipelineTemplateCardHeader from "temp-library-components/cards/templates/pipelines/PipelineTemplateCardHeader";
import {Col} from "react-bootstrap";
import SelectButtonBase from "components/common/buttons/select/base/SelectButtonBase";
import modelHelpers from "components/common/model/modelHelpers";
import {createPipelineFromTemplateMetadata} from "components/workflow/catalog/createPipelineFromTemplate.metadata";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import CreateCustomerPipelineButton from "components/workflow/catalog/private/deploy/CreateCustomerPipelineButton";
import ViewCustomerPipelineTemplateDetailsButton
  from "components/workflow/catalog/private/ViewCustomerPipelineTemplateDetailsButton";

export default function CustomerPipelineTemplateCard(
  {
    pipelineTemplateModel,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
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
    const icon = getLargeVendorIconComponentFromPipeline(pipelineTemplateModel?.getCurrentData());
    const pipelineType = pipelineTemplateModel?.getArrayData("type", 0);

    return (
      <CardIconTitleBar
        formattedIcon={icon}
        iconSize={"4x"}
        iconColor={pipelineType === PIPELINE_TYPES.SALESFORCE ? themeConstants.COLOR_PALETTE.SALESFORCE_BLUE : undefined}
        title={`${pipelineTemplateModel?.getData("name")}`}
        className={"mx-1"}
      />
    );
  };

  const getBody = () => {
    if (disabled === true) {
      return;
    }

    if (selectTemplateFunction) {
      return (
        <Col xs={6} className={"d-flex"}>
          <SelectButtonBase
            setDataFunction={() => selectTemplateFunction(modelHelpers.parseObjectIntoModel(template, createPipelineFromTemplateMetadata))}
            selectOption={template}
            icon={faDraftingCompass}
            selectText={"Select Pipeline"}
            variant={"primary"}
          />
        </Col>
      );
    }

    return (
      <Col xs={6} className={"d-flex"}>
        <CreateCustomerPipelineButton
          customerPipelineTemplateModel={modelHelpers.parseObjectIntoModel(template, createPipelineFromTemplateMetadata)}
          className={"mr-2"}
        />
        <ViewCustomerPipelineTemplateDetailsButton
          templateId={template?._id}
        />
      </Col>
    );
  };

  if (pipelineTemplateModel == null) {
    return undefined;
  }

  return (
    <SelectionIconCard
      onClickFunction={onClickFunction}
      tooltip={tooltip}
      cardHeader={<PipelineTemplateCardHeader />}
      titleBar={getTitleBar()}
      contentBody={<PipelineCardBody pipelineModel={pipelineTemplateModel} />}
      cardFooter={<PipelineCardFooter />}
      selectedOption={selectedOption}
      option={option}
      highlightedBorderColor={themeConstants.RESOURCE_COLORS.PIPELINES}
    />
  );
}

CustomerPipelineTemplateCard.propTypes = {
  pipelineTemplateModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
  activeTemplates: PropTypes.array,
  selectTemplateFunction: PropTypes.func,
  template: PropTypes.object,
};