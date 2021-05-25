import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";

function PipelineActivityLogTree({ pipelineLogTree, setCurrentRunNumber, setCurrentStepName, onPageChange}) {
  const [treeWidget, setTreeWidget] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [pipelineLogTree]);

  const onTreeItemClick = (treeItem) => {
    if (treeItem) {
      setCurrentRunNumber(treeItem.runNumber);
      setCurrentStepName(treeItem.stepName);
    }
  };

  if (pipelineLogTree == null) {
    return null;
  }

  return (
    <div className={"table-tree mb-3"}>
      <div className={"scroll-y table-tree-with-paginator p-2"}>
        <TreeBase data={pipelineLogTree} onItemClick={onTreeItemClick} setParentWidget={setTreeWidget}/>
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
  onPageChange: PropTypes.func
};

export default PipelineActivityLogTree;