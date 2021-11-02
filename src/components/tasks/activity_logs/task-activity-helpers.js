const taskActivityHelpers = {};

taskActivityHelpers.constructSingleTaskTree = (pipelineLogData) => {
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

taskActivityHelpers.getSecondaryTree = () => {
  return [
    {
      id: "latest",
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
      id: "other_logs",
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

taskActivityHelpers.constructAllTasksTree = (pipelineLogData) => {
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


export default taskActivityHelpers;