
const sfdcTableConstants = {};

sfdcTableConstants.initialState = {
  pageIndex: 0
};
  
sfdcTableConstants.fields = [
    {
        label: "Component", 
        id: "componentType"
    },
    {
        label: "File", 
        id: "committedFile"
    },
    {
        label: "Commit Time", 
        id: "committedTime"
    },
    {
        label: "Committed By", 
        id: "committedBy"
    },
    {
        label: "Commit Action", 
        id: "commitAction"
    },
    {
        label: "SFDC Component Id", 
        id: "committedFileId"
    }
]

sfdcTableConstants.noDataMessage = "Modified Files Data not available for selected Criteria";

export default sfdcTableConstants;