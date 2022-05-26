import React from 'react';
import PropTypes from "prop-types";
import ListInputBase from "components/common/inputs/list/ListInputBase";

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

  return (
    <div>
      <ListInputBase
        customTitle={"Issues List"}
        fieldName={"issues"}
        valueField={"issueId"}
        selectOptions={issuesList}
        searchFunction={searchFunction}
        showSelectAllButton={true}
        dataObject={model}
        setDataObject={setModel}
        customTemplate={customTemplate}
        isLoading={isLoading}
        loadDataFunction={loadDataFunction}
        noDataMessage={ noDataFilesPulledMessage }
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
