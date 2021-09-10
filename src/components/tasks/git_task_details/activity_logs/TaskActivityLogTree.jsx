import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";

function TaskActivityLogTree({ taskLogTree, setCurrentRunNumber, setCurrentTaskName, currentLogTreePage, setCurrentLogTreePage}) {
  const [treeWidget, setTreeWidget] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [taskLogTree]);

  const onTreeItemClick = (treeItem) => {
    if (treeItem) {
      setCurrentRunNumber(treeItem.runNumber);
      setCurrentTaskName(treeItem.taskName);
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
      setCurrentTaskName(undefined);

      if (treeWidget) {
        treeWidget.selection.remove();
      }
    }
  };


  if (taskLogTree == null) {
    return null;
  }

  return (
    <div className={"table-tree mb-3"}>
      <div className={"scroll-y table-tree-with-paginator p-2"}>
        <TreeBase data={taskLogTree} onItemClick={onTreeItemClick} setParentWidget={setTreeWidget}/>
      </div>
      <div>
        <VanityBottomPaginatorBase widgetData={treeWidget?.data} pageSize={20} onPageChange={onPageChange}/>
      </div>
    </div>
  );
}

TaskActivityLogTree.propTypes = {
  taskLogTree: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  setCurrentTaskName: PropTypes.func,
  currentLogTreePage: PropTypes.number,
  setCurrentLogTreePage: PropTypes.func
};

export default TaskActivityLogTree;