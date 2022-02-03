import {hasStringValue} from "components/common/helpers/string-helpers";

const taskActivityLogHelpers = {};

taskActivityLogHelpers.constructTopLevelTreeBasedOnNameAndRunCount = (tasks) => {
  let newTree = [];

  if (Array.isArray(tasks) && tasks.length > 0) {
    for (let index = 1; index <= tasks.length; index++) {
      const task = tasks[index];
      const runCountTree = taskActivityLogHelpers.constructRunCountTree(task);

      if (Array.isArray(runCountTree) && runCountTree.length > 0) {
        const topLevelTreeItem = createTopLevelTreeItem(task, runCountTree);

        if (topLevelTreeItem) {
          newTree.push(topLevelTreeItem);
        }
      }
    }
  }


  newTree[0].opened = true;
  return sortTopLevelTree(newTree);
};

taskActivityLogHelpers.constructRunCountTree = (task) => {
  const runCountTree = [];
  const runCount = task?.run_count;

  if (typeof runCount === "number" && runCount > 0) {
    for (let runNumber = 1; runNumber <= runCount; runNumber++) {
      const newTreeItem = createRunCountLevelTreeItem(task, runNumber);

      if (newTreeItem) {
        runCountTree.push(newTreeItem);
      }
    }
  }

  return sortRunCountTree(runCountTree);
};

const createRunCountLevelTreeItem = (task, runNumber, items = []) => {
  if (typeof runNumber === "number") {
    return (
      {
        id: `${task?._id}-${runNumber}`,
        taskId: task?._id,
        runNumber: runNumber,
        value: `Run ${runNumber}`,
        items: items,
        icon: {
          "folder": "fal fa-layer-group opsera-primary",
          "openFolder": "fal fa-layer-group opsera-yellow",
          "file": "fal fa-layer-group opsera-primary"
        }
      }
    );
  }
};

const createTopLevelTreeItem = (task, items = []) => {
  if (hasStringValue(task?._id)) {
    return (
      {
        id: task?._id,
        taskId: task?._id,
        runNumber: undefined,
        value: `${task?.name}`,
        items: items,
        icon: {
          "folder": "fal fa-layer-group opsera-primary",
          "openFolder": "fal fa-layer-group opsera-yellow",
          "file": "fal fa-layer-group opsera-primary"
        }
      }
    );
  }
};

const sortRunCountTree = (tree) => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }

  let newTree = [...tree];

  // Sort tree by run number
  newTree.sort((treeItem1, treeItem2) => {
    const runNumber1 = treeItem1?.runNumber;
    const runNumber2 = treeItem2?.runNumber;

    const parsedRunNumber1 = parseInt(runNumber1);
    const parsedRunNumber2 = parseInt(runNumber2);

    if (typeof parsedRunNumber1 !== "number" && typeof parsedRunNumber2 !== "number") {
      return 0;
    }

    if (typeof parsedRunNumber1 !== "number") {
      return 1;
    }

    if (typeof parsedRunNumber2 !== "number") {
      return -1;
    }

    return parsedRunNumber2 - parsedRunNumber1;
  });

  return newTree;
};

const sortTopLevelTree = (tree) => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }

  let newTree = [...tree];

  if (newTree.length > 0) {
    // Sort alphabetically
    newTree.sort((treeItem1, treeItem2) => {
      const taskName1 = treeItem1?.taskName?.toUpperCase();
      const taskName2 = treeItem2?.taskName?.toUpperCase();

      if (taskName1 < taskName2) {
        return -1;
      }

      if (taskName1 > taskName2) {
        return 1;
      }

      return 0;
    });

    if (Array.isArray(newTree) && newTree?.length > 0) {
      newTree[0].opened = true;
      newTree[0].selected = 1;
    }
  }

  return newTree;
};

taskActivityLogHelpers.getSecondaryTree = () => {
  return [
    {
      id: "latest",
      taskId: undefined,
      runNumber: "latest",
      value: "Latest Logs",
      items: [],
      type: undefined,
      name: undefined,
      icon: {
        "folder": "fal fa-layer-group opsera-primary",
        "openFolder": "fal fa-layer-group opsera-yellow",
        "file": "fal fa-layer-group opsera-primary"
      }
    },
    {
      id: "secondary",
      taskId: undefined,
      runNumber: "secondary",
      value: "Secondary Logs",
      items: [],
      type: undefined,
      name: undefined,
      icon: {
        "folder": "fal fa-layer-group opsera-primary",
        "openFolder": "fal fa-layer-group opsera-yellow",
        "file": "fal fa-layer-group opsera-primary"
      }
    },
  ];
};

export default taskActivityLogHelpers;