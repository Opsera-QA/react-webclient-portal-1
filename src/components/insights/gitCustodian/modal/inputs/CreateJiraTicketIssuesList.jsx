import React from 'react';
import PropTypes from "prop-types";
import ListObjectInputBase from "components/common/inputs/list/ListObjectInputBase";

const CreateJiraTicketIssuesList = (
  { 
    model, 
    setModel, 
    loadDataFunction,
    issuesList, 
    isLoading,    
  }) => {
  const noDataFilesPulledMessage = "The Issues list pull has been completed. There is no data for the selected criteria.";

  const customTemplate = (item) => {    
    const repository = item["repository"] !== "" ? item["repository"] : "";    
    const path = item["path"] !== "" ? item["path"] : "";
    const lineNumber = item["lineNumber"] !== "" ? item["lineNumber"] : "";

    return (`
      <div>
        <div class="row mb-2">
            <div class="col-4">Repository: ${repository}</div>
            <div class="col-6">Path: ${path}</div>
            <div class="col-2">Line Number: ${lineNumber}</div>
        </div>        
      </div>
    `);
  };

  const searchFunction = (item, searchTerm) => {
    return item.path.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const setDataFunction = async (fieldName, newArray) => {    
    const newModel = {...model};

    const issueIdArr = newArray?.map((issue) => issue.id);

    const description = newArray?.reduce((pv, cv) => pv + `Repository: ${cv.repository}; Path: ${cv.path}; Line Number: ${cv.lineNumber}\n`, "");

    newModel.setData(fieldName, newArray);
    newModel.setData("issues", issueIdArr);
    newModel.setData("description", description);
    newModel.setData("summary", `Opsera Git custodian - Compliance issue - total number of issues #${issueIdArr.length}`);
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    const newModel = {...model};
    newModel.setDefaultValue("issues");
    newModel.setDefaultValue("description");
    newModel.setDefaultValue("summary");
    setModel({...newModel});
  };

  return (
    <div>      
      <ListObjectInputBase
        customTitle={"Vulnerabilities List"}
        setDataFunction={setDataFunction}
        fieldName={"issuesList"}
        model={model}
        setModel={setModel}
        selectOptions={issuesList}
        searchFunction={searchFunction}
        clearDataFunction={clearDataFunction}
        customTemplate={customTemplate}
        isLoading={isLoading}
        valueField={"issueId"}        
        noDataMessage={ noDataFilesPulledMessage }
        showSelectAllButton={true}
      />
    </div>
  );

};

CreateJiraTicketIssuesList.propTypes = {
  isLoading: PropTypes.bool,
  issuesList: PropTypes.arrayOf(PropTypes.object),
  loadDataFunction: PropTypes.func,
  model: PropTypes.object,
  setModel: PropTypes.func,
  migrationObjectPullCompleted: PropTypes.bool
};

export default CreateJiraTicketIssuesList;
