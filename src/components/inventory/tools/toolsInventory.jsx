import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/loading";
import Modal from "components/common/modal";
import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import NewTool from "./newTool/newTool";
import ToolDetails from "./toolDetails/toolDetails"; //tool summary view
import "./tools.css";
import ToolsTable from "./toolsTable";

function ToolInventory () {
  let history = useHistory();
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const [isEditModal, toggleEditModal] = useState(false);
  const [isViewModal, toggleViewModal] = useState(false);
  const [toolId, setToolId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("new");
  const [toolList, setToolList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {    
    if(id && id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("ID Found? ", id);
      setModalType("view");
      setToolId(id);
      toggleViewModal(true);
    } else {
      //don't need this to run by ID since child components will handle queries
      getToolRegistryList();
      setToolId("");
    }
  }, [id]);


  const handleEditClick = (toolId, toolData) => {
    setModalType("edit");
    setToolId(toolId);
    toggleEditModal(true);
    // toggleViewModal(false);
  };

  const handleDeleteClick = (toolId, toolData) => {
    setModalType("delete");
    setToolId(toolId);
    setShowDeleteModal(true);
  };

  const deleteTool = async () => {
    setShowDeleteModal(false);
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      let apiUrl = "/registry/" + toolId;
      const response = await axiosApiService(accessToken).delete(apiUrl, {});
      console.log(response);
      toggleEditModal(false);
      toggleViewModal(false);
    }
    catch (err) {
      console.log(err.message);
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
      setToolList(response.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };
    
  const viewTool = (rowData) => {
    console.log(rowData);
    history.push(`/inventory/tools/${rowData.original._id}`);
    setToolId(rowData.original._id);
    toggleViewModal(true);
  };

  const handleNewEntryClick = () => {
    setModalType("new");
    setToolId("");
    toggleEditModal(true);
  };

  const closeModal = (val1, saveResponse) => {
    console.log("val1 ", val1);
    console.log("saveResponse ", saveResponse);
    toggleEditModal(false);
    setToolId("");
    if (saveResponse && saveResponse._id) {
      history.push(`/inventory/tools/${saveResponse._id}`);
      setToolId(saveResponse._id);
      toggleViewModal(true);
    } else {
      history.push("/inventory/tools");
      getToolRegistryList();
      toggleViewModal(false);
      toggleEditModal(false);
    }
    
  };

  const closeViewModal = () => {
    toggleViewModal(false);
    history.push("/inventory/tools");
  };

  return (
    <>
      
      {/*Both of these should be doing a lookup of the altest tool data, not using data passed form ehre */}
      <ToolDetails showModal={isViewModal} closeModal={(toggleModal) => closeViewModal(toggleModal)} toolId={toolId} fnEditTool={handleEditClick} fnDeleteTool={handleDeleteClick}/>
      {isEditModal && <NewTool showModal={isEditModal} closeModal={(toggleModal, response) => closeModal(toggleModal, response)} type={modalType} toolId={toolId} />} 
      {/* TODO: Refactor to be more like edit modal above */}
      {showDeleteModal ? <Modal showModal={showDeleteModal} header="Confirm Tool Delete"
        message="Warning! This may impact running pipelines.  Deleting this record would stop any associated pipelines from running.  Data cannot be recovered once the tool is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteTool()} /> : null}

      <div className="mb-2 text-right">
        <Button size="sm" variant="primary"   
          onClick={() => { handleNewEntryClick("new"); }}> 
          <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Entry
        </Button>
        <br />
      </div>
      {isLoading && <LoadingDialog />}
      
      {toolList && <ToolsTable rowInfo={viewTool} data={toolList} />}
      
    </>
  );  
}


export default ToolInventory;