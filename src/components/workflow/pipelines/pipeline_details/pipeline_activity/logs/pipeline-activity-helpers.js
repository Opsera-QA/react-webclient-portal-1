import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const pipelineActivityHelpers = {};

pipelineActivityHelpers.constructTree = (pipelineLogData) => {
  let newTree = [];

  if (Array.isArray(pipelineLogData) && pipelineLogData.length > 0) {
    pipelineLogData.forEach((log) => {
      if (!log.run_count || log.step_name === "start pipeline") {
        return;
      }

      const runNumber = log.run_count ? log.run_count : "other_logs";
      const stepIndex = log.step_index >= 0 ? log.step_index : "other_logs";
      const stepName = log.step_name ? log.step_name : "Other Logs";
      const runNumberText = log.run_count ? `Run ${log.run_count}` : "Other Logs";

      let stepNameText;

      if (stepName === "registered webhook event") {
        stepNameText = `${capitalizeFirstLetter(log.step_name)}`;
      }
      else if (stepIndex === "other_logs" || !log.step_name) {
        stepNameText = `Step: ${capitalizeFirstLetter(log.step_name)}`;
      }
      else {
        stepNameText = `Step ${stepIndex + 1}: ${capitalizeFirstLetter(log.step_name)}`;
      }

      let currentValue = newTree.find((entry) => {return entry.id === runNumber;});

      if (currentValue != null) {
        const index = newTree.indexOf(currentValue);
        const existingStep = currentValue.items.find((item) => { return item.id === `${runNumber}-${stepName}`; });

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
      else {
        currentValue = {
          id: runNumber,
          runNumber: runNumber,
          stepName: undefined,
          value: runNumberText,
          items: [],
          icon: {
            "folder": "fal fa-layer-group opsera-primary",
            "openFolder": "fal fa-layer-group opsera-yellow",
            "file": "fal fa-layer-group opsera-primary"
          }
        };

        if (stepIndex != null) {
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

        newTree.push(currentValue);
      }

    });
  }

  if (newTree.length > 0) {
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
  }

  return newTree;
};

pipelineActivityHelpers.constructTopLevelTreeBasedOnRunCount = (runCount) => {
  let newTree = [];

  if (runCount > 0) {

    for (let runNumber = 1; runNumber <= runCount; runNumber++) {
      newTree.push({
        id: runNumber,
        runNumber: runNumber,
        stepName: undefined,
        value: `Run ${runNumber}`,
        items: [],
        icon: {
          "folder": "fal fa-layer-group opsera-primary",
          "openFolder": "fal fa-layer-group opsera-yellow",
          "file": "fal fa-layer-group opsera-primary"
        }
      });
    }
  }

  if (newTree.length > 0) {
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
  }

  return newTree;
};

pipelineActivityHelpers.updateSelectedRunNumberTree = (pipelineTree, runNumber, pipelineLogData) => {
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

pipelineActivityHelpers.getSecondaryTree = () => {
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


export default pipelineActivityHelpers;