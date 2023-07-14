import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import { faArrowRight, faSearch } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import FieldListPanel from "./FieldListPanel";
import SelectedFieldListPanel from "./SelectedFieldListPanel";
import dataSeedingTaskWizardActions from "../../../dataSeedingTaskWizard.actions";
import SaveButtonContainer from "../../../../../../../../common/buttons/saving/containers/SaveButtonContainer";
import { DATA_SEEDING_WIZARD_SCREENS } from "../../../dataSeedingTaskWizard.constants";

function FieldSelectorBasePanel({
  recordId,
  wizardModel,
  setWizardModel,
  reload,
  setSelectedFields,
  fieldList,
  selectedFields,
  isLoading,
  handleClose,
  setCurrentScreen,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedNonMembers, setSelectedNonMembers] = useState([]);
  const [showUnsavedChangesMessage, setShowUnsavedChangesMessage] =
    useState(false);
  const [searchText, setSearchText] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    loadMemberStatus();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadMemberStatus = () => {
    const fieldLists = Array.isArray(fieldList) ? fieldList : [];
    let unpackedMembers = [...selectedFields];
    let unpackedNonMembers = [];

    if (Array.isArray(unpackedMembers) && unpackedMembers.length > 0) {
      if (fieldLists.length > 0) {
        fieldLists.forEach((user, index) => {
          let member = unpackedMembers.find((member) => {
            return member.componentName === user.componentName;
          });

          if (member == null) {
            unpackedNonMembers.push(user);
          }
        });
      }
      setMembers([...unpackedMembers]);
      setNonMembers([...unpackedNonMembers]);
    } else {
      setMembers([]);
      setNonMembers([...fieldLists]);
    }
  };

  useEffect(() => {
    loadMemberStatus();
  }, [selectedFields]);

  // console.log(members);
  // console.log(nonMembers);

  const updateMembers = async () => {
    try {
      setIsSaving(true);
      wizardModel.setData("selectedDependentObjectList", members);
      wizardModel.setData("fieldList", {});
      wizardModel.setData("selectedFieldList", {});
      wizardModel.setData("queryFilters", []);
      wizardModel.setData("filterQuery", "");
      await dataSeedingTaskWizardActions.updateSelectedDependentObjects(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
        members,
      );
      // trigger field fetch
      await dataSeedingTaskWizardActions.triggerFieldPropertiesPull(
        getAccessToken,
        cancelTokenSource,
        wizardModel?.getData("taskId"),
        wizardModel?.getData("runCount"),
        wizardModel,
        wizardModel?.getData("selectedCustomSetting")?.componentName,
      );
      setShowUnsavedChangesMessage(false);
    } catch (error) {
      console.error(error);
      toastContext.showSystemErrorToast(error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSearchText = (value) => {
    setSelectedNonMembers([]);
    setSelectedMembers([]);
    setSearchText(value);
  };

  const getSearchBar = () => {
    return (
      <div className="membership-search d-flex mx-auto my-3" style={{ width: "97%"}} >
        <IconBase
          icon={faSearch}
          iconClassName={"mr-2 opsera-dark-purple h-100"}
        />
        <input
          placeholder="Search"
          value={searchText}
          className="form-control"
          onChange={(event) => updateSearchText(event.target.value)}
        />
      </div>
    );
  };

  const getFilteredMembers = () => {
    if (searchText !== "") {
      const lowercaseSearchText = searchText.toLowerCase();
      return members.filter((member) => {
        return member?.componentName?.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return members;
  };

  const getFilteredNonMembers = () => {
    if (searchText !== "") {
      const lowercaseSearchText = searchText.toLowerCase();
      return nonMembers.filter((nonMember) => {
        return nonMember?.componentName?.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return nonMembers;
  };

  const updateAndProceed = async () => {
    await updateMembers();
    setCurrentScreen(
      DATA_SEEDING_WIZARD_SCREENS.MAPPING_SCREEN,
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <LoadingDialog
          message={"Loading Fields"}
          size={"sm"}
        />
      );
    }

    return (
      <div>
        <Row>{getSearchBar()}</Row>
        <Row>
          <Col xs={6}>
            <FieldListPanel
              members={members}
              setMembers={setSelectedFields}
              setSelectedNonMembers={setSelectedNonMembers}
              selectedNonMembers={selectedNonMembers}
              nonMembers={nonMembers}
              setNonMembers={setNonMembers}
              setShowUnsavedChangesMessage={setShowUnsavedChangesMessage}
              filteredNonmembers={getFilteredNonMembers()}
            />
          </Col>
          <Col xs={6}>
            <SelectedFieldListPanel
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
      </div>
    );
  };

  return (
    <>
      <DetailPanelContainer>
        <Row className="mx-2">
          <div>
            <h5>Select Dependent Object to proceed</h5>
          </div>
        </Row>
        <Row className="mx-2">
          <div>
            Select dependent object below by adding items from the left column
            into the right or removing from the right column.
          </div>
        </Row>
        {getBody()}
      </DetailPanelContainer>
      <SaveButtonContainer>
        <div className={"mr-2"}>
          <Button
            variant="primary"
            size="sm"
            onClick={updateAndProceed}
            disabled={isSaving}
          >
            <IconBase
              className={"mr-2"}
              isLoading={isSaving}
              icon={faArrowRight}
            />
            Save and Proceed
          </Button>
        </div>
        <CancelButton
          showUnsavedChangesMessage={false}
          cancelFunction={handleClose}
          size={"sm"}
        />
      </SaveButtonContainer>
    </>
  );
}

FieldSelectorBasePanel.propTypes = {
  recordId: PropTypes.string,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  reload: PropTypes.func,
  setSelectedFields: PropTypes.func,
  fieldList: PropTypes.any,
  selectedFields: PropTypes.any,
  isLoading: PropTypes.bool,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default FieldSelectorBasePanel;
