import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {useHistory} from "react-router-dom";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function OverviewLandingPipelinesDataBlock({ownedPipelinesCount}) {
  const history = useHistory();

  const loadPipelines = () => {
    history.push("/workflow/owner");
  };

  return (
    <DataBlockBoxContainer
      onClickFunction={loadPipelines}
      showBorder={true}
    >
      <TwoLineScoreDataBlock
        className={"p-3"}
        score={ownedPipelinesCount}
        subtitle={"My Pipelines"}
      />
    </DataBlockBoxContainer>
  );
}

OverviewLandingPipelinesDataBlock.propTypes = {
  ownedPipelinesCount: PropTypes.number,
};

export default OverviewLandingPipelinesDataBlock;
