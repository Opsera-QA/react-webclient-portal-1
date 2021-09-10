const taskActivityHelpers = {};

taskActivityHelpers.constructTree = (pipelineLogData) => {
  let newTree = [];

  if (Array.isArray(pipelineLogData) && pipelineLogData.length > 0) {
    pipelineLogData.forEach((log) => {
      const runNumber = log.run_count ? log.run_count : "logs";
      const runNumberText = log.run_count ? `Run ${log.run_count}` : "Logs";
      const taskType = log.type ? log.type : "Other Type";
      const taskName = log.name ? log.name : "No Name";
      
        let currentValue = {
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
      
    });
  }

  return newTree;
};


taskActivityHelpers.constructTaskTree = (pipelineLogData) => {
    let newTree = [];
  
    if (Array.isArray(pipelineLogData) && pipelineLogData.length > 0) {
        pipelineLogData.forEach((log) => {
          if (!log.name || log.name === "") {
            return;
          }
    
          const runNumber = log.run_count ? log.run_count : "logs";
          const runNumberText = log.run_count ? `Run ${log.run_count}` : "Logs";
          const taskName = log.name ? log.name : "No Name";
          
          let currentValue = newTree.find((entry) => {return entry.id === taskName;});
    
          if (currentValue != null) {
            const index = newTree.indexOf(currentValue);
            const existingStep = currentValue.items.find((item) => { return item.id === `${runNumber}-${taskName}`; });
    
            if (existingStep == null) {
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
            }
    
            newTree[index] = currentValue;
          }
          else {
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
        newTree[0].opened = true;
        newTree[0].selected = 1;
      }
    
      return newTree;
    };
   
  
export default taskActivityHelpers;