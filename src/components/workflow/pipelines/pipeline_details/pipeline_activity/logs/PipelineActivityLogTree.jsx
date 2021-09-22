import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";
import pipelineActivityHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-helpers";

function PipelineActivityLogTree({ pipelineLogTree, setCurrentRunNumber, setCurrentStepName, currentLogTreePage, setCurrentLogTreePage, currentRunNumber}) {
  const [treeWidget, setTreeWidget] = useState(undefined);
  const [secondaryTreeWidget, setSecondaryTreeWidget] = useState(undefined);
  const [secondaryLogTree, setSecondaryLogTree] = useState(undefined);
  const isMounted = useRef(false);
  const [selectedId, setSelectedId] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;

    if (Array.isArray(pipelineLogTree) && pipelineLogTree.length > 0) {
      setSelectedId(pipelineLogTree[0].id);
      setSecondaryLogTree(pipelineActivityHelpers.getSecondaryTree());
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
      setCurrentRunNumber(treeItem.runNumber);
      setCurrentStepName(treeItem.stepName);
    }
  };

  const onSecondaryTreeItemClick = (treeItem) => {
    setSelectedId(treeItem?.id);
    if (treeWidget) {
      treeWidget?.selection?.remove();
    }

    if (treeItem) {
      setCurrentRunNumber(treeItem.runNumber);
      setCurrentStepName(treeItem.stepName);
    }
  };

  const onPageChange = (newPage) => {
    if (currentLogTreePage !== newPage) {
      setCurrentLogTreePage(newPage);

      if (currentRunNumber !== "latest" && currentRunNumber !== "secondary") {
        setCurrentRunNumber(undefined);
        setCurrentStepName(undefined);
      }

      if (treeWidget) {
        treeWidget.selection.remove();
      }
    }
  };


  if (pipelineLogTree == null) {
    return null;
  }

  // TODO: Use commented out lines after verified by QA
  return (
    <div className={"table-tree mb-3"}>
      {/*<div className={"scroll-y table-tree-with-paginator-and-secondary-tree p-2"}>*/}
      <div className={"scroll-y table-tree-with-paginator p-2"}>
        <TreeBase
          data={pipelineLogTree}
          onItemClick={onMainTreeItemClick}
          setParentWidget={setTreeWidget}
          selectedId={selectedId}
        />
      </div>
      {/*<div className={"secondary-table-tree p-2"}>*/}
      {/*  <TreeBase*/}
      {/*    data={secondaryLogTree}*/}
      {/*    onItemClick={onSecondaryTreeItemClick}*/}
      {/*    setParentWidget={setSecondaryTreeWidget}*/}
      {/*    treeId={"secondary-table-tree"}*/}
      {/*    selectedId={selectedId}*/}
      {/*  />*/}
      {/*</div>*/}
      <div>
        <VanityBottomPaginatorBase widgetData={treeWidget?.data} pageSize={20} onPageChange={onPageChange}/>
      </div>
    </div>
  );
}

PipelineActivityLogTree.propTypes = {
  pipelineLogTree: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  setCurrentStepName: PropTypes.func,
  currentLogTreePage: PropTypes.number,
  setCurrentLogTreePage: PropTypes.func,
  currentRunNumber: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default PipelineActivityLogTree;