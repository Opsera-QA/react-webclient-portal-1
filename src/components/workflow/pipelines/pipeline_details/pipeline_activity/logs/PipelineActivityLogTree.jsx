import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import pipelineLogHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineLog.helpers";
import ExtendedTreeBase from "components/common/tree/ExtendedTreeBase";

function PipelineActivityLogTree(
  {
    pipelineLogTree,
    setCurrentRunNumber,
    setCurrentStepName,
    pipelineRunCount,
  }) {
  const [secondaryLogTree] = useState(pipelineLogHelpers.getSecondaryTree());
  const isMounted = useRef(false);
  const [selectedId, setSelectedId] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;

    if (Array.isArray(pipelineLogTree) && pipelineLogTree.length > 0 && selectedId == null) {
      let treeItem = pipelineLogTree[0];
      setSelectedId(treeItem?.id);
    }

    return () => {
      isMounted.current = false;
    };
  }, [pipelineLogTree]);

  useEffect(() => {
    if (isMounted.current === true && pipelineRunCount && Array.isArray(pipelineLogTree) && pipelineLogTree.length > 0) {
      let treeItem = pipelineLogTree[0];
      setSelectedId(treeItem?.id);
    }
  }, [pipelineRunCount]);

  const selectTreeItemFunction = (treeItem) => {
    setSelectedId(treeItem?.id);

    if (treeItem) {
      setCurrentStepName(treeItem?.stepName);
      setCurrentRunNumber(treeItem?.runNumber);
    }
  };

  if (pipelineLogTree == null || secondaryLogTree == null) {
    return null;
  }

  return (
    <ExtendedTreeBase
      selectedId={selectedId}
      selectTreeItemFunction={selectTreeItemFunction}
      mainTreeData={pipelineLogTree}
      secondaryTreeData={secondaryLogTree}
    />
  );
}

PipelineActivityLogTree.propTypes = {
  pipelineLogTree: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  setCurrentStepName: PropTypes.func,
  pipelineRunCount: PropTypes.number,
};

export default PipelineActivityLogTree;