import pipelineLogHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineLog.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";

const taskActivityLogHelpers = {};

taskActivityLogHelpers.constructSingleTaskTree = (pipelineLogData) => {
  let newTree = [];

  if (Array.isArray(pipelineLogData) && pipelineLogData.length > 0) {
    pipelineLogData.forEach((log) => {
      const runNumber = log.run_count ? log.run_count : "logs";
      const runNumberText = log.run_count ? `Run ${log.run_count}` : "Logs";
      const taskType = log.type ? log.type : "Other Type";
      const taskName = log.name ? log.name : "No Name";
      const existingTreeItem = newTree.find((treeItem) => treeItem.id === runNumber);

      if (existingTreeItem == null) {
        const currentValue = {
          id: runNumber,
          runNumber: runNumber,
          value: runNumberText,
          items: [],
          type: taskType,
          name: taskName,
          icon: {
            "folder": "fal fa-layer-group opsera-primary",
            "openFolder": "fal fa-layer-group opsera-yellow",
            "file": "fal fa-layer-group opsera-primary"
          }
        };

        newTree.push(currentValue);
      }
    });
  }

  if (newTree?.length > 0) {
    // Sort by run number
    newTree.sort((treeItem1, treeItem2) => {
      const task1RunNumber = treeItem1?.runNumber;
      const task2RunNumber = treeItem2?.runNumber;

      if (task1RunNumber > task2RunNumber) {
        return -1;
      }

      if (task1RunNumber < task2RunNumber) {
        return 1;
      }

      return 0;
    });

    newTree[0].opened = true;
    newTree[0].selected = 1;
  }

  return newTree;
};

taskActivityLogHelpers.getSecondaryTree = () => {
  return [
    {
      id: "latest",
      taskId: "latest",
      runNumber: undefined,
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
      taskId: "secondary",
      runNumber: null,
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

taskActivityLogHelpers.constructTopLevelTreeBasedOnNameAndRunCount = (tasks) => {
  let newTree = [];

  if (Array.isArray(tasks) && tasks.length > 0) {
    for (let index = 1; index <= tasks.length; index++) {
      const task = tasks[index];
      const runCount = task?.run_count;
      const runCountItems = [];

      if (runCount > 0) {
        for (let runNumber = 1; runNumber <= runCount; runNumber++) {
          const newTreeItem = createRunCountLevelTreeItem(task, runNumber);

          if (newTreeItem) {
            runCountItems.push(newTreeItem);
          }
        }
      }

      if (Array.isArray(runCountItems) && runCountItems.length > 0) {
        const sortedTree = sortRunCountTree(runCountItems);
        const topLevelTreeItem = createTopLevelTreeItem(task, sortedTree);

        if (topLevelTreeItem) {
          newTree.push(topLevelTreeItem);
        }
      }
    }
  }


  newTree[0].opened = true;

  return newTree;
  // TODO: Sort the tree alphabetically
  // return sortTree(newTree);
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


  console.log("task id not found: " + JSON.stringify(task));
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

  newTree[0].opened = true;
  newTree[0].selected = 1;

  return newTree;
};

taskActivityLogHelpers.constructAllTasksTree = (pipelineLogData) => {
  let newTree = [];

  if (Array.isArray(pipelineLogData) && pipelineLogData.length > 0) {
    pipelineLogData.forEach((log) => {
      if (!log.name || log.name === "") {
        return;
      }

      const runNumber = log.run_count ? log.run_count : "logs";
      const runNumberText = log.run_count ? `Run ${log.run_count}` : "Logs";
      const taskName = log.name ? log.name : "No Name";

      let currentValue = newTree.find((entry) => {
        return entry.id === taskName;
      });

      if (currentValue != null) {
        const index = newTree.indexOf(currentValue);
        const existingStep = currentValue.items.find((item) => {
          return item.id === `${runNumber}-${taskName}`;
        });

        if (existingStep == null) {
          let currentItems = currentValue.items;
          currentItems.push({
            id: `${runNumber}-${taskName}`,
            runNumber: runNumber,
            taskName: taskName,
            value: runNumberText,
            icon: {
              "folder": "fal fa-tasks opsera-primary",
              "openFolder": "fal fa-tasks opsera-yellow",
              "file": "fal fa-tasks opsera-primary"
            }
          });

          // Force Sort Run Count Descending
          currentItems.sort((treeItem1, treeItem2) => {
            const runNumber1 = treeItem1.runNumber;
            const runNumber2 = treeItem2?.runNumber;

            if (runNumber1 === "logs" && runNumber2 === "logs") {
              return 0;
            }

            if (runNumber1 === "logs") {
              return 1;
            }

            if (runNumber2 === "logs") {
              return -1;
            }

            const parsedRunNumber1 = parseInt(treeItem1?.runNumber);
            const parsedRunNumber2 = parseInt(treeItem2?.runNumber);

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

          currentValue.items = currentItems;
        }

        newTree[index] = currentValue;
      } else {
        currentValue = {
          id: taskName,
          runNumber: undefined,
          taskName: taskName,
          value: taskName,
          items: [],
          icon: {
            "folder": "fal fa-layer-group opsera-primary",
            "openFolder": "fal fa-layer-group opsera-yellow",
            "file": "fal fa-layer-group opsera-primary"
          }
        };

        currentValue.items.push({
          id: `${runNumber}-${taskName}`,
          runNumber: runNumber,
          taskName: taskName,
          value: runNumberText,
          icon: {
            "folder": "fal fa-tasks opsera-primary",
            "openFolder": "fal fa-tasks opsera-yellow",
            "file": "fal fa-tasks opsera-primary"
          }
        });
        newTree.push(currentValue);
      }

    });
  }

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

    newTree[0].opened = true;
    newTree[0].selected = 1;
  }

  return newTree;
};


export default taskActivityLogHelpers;