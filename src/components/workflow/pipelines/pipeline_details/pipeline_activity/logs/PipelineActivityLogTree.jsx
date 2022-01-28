import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";
import pipelineLogHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineLog.helpers";

function PipelineActivityLogTree(
  {
    pipelineLogTree,
    setCurrentRunNumber,
    setCurrentStepName,
  }) {
  const [treeWidget, setTreeWidget] = useState(undefined);
  const [secondaryTreeWidget, setSecondaryTreeWidget] = useState(undefined);
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

  const onMainTreeItemClick = (treeItem) => {
    setSelectedId(treeItem?.id);

    if (secondaryTreeWidget) {
      secondaryTreeWidget?.selection?.remove();
    }

    if (treeItem) {
      setCurrentStepName(treeItem?.stepName);
      setCurrentRunNumber(treeItem?.runNumber);
    }
  };

  const onSecondaryTreeItemClick = (treeItem) => {
    setSelectedId(treeItem?.id);
    if (treeWidget) {
      treeWidget?.selection?.remove();
    }

    if (treeItem) {
      setCurrentStepName(treeItem?.stepName);
      setCurrentRunNumber(treeItem?.runNumber);
    }
  };

  if (pipelineLogTree == null) {
    return null;
  }

  // TODO: Make this generic when doing the task logs work
  return (
    <div className={"table-tree mb-3"}>
      <div className={"scroll-y hide-x-overflow table-tree-with-paginator-and-secondary-tree"}>
        <TreeBase
          data={pipelineLogTree}
          onItemClick={onMainTreeItemClick}
          setParentWidget={setTreeWidget}
          selectedId={selectedId}
        />
      </div>
      <div className={"secondary-table-tree"}>
        <TreeBase
          data={secondaryLogTree}
          onItemClick={onSecondaryTreeItemClick}
          setParentWidget={setSecondaryTreeWidget}
          treeId={"secondary-table-tree"}
          selectedId={selectedId}
        />
      </div>
      <div>
        <VanityBottomPaginatorBase
          widgetData={treeWidget?.data}
          pageSize={20}
        />
      </div>
    </div>
  );
}

PipelineActivityLogTree.propTypes = {
  pipelineLogTree: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  setCurrentStepName: PropTypes.func,
};

export default PipelineActivityLogTree;