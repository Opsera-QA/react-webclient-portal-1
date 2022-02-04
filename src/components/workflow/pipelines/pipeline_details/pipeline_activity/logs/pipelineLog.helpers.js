import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const pipelineLogHelpers = {};

pipelineLogHelpers.constructTopLevelTreeBasedOnRunCount = (runCount) => {
  let newTree = [];

  if (runCount > 0) {
    for (let runNumber = 1; runNumber <= runCount; runNumber++) {
      newTree.push(createTopLevelTreeItem(runNumber));
    }
  }

  return sortTree(newTree);
};

pipelineLogHelpers.updateSelectedRunNumberTree = (pipelineTree, runNumber, pipelineLogData) => {
  if (typeof runNumber !== "number" || !Array.isArray(pipelineTree) || !Array.isArray(pipelineLogData) || pipelineLogData.length === 0) {
    return pipelineTree;
  }

  let newTree = [...pipelineTree];

  const currentValue = newTree.find((entry) => {
    return entry.id === `${runNumber}`;
  });

  pipelineLogData.forEach((log) => {
    if (!log.run_count || log.step_name === "start pipeline") {
      return;
    }

    const stepIndex = log.step_index >= 0 ? log.step_index : "other_logs";
    const stepName = log.step_name ? log.step_name : "Other Logs";
    let stepNameText;

    if (stepName === "registered webhook event") {
      stepNameText = `${capitalizeFirstLetter(log.step_name)}`;
    } else if (stepIndex === "other_logs" || !log.step_name) {
      stepNameText = `Step: ${capitalizeFirstLetter(log.step_name)}`;
    } else {
      stepNameText = `Step ${stepIndex + 1}: ${capitalizeFirstLetter(log.step_name)}`;
    }

    if (currentValue != null) {
      const index = newTree.indexOf(currentValue);
      const existingStep = currentValue.items.find((item) => {
        return item.id === `${runNumber}-${stepName}`;
      });

      if (existingStep == null && stepIndex != null) {
        currentValue.items.push({
          id: `${runNumber}-${stepName}`,
          runNumber: runNumber,
          stepName: stepName,
          value: stepNameText,
          icon: {
            "folder": "fal fa-tasks opsera-primary",
            "openFolder": "fal fa-tasks opsera-yellow",
            "file": "fal fa-tasks opsera-primary"
          }
        });
      }

      newTree[index] = currentValue;
    }
  });

  return newTree;
};

pipelineLogHelpers.addRunNumberToPipelineTree = (pipelineTree, runNumber) => {
  if (Array.isArray(pipelineTree) && pipelineTree.length > 0 && typeof runNumber === "number") {
    const existingTreeItem = pipelineTree.find((treeItem) => treeItem.id === runNumber);

    if (existingTreeItem == null) {
      const newTreeItem = createTopLevelTreeItem(runNumber);

      if (newTreeItem) {
        const newTree = [...pipelineTree];
        newTree.push(newTreeItem);
        return sortTree(newTree);
      }
    }
  }
};

pipelineLogHelpers.getSecondaryTree = () => {
  return [
    {
      id: "latest",
      runNumber: "latest",
      stepName: null,
      value: "Latest Logs",
      items: [],
      icon: {
        "folder": "fal fa-layer-group opsera-primary",
        "openFolder": "fal fa-layer-group opsera-yellow",
        "file": "fal fa-layer-group opsera-primary"
      }
    },
    {
      id: "secondary",
      runNumber: "secondary",
      stepName: null,
      value: "Secondary Logs",
      items: [],
      icon: {
        "folder": "fal fa-layer-group opsera-primary",
        "openFolder": "fal fa-layer-group opsera-yellow",
        "file": "fal fa-layer-group opsera-primary"
      }
    },
  ];
};

const sortTree = (tree) => {
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

const createTopLevelTreeItem = (runNumber, items = []) => {
  if (typeof runNumber === "number") {
    return (
      {
        id: runNumber,
        runNumber: runNumber,
        stepName: undefined,
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

export default pipelineLogHelpers;