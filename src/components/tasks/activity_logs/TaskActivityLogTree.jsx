import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";
import taskActivityLogHelpers from "components/tasks/activity_logs/taskActivityLog.helpers";

function TaskActivityLogTree(
  {
    taskLogTree,
    setCurrentRunNumber,
    setCurrentTaskId,
  }) {
  const [treeWidget, setTreeWidget] = useState(undefined);
  const [secondaryTreeWidget, setSecondaryTreeWidget] = useState(undefined);
  const [secondaryLogTree] = useState(taskActivityLogHelpers.getSecondaryTree());
  const [selectedId, setSelectedId] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (Array.isArray(taskLogTree) && taskLogTree.length > 0 && selectedId == null) {
      const treeItem = taskLogTree[0];

      if (treeItem) {
        const items = treeItem?.items;

        if (Array.isArray(items) && items.length > 0) {
          setSelectedId(items[0]?.id);
        }
      }
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
      setCurrentTaskId(treeItem.taskId);
    }
  };

  const onSecondaryTreeItemClick = (treeItem) => {
    setSelectedId(treeItem?.id);
    if (treeWidget) {
      treeWidget?.selection?.remove();
    }

    if (treeItem) {
      setCurrentRunNumber(undefined);
      setCurrentTaskId(treeItem.taskId);
    }
  };

  if (Array.isArray(taskLogTree) !== true) {
    return null;
  }

  return (
    <div className={"table-tree mb-3"}>
      <div className={"scroll-y hide-x-overflow table-tree-with-paginator-and-secondary-tree"}>
        <TreeBase
          data={taskLogTree}
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

TaskActivityLogTree.propTypes = {
  taskLogTree: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  setCurrentTaskId: PropTypes.func,
};

export default TaskActivityLogTree;