import React, {useState, useEffect, useContext} from "react";
import {Row, Col } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import MessageField from "components/common/form_fields/MessageField";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import MembersPanel from "./panels/MembersPanel";
import NonMembersPanel
  from "./panels/NonMembersPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

function SFDCUnitTestManagementPanel({
  unitTestRecordId, 
  selectedStep, 
  pipelineId, 
  filterDto, 
  setUnitTestRecordId, 
  reload,
  members,
  setMembers,
  totalMembers,
  setTotalMembers,
  setEnteredMembers
}) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  // const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedNonMembers, setSelectedNonMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUnsavedChangesMessage, setShowUnsavedChangesMessage] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log('in SFDCUnitTestManagementPanel useEffect');
    setIsLoading(true);
    let arrOfObj = totalMembers.filter(item => !members.includes(item));
    setNonMembers(arrOfObj);
    setIsLoading(false);
  }, [members]);

  // useEffect(() => {
  //   loadMembers();
  // }, [selectedStep]);

  const loadMembers = async () => {
    try {
      setIsLoading(true);
      await loadMemberStatus();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadMemberStatus = async () => {
     console.log(selectedStep._id);
    const response = await sfdcPipelineActions.getListFromPipelineStorage({"sfdcToolId": selectedStep.tool.configuration.sfdcToolId, "pipelineId": pipelineId, "stepId": selectedStep._id, "dataType": "sfdc-unitTesting" }, filterDto , getAccessToken);
      
    if(!response.data.data || !response.data.paginatedData) {
      toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
    }
    // save the mongo record id so that we can update it when saving selected data
    // TODO:  check if this breaks or else enable this
    setUnitTestRecordId(response.data._id);
    // get the selected data if the same record is already present in mongo
    let members = response.data.data.testClasses.filter((ele)=> response.data.paginatedData.selectedTestClasses.includes(ele));
    setMembers(members);
    let arrOfObj = response.data.data.testClasses.filter(item => !members.includes(item));
   
    setNonMembers(arrOfObj);    
  };

  const updateMembers = async () => {
      try {
      const saveResponse = await sfdcPipelineActions.setListToPipelineStorage(
        { 
          "recordId": unitTestRecordId, 
          "sfdcToolId": selectedStep.tool.configuration.sfdcToolId, 
          "pipelineId": pipelineId,  
          "stepId": selectedStep._id, 
          "dataType": "sfdc-unitTesting", 
          "data": members
        }, getAccessToken);
      // TODO: add a success toast here
      // toastContext.showUpdateSuccessResultDialog("Test Classes");
      setEnteredMembers(members);
      setShowUnsavedChangesMessage(false);
      // await reload();

    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getWarningMessage = () => {
    if (showUnsavedChangesMessage) {
      return <InlineWarning warningMessage={"You must hit save before changes will take effect"} />;
    }
  };

  // const goToSummaryPanel = () => {
  //   // setActiveTab("summary");
  //   loadMembers();
  // }

  const getSaveAndCancelButtonContainer = () => {
    return (
      <div className="w-100 d-flex justify-content-between py-2 mx-3">
        <div><CancelButton isLoading={isLoading} cancelFunction={loadMembers} /></div>
        <div>{getWarningMessage()}</div>
        <div><StandaloneSaveButton saveFunction={updateMembers} type={"Test Classes"} /></div>
      </div>
    );
  };

  const updateSearchText = (value) => {
    setSelectedNonMembers([]);
    setSelectedMembers([]);
    setSearchText(value);
  };

  const getSearchBar = () => {
    return (
      <div className="membership-search d-flex mx-auto">
        <FontAwesomeIcon icon={faSearch} fixedWidth className="mr-2 opsera-dark-purple h-100" />
        <input
          placeholder="Search"
          value={searchText}
          className="form-control"
          onChange={event => updateSearchText(event.target.value)}
        />
      </div>
    );
  };

  const getFilteredMembers = () => {
    if (searchText !== "") {
      const lowercaseSearchText = searchText.toLowerCase();
      return members.filter((member) => {
        return member.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return members;
  };

  const getFilteredNonMembers = () => {
    if (searchText !== "") {
      const lowercaseSearchText = searchText.toLowerCase();
      return nonMembers.filter((nonMember) => {
        return nonMember.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return nonMembers;
  };


  if (isLoading) {
    return (<LoadingDialog/>);
  }

  return (
    <DetailPanelContainer>
      <Row className="mx-2">
        <div><h5>Add or remove unit test classes from the selected unit test step</h5></div>
      </Row>
      <Row>
        <MessageField
          message={` 
            Select Unit Test classes below by adding items from the left column into the right or removing from the right column.  
            Changes must be saved before being complete.
          `} />
      </Row>
      <Row>
        {getSearchBar()}
      </Row>
      <Row>
        {getSaveAndCancelButtonContainer()}
      </Row>
      <Row>
        <Col xs={6}>
          <NonMembersPanel
            members={members}
            setMembers={setMembers}
            setSelectedNonMembers={setSelectedNonMembers}
            selectedNonMembers={selectedNonMembers}
            nonMembers={nonMembers}
            setNonMembers={setNonMembers}
            setShowUnsavedChangesMessage={setShowUnsavedChangesMessage}
            filteredNonmembers={getFilteredNonMembers()}
          />
        </Col>
        <Col xs={6}>
          <MembersPanel
            members={members}
            setMembers={setMembers}
            setSelectedMembers={setSelectedMembers}
            selectedMembers={selectedMembers}
            nonMembers={nonMembers}
            setNonMembers={setNonMembers}
            setShowUnsavedChangesMessage={setShowUnsavedChangesMessage}
            filteredMembers={getFilteredMembers()}
          />
        </Col>
      </Row>
      <Row>
        {getSaveAndCancelButtonContainer()}
      </Row>
    </DetailPanelContainer>
  );
}

SFDCUnitTestManagementPanel.propTypes = {
  selectedStep: PropTypes.object,
  unitTestRecordId: PropTypes.string,
  pipelineId: PropTypes.string,
  filterDto: PropTypes.func,
  setUnitTestRecordId: PropTypes.func,
  reload: PropTypes.func,
  members: PropTypes.array,
  setMembers: PropTypes.array,
  totalMembers: PropTypes.any,
  setTotalMembers: PropTypes.array,
  setEnteredMembers: PropTypes.func
};

export default SFDCUnitTestManagementPanel;
