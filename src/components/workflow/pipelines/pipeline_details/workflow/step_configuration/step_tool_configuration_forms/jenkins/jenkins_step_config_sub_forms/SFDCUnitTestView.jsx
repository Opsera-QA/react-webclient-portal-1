import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCheck,
  faSquare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import filterMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/filter-metadata";
import Model from "../../../../../../../../../core/data_model/model";
import { RenderWorkflowItem } from "components/workflow/approvalModal";

const SFDCUnitTestView = ({
  pipelineId,
  stepId,
  step,
  sfdcToolId,
  handleClose,
  saveConfig,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const [testClasses, setTestClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recordId, setRecordId] = useState("");
  const [selectedUnitTestClasses, setSelectedUnitTestClasses] = useState([]);
  const [allTestClasses, setAllTestClasses] = useState([]);
  const [toolFilterDto, setToolFilterDto] = useState(new Model({...filterMetadata.newObjectFields}, filterMetadata, false));
  

  useEffect(() => {  
    async function loadInitialData (filterDto = toolFilterDto) {
      setLoading(true);
      try {
        const response = await sfdcPipelineActions.getListFromPipelineStorage({"sfdcToolId": sfdcToolId, "pipelineId": pipelineId, "stepId": stepId, "dataType": "sfdc-unitTesting" },filterDto, getAccessToken);
        
        if(!response.data.data || !response.data.paginatedData) {
          toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
        }
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response.data.paginatedData.testClasses.count);
        setToolFilterDto({...newFilterDto});
        setTestClasses(response.data.paginatedData.testClasses.data);
        setAllTestClasses(response.data.data.testClasses);
        setSelectedUnitTestClasses( response.data.data.testClasses.filter((ele)=> response.data.paginatedData.selectedTestClasses.includes(ele)) );
        setRecordId(response.data._id);
      } catch (error) {
        console.error("Error getting API Data: ", error);
        toastContext.showLoadingErrorDialog(error);
      }
      setLoading(false);
    }
  
    loadInitialData();
  }, []);

  const loadData = async (filterDto = toolFilterDto) => {
    setLoading(true);
    try {
      const response = await sfdcPipelineActions.getListFromPipelineStorage({"sfdcToolId": sfdcToolId, "pipelineId": pipelineId, "stepId": stepId, "dataType": "sfdc-unitTesting" }, filterDto, getAccessToken);
      
      if(!response.data.data || !response.data.paginatedData) {
        toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
      }
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.paginatedData.testClasses.count);
      setToolFilterDto({...newFilterDto});
      setTestClasses(response.data.paginatedData.testClasses.data);
      // setSelectedUnitTestClasses(response.data.paginatedData.selectedTestClasses);
      setRecordId(response.data._id);
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    }
    setLoading(false);
  };

  const handleCheckAllClickUnitTestClasses = () => {
    // setSelectedUnitTestClasses(testClasses);
    setSelectedUnitTestClasses(allTestClasses);
  };

  const handleUnCheckAllClickUnitTestClasses = () => {
    setSelectedUnitTestClasses([]); // as we have pagination uncheck all should uncheck from current page
    // setSelectedUnitTestClasses(selectedUnitTestClasses.filter((item) =>  !testClasses.includes( item )));
  };

  const handleComponentCheck = (e) => {
    const newValue = e.target.name;
    if (e.target.checked) {
      setSelectedUnitTestClasses((selectedUnitTestClasses) => [...selectedUnitTestClasses, newValue]);
    } else {
      setSelectedUnitTestClasses(selectedUnitTestClasses.filter((item) => item !== newValue));
    }
  };

  const handleSelectedClasses = async() => {
    setSave(true);
    try {
      const saveResponse = await sfdcPipelineActions.setListToPipelineStorage({ "recordId": recordId, "sfdcToolId": sfdcToolId, "pipelineId": pipelineId, "stepId": stepId, "dataType": "sfdc-unitTesting", "data": selectedUnitTestClasses}, getAccessToken);
      // if we want to close this modal do it here!
      handleClose();
      setSave(false);
      await saveConfig();
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
      setSave(false);
    }
  };
  const getPaginator = () => {
    return (
        <div>{toolFilterDto && toolFilterDto.getData("totalCount") != null && <DtoBottomPagination paginationStyle={"stacked"} paginationDto={toolFilterDto} setPaginationDto={setToolFilterDto} isLoading={loading} loadData={loadData} />}</div>
    );
  };
  const handleSearch = async() => {
    let newFilterDto = toolFilterDto;
    newFilterDto.setData("pageSize", 50);
    newFilterDto.setData("currentPage", 1);
    newFilterDto.setData("search", searchQuery);
    setToolFilterDto({...newFilterDto});
    
    await loadData();
  };
  return (
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-content">
          <div className="h5">SalesForce Test Classes</div>
          <div className="text-muted">Apex Classes with @isTest annotation will be part of selection for Selective Unit Testing.</div>

          {error && <ErrorDialog error={error} align={"top"} setError={setError} />}

            <>
              <div className="mt-3 mr-3">
              <RenderWorkflowItem item={step} stateColorClass={"workflow-step-warning"}/>
                <div className="d-flex justify-content-between">
                   <div className="px-2">
                   <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Search for the file name"
                        value={searchQuery || ""} 
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                      <InputGroup.Append>
                        <Button variant="secondary" size="sm" onClick={handleSearch}>
                          {loading ? (
                            <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
                          ) : (
                            <FontAwesomeIcon icon={faSearch} fixedWidth className="mr-1" />
                          )}
                        </Button>
                      </InputGroup.Append>
                   </InputGroup>
                   </div>
                   <div className="align-self-end">
                     <Button variant="secondary" size="sm" className="mr-2" onClick={handleCheckAllClickUnitTestClasses}>
                       <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
                       Check All
                     </Button>
                     <Button
                       variant="secondary"
                       size="sm"
                       className="mr-2"
                       onClick={handleUnCheckAllClickUnitTestClasses}
                     >
                       <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1" />
                       Uncheck All
                     </Button>
                   </div>
                </div>
              </div>

              <div className="mx-2">
                <div className="text-muted">Select Test Classes:</div>
                <div className="d-flex flex-wrap">
                {loading ? (
                    <LoadingDialog size="sm" />
                  ) : (
                    <>
                      {typeof testClasses === "object" && testClasses.length > 0 &&
                        testClasses
                        // .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((item, idx) => (
                          <div key={item} className="p-2 w-50">
                            <Form.Check
                              inline
                              type={"checkbox"}
                              label={item}
                              name={item}
                              id={item}
                              checked={selectedUnitTestClasses.includes(item)}
                              onChange={handleComponentCheck}
                            />
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
              <div className="mx-2">
                {getPaginator()}
              </div>
            </>
        </div>

        <div className="flex-container-bottom pr-2 mt-4 mb-2 text-right">
          <Button
            variant="success"
            size="sm"
            onClick={() => handleSelectedClasses()}
            disabled={save}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
            )}
            Save
          </Button>

          {/*<Button variant="outline-secondary" size="sm" className="ml-2"
                  onClick={() => {
                    handleClose();
                  }}>
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Cancel</Button>*/}
        </div>
      </div>
    </div>
  );
};


SFDCUnitTestView.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  step: PropTypes.object,
  sfdcToolId: PropTypes.string,
  handleClose: PropTypes.func,
  saveConfig: PropTypes.func,
};

export default SFDCUnitTestView;
