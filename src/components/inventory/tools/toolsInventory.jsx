import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/loading";
import Modal from "components/common/modal";
import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import ToolDetails from "./toolDetails/toolDetails"; //tool summary view
import "./tools.css";
import ToolsTable from "./toolsTable";
import { DropdownList } from "react-widgets";
import { createFilterOptionList } from "utils/tableHelpers";

function ToolInventory () {
  let history = useHistory();
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const [filterOption, setFilterOption] = useState();
  const [isViewModal, toggleViewModal] = useState(false);
  const [toolId, setToolId] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [toolRegistryList, setToolRegistryList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  const [toolList, setToolList ] = useState([]);
  const [filterOptionList, setFilterOptionList] = useState([]);

  useEffect(() => {    
    if(id && id.match(/^[0-9a-fA-F]{24}$/)) {
      setToolId(id);
      toggleViewModal(true);
    } else {
      getToolRegistryList();
      getToolList();
      setToolId("");
    }
  }, [id]);


  const handleEditClick = (toolId) => {
    setToolId(toolId);
  };

  const handleDeleteClick = (toolId) => {
    setToolId(toolId);
    setShowDeleteModal(true);
  };

  const deleteTool = async () => {
    setShowDeleteModal(false);
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      let apiUrl = "/registry/" + toolId;
      await axiosApiService(accessToken).delete(apiUrl, {});
      toggleViewModal(false);
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
    getToolRegistryList(null);
  };

  const getToolRegistryList = async () => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      // sort by name ascending &sort=name&order=1
      const params = {
        sort: "name",
        order: 1
      };

      let apiUrl = "/registry?hidden=true";
      const response = await axiosApiService(accessToken).get(apiUrl, params);
      setToolRegistryList(response.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };
    
  const viewTool = (rowData) => {
    history.push(`/inventory/tools/${rowData.original._id}`);
    setToolId(rowData.original._id);
    toggleViewModal(true);
  };

  const handleNewEntryClick = () => {
    setToolId("");
    toggleViewModal(true);
  };


  const closeViewModal = () => {
    toggleViewModal(false);
    history.push("/inventory/tools");
  };

  const updateFilterOption = (filterOption) => {
    setFilterOption(filterOption);
  };
  
  const getToolList = async () => {
    try {
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get("/registry/tools", {});
      setToolList(toolResponse.data);
      setFilterOptionList(createFilterOptionList(toolResponse.data, "tool_identifier", "name", "identifier", false));
    }
    catch (err) {
      setErrors(err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="tabbed-content-block">
        <ToolDetails showModal={isViewModal} closeModal={(toggleModal) => closeViewModal(toggleModal)} toolId={toolId} fnEditTool={handleEditClick} fnDeleteTool={handleDeleteClick} setToolId={setToolId}/>
      
        {/* TODO: Refactor to be more like edit modal above */}
        {showDeleteModal ? <Modal showModal={showDeleteModal} header="Confirm Tool Delete"
          message="Warning! This may impact running pipelines.  Deleting this record would stop any associated pipelines from running.  Data cannot be recovered once the tool is deleted. Do you still want to proceed?"
          button="Confirm"
          handleCancelModal={() => setShowDeleteModal(false)}
          handleConfirmModal={() => deleteTool()} /> : null}

        <div className="custom-table-filter d-flex flex-row-reverse">
          <div className="my-1 text-right">
            <Button variant="primary" size="sm"
              onClick={() => { handleNewEntryClick("new"); }}>
              <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Tool Type
            </Button>
            <br />
          </div>
          <div className="tool-filter mr-2 mt-1">
            { filterOptionList && <DropdownList
              busy={Object.keys(filterOptionList).length == 1 ? true : false}
              disabled={Object.keys(filterOptionList).length == 1 ? true : false}
              data={filterOptionList}
              valueField='filterText'
              textField='text'
              defaultValue={filterOption}
              onChange={updateFilterOption}
            />}
          </div>
        </div>
        {isLoading && <LoadingDialog />}
        {errors && <div className="error-text">Error Reported: {errors}</div>}
      
        {toolRegistryList && <ToolsTable tableFilter={filterOption} rowInfo={viewTool} data={toolRegistryList} />}
      </div>
    </>
  );  
}


export default ToolInventory;