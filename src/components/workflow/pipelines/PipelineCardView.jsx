import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import {useHistory} from "react-router-dom";
import {hasStringValue} from "components/common/helpers/string-helpers";
import PipelineCardBase from "temp-library-components/cards/pipelines/PipelineCardBase";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import pipelineMetadata from "@opsera/definitions/constants/pipelines/pipeline.metadata";

export default function PipelineCardView({ pipelines, loadData, isLoading }) {
  const history = useHistory();

  const loadPipeline = (pipeline) => {
    const pipelineLink = pipelineHelper.getDetailViewLink(pipeline._id);

    if (hasStringValue(pipelineLink) === true) {
      history.push(pipelineLink);
    }
  };

  const getPipelineCard = (pipeline) => {
    return (
      <PipelineCardBase
        pipelineModel={new Model({ ...pipeline }, pipelineMetadata, false)}
        onClickFunction={() => loadPipeline(pipeline)}
        tooltip={"Click to view Pipeline"}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      cards={
        <VerticalCardViewBase
          data={pipelines}
          getCardFunction={getPipelineCard}
        />
      }
    />
  );
}

PipelineCardView.propTypes = {
  pipelines: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
