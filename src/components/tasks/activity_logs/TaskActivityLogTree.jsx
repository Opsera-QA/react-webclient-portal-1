import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";
import taskActivityHelpers from "components/tasks/activity_logs/task-activity-helpers";

function TaskActivityLogTree({ taskLogTree, setCurrentRunNumber, setCurrentTaskName, loadData, taskActivityFilterModel, currentLogTreePage, setCurrentLogTreePage}) {
  const [treeWidget, setTreeWidget] = useState(undefined);
  const [secondaryTreeWidget, setSecondaryTreeWidget] = useState(undefined);
  const [secondaryLogTree, setSecondaryLogTree] = useState(undefined);
  const [selectedId, setSelectedId] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const currentIndex = currentLogTreePage * 20;
    if (Array.isArray(taskLogTree) && taskLogTree.length > currentIndex) {
      setSelectedId(taskLogTree[currentIndex].id);
      setSecondaryLogTree(taskActivityHelpers.getSecondaryTree());
    }

    return () => {
      isMounted.current = false;
    };
  }, [taskLogTree]);

  const onMainTreeItemClick = (treeItem) => {
    setSelectedId(treeItem?.id);
    if (secondaryTreeWidget) {
      secondaryTreeWidget?.selection?.remove();
    }

    if (treeItem) {
      setCurrentRunNumber(treeItem.runNumber);
      setCurrentTaskName(treeItem.taskName);
    }
  };

  const onSecondaryTreeItemClick = (treeItem) => {
    setSelectedId(treeItem?.id);
    if (treeWidget) {
      treeWidget?.selection?.remove();
    }

    if (treeItem) {
      setCurrentRunNumber(treeItem.runNumber);
      setCurrentTaskName(treeItem.taskName);
    }
  };

  const onPageChange = (newPage) => {
    if (currentLogTreePage !== newPage) {
      setCurrentLogTreePage(newPage);
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
      {/*<div className={"scroll-y hide-x-overflow table-tree-with-paginator-and-secondary-tree p-2"}>*/}
      <div className={"scroll-y hide-x-overflow table-tree-with-paginator p-2"}>
        <TreeBase
          data={taskLogTree}
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

TaskActivityLogTree.propTypes = {
  taskLogTree: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  setCurrentTaskName: PropTypes.func,
  currentLogTreePage: PropTypes.number,
  setCurrentLogTreePage: PropTypes.func,
  loadData: PropTypes.func,
  taskActivityFilterModel: PropTypes.object,
};

export default TaskActivityLogTree;