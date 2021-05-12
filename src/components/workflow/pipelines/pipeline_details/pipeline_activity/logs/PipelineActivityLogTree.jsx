import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";

function PipelineActivityLogTree({ pipelineLogData, setCurrentRunNumber, setCurrentStepName}) {
  const [treeData, setTreeData] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    constructTree(pipelineLogData);

    return () => {
      isMounted.current = false;
    };
  }, [pipelineLogData]);

  const onTreeItemClick = (treeItem) => {
    if (treeItem) {
      setCurrentRunNumber(treeItem.runNumber);
      setCurrentStepName(treeItem.stepName);
    }
  };

  const constructTree = () => {
    let newTree = [];

    if (Array.isArray(pipelineLogData) && pipelineLogData.length > 0) {
      pipelineLogData.forEach((log) => {
        const runNumber = log.run_count;
        const stepName = log.step_name;
        const stepIndex = log.step_index;

        let currentValue = newTree.find((entry) => {return entry.id === runNumber;});

        if (currentValue != null) {
          const index = newTree.indexOf(currentValue);
          const existingStep = currentValue.items.find((item) => { return item.id === `${runNumber}-${stepName}`; });

          if (existingStep == null && stepIndex != null) {
            currentValue.items.push({
              id: `${runNumber}-${stepName}`,
              runNumber: runNumber,
              stepName: stepName,
              value: `Step ${stepIndex + 1}: ${stepName}`,
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
            value: `Run ${runNumber}`,
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
              value: `Step ${stepIndex + 1}: ${stepName}`,
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

    setTreeData(newTree);
  };

  return (
    <div className={"p-2 scroll-y table-tree"}>
      <TreeBase data={treeData} onItemClick={onTreeItemClick}/>
    </div>
  );
}

PipelineActivityLogTree.propTypes = {
  pipelineLogData: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  setCurrentStepName: PropTypes.func,
};

export default PipelineActivityLogTree;