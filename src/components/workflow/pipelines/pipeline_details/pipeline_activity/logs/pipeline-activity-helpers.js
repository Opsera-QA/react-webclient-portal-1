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
      const stepNameText = stepIndex !== "other_logs" && log.step_name ? `Step ${stepIndex + 1}: ${log.step_name}` : `Step: ${log.step_name}`;

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
    newTree[0].opened = true;
    newTree[0].selected = 1;
  }

  return newTree;
};

pipelineActivityHelpers.getSecondaryTree = () => {
  return [
    {
      id: "latest",
      runNumber: undefined,
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
      id: "other_logs",
      runNumber: "other_logs_query",
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