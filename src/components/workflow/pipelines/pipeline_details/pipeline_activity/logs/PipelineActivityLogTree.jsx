import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";

function PipelineActivityLogTree({ pipelineLogTree, setCurrentRunNumber, setCurrentStepName, currentLogTreePage, setCurrentLogTreePage}) {
  const [treeWidget, setTreeWidget] = useState(undefined);
  const isMounted = useRef(false);
  const [selectedId, setSelectedId] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;

    if (Array.isArray(pipelineLogTree) && pipelineLogTree.length > 1) {
      setSelectedId(pipelineLogTree[1].id);
    }

    return () => {
      isMounted.current = false;
    };
  }, [pipelineLogTree]);

  const onTreeItemClick = (treeItem) => {
    if (treeItem) {
      setCurrentRunNumber(treeItem.runNumber);
      setCurrentStepName(treeItem.stepName);
      setSelectedId(treeItem?.id);
    }
  };

  const onPageChange = (newPage) => {
    if (currentLogTreePage !== newPage) {
      setCurrentLogTreePage(newPage);

      // TODO: Do we want to select the top item when changing pages?
      //  This will require allowing selection to be passed into tree
      // const newTopIndex = newPage * 20;
      // const topItem = pipelineActivityTreeData[newTopIndex];
      setCurrentRunNumber(undefined);
      setCurrentStepName(undefined);

      if (treeWidget) {
        treeWidget.selection.remove();
      }
    }
  };


  if (pipelineLogTree == null) {
    return null;
  }

  return (
    <div className={"table-tree mb-3"}>
      <div className={"scroll-y table-tree-with-paginator p-2"}>
        <TreeBase
          data={pipelineLogTree}
          onItemClick={onTreeItemClick}
          setParentWidget={setTreeWidget}
          selectedId={selectedId}
        />
      </div>
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
  setCurrentLogTreePage: PropTypes.func
};

export default PipelineActivityLogTree;