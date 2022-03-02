import React, {useState, useEffect, useContext, useRef} from "react";
import {Row, Col } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import MessageField from "components/common/fields/text/MessageField";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import SelectedUnitTestClassesPanel from "components/workflow/wizards/sfdc_pipeline_wizard/unit_test_selector/panels/SelectedUnitTestClassesPanel";
import UnitTestClassesPanel
  from "components/workflow/wizards/sfdc_pipeline_wizard/unit_test_selector/panels/UnitTestClassesPanel";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";

function SfdcUnitTestManagementPanel({unitTestRecordId, reload, members, setMembers, unitTestClassesList, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [nonMembers, setNonMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedNonMembers, setSelectedNonMembers] = useState([]);
  const [showUnsavedChangesMessage, setShowUnsavedChangesMessage] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let newNonMembers = unitTestClassesList.filter(item => !members.includes(item));
    setNonMembers(newNonMembers);
  }, [members]);

  const updateMembers = async () => {
      try {
      await sfdcPipelineActions.updateSelectedUnitTestClassesV2(getAccessToken, cancelTokenSource, unitTestRecordId, members);
      setShowUnsavedChangesMessage(false);
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getWarningMessage = () => {
    if (showUnsavedChangesMessage) {
      return <InlineWarning warningMessage={"You must hit save before changes will take effect"} />;
    }
  };

  const getSaveAndCancelButtonContainer = () => {
    return (
      <div className="w-100 d-flex justify-content-between py-2 mx-3">
        <div><CancelButton isLoading={isLoading} cancelFunction={reload} /></div>
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
        <IconBase icon={faSearch} iconClassName={"mr-2 opsera-dark-purple h-100"} />
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

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Unit Test Classes"} size={"sm"}/>);
    }

    return (
      <div>
        <Row>
          {getSearchBar()}
        </Row>
        <Row>
          {getSaveAndCancelButtonContainer()}
        </Row>
        <Row>
          <Col xs={6}>
            <UnitTestClassesPanel
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
            <SelectedUnitTestClassesPanel
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
      </div>
    );
  };

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
      {getBody()}
    </DetailPanelContainer>
  );
}

SfdcUnitTestManagementPanel.propTypes = {
  unitTestRecordId: PropTypes.string,
  reload: PropTypes.func,
  members: PropTypes.array,
  setMembers: PropTypes.array,
  unitTestClassesList: PropTypes.any,
  isLoading: PropTypes.bool
};

export default SfdcUnitTestManagementPanel;
