import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import FieldListPanel from "./FieldListPanel";
import SelectedFieldListPanel from "./SelectedFieldListPanel";
import customSettingMigrationTaskWizardActions from "../../../customSettingMigrationTaskWizard.actions";

function FieldSelectorBasePanel({
  recordId,
  wizardModel,
  setWizardModel,
  reload,
  setSelectedFields,
  fieldList,
  selectedFields,
  isLoading,
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
            return member.name === user.name;
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

  console.log(members);
  console.log(nonMembers);

  const updateMembers = async () => {
    try {
      wizardModel.setData("selectedFieldList", members);
      await customSettingMigrationTaskWizardActions.updateSelectedFields(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
        members,
      );
      setShowUnsavedChangesMessage(false);
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  // console.log(wizardModel?.getPersistData());
  const getWarningMessage = () => {
    if (showUnsavedChangesMessage) {
      return (
        <InlineWarning
          warningMessage={"You must hit save before changes will take effect"}
        />
      );
    }
  };

  const getSaveAndCancelButtonContainer = () => {
    return (
      <div className="w-100 d-flex justify-content-between py-2 mx-3">
        <div>
          <CancelButton
            isLoading={isLoading}
            cancelFunction={reload}
          />
        </div>
        <div>{getWarningMessage()}</div>
        <div>
          <StandaloneSaveButton
            disable={!(members.length > 0)}
            saveFunction={updateMembers}
            type={"Field Properties"}
          />
        </div>
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
        return member?.name?.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return members;
  };

  const getFilteredNonMembers = () => {
    if (searchText !== "") {
      const lowercaseSearchText = searchText.toLowerCase();
      return nonMembers.filter((nonMember) => {
        return nonMember?.name?.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return nonMembers;
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
        <Row>{getSaveAndCancelButtonContainer()}</Row>
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
        <Row>{getSaveAndCancelButtonContainer()}</Row>
      </div>
    );
  };

  return (
    <DetailPanelContainer>
      <Row className="mx-2">
        <div>
          <h5>Add or remove field properties</h5>
        </div>
      </Row>
      <Row>
        <div className={"mx-3 mb-3 mt-2"}>
          <MessageFieldBase
            message={` 
            Select field properties below by adding items from the left column into the right or removing from the right column.  
            Changes must be saved before being complete.
          `}
          />
        </div>
      </Row>
      {getBody()}
    </DetailPanelContainer>
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
};

export default FieldSelectorBasePanel;
