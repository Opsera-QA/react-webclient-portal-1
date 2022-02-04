import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import taskActivityLogHelpers from "components/tasks/activity_logs/taskActivityLog.helpers";
import ExtendedTreeBase from "components/common/tree/ExtendedTreeBase";

function TaskActivityLogTree(
  {
    taskLogTree,
    setCurrentRunNumber,
    setCurrentTaskId,
  }) {
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
        else {
          setSelectedId(treeItem?.id);
        }
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, [taskLogTree]);

  const selectTreeItemFunction = (treeItem) => {
    if (selectedId !== treeItem?.id) {
      setSelectedId(treeItem?.id);
    }

    if (treeItem) {
      if (setCurrentRunNumber != null) {
        setCurrentRunNumber(treeItem.runNumber);
      }

      if (setCurrentTaskId != null) {
        setCurrentTaskId(treeItem.taskId);
      }
    }
  };

  if (Array.isArray(taskLogTree) !== true) {
    return null;
  }

  return (
    <ExtendedTreeBase
      secondaryTreeData={secondaryLogTree}
      mainTreeData={taskLogTree}
      selectTreeItemFunction={selectTreeItemFunction}
      selectedId={selectedId}
    />
  );
}

TaskActivityLogTree.propTypes = {
  taskLogTree: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  setCurrentTaskId: PropTypes.func,
};

export default TaskActivityLogTree;