import React, {useState, useEffect, useContext, useRef} from "react";
import {Row, Col} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions.js";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import StandaloneSaveButton from "components/common/buttons/saving/StandaloneSaveButton";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import MessageField from "components/common/fields/text/MessageField";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import MembersPanel from "components/common/inputs/user/membership/manager/user_panel/MembersPanel";
import NonMembersPanel
  from "components/common/inputs/user/membership/manager/user_panel/NonMembersPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";

function LdapGroupMembershipManagementPanel({ldapGroupData, type, orgDomain, setActiveTab, loadData}) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [ldapUsers, setLdapUsers] = useState([]);
  const [selectedNonMembers, setSelectedNonMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

    getLdapUsers(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [orgDomain]);

  // TODO: Sort users alphabetically
  const getLdapUsers = async (cancelSource = cancelTokenSource) => {
    if (orgDomain != null) {
      try {
        setIsLoading(true);
        const response = await accountsActions.getLdapUsersWithDomainV2(getAccessToken, cancelSource, orgDomain);
        let users = response?.data;

        if (isMounted.current === true && Array.isArray(users)) {
          setLdapUsers(users);
          await loadMemberStatus(users);
        }
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const loadMemberStatus = async (users = ldapUsers) => {
    const organizationUsers = Array.isArray(users) ? users : [];
    let unpackedMembers = [...ldapGroupData.getData("members")];
    let unpackedNonMembers = [];

    if (Array.isArray(unpackedMembers) && unpackedMembers.length > 0) {
      if (organizationUsers.length > 0) {
        organizationUsers.forEach((user, index) => {
          let member = unpackedMembers.find((member) => member.emailAddress === user.emailAddress);

          if (member == null) {
            unpackedNonMembers.push(user);
          }
        });
      }

      setMembers([...unpackedMembers]);
      setNonMembers([...unpackedNonMembers]);
    }
    else {
      setMembers([]);
      setNonMembers([...organizationUsers]);
    }
  };

  const sortByFirstName = (users) => {
    if (Array.isArray(users) && users.length > 0) {
      let usersCopy = [...users];

      usersCopy?.sort((member1, member2) => {
        const firstLetter1 = hasStringValue(member1?.name) ? member1?.name?.toLowerCase() : null;
        const firstLetter2 = hasStringValue(member2.name) ? member2.name?.toLowerCase() : null;

        if (firstLetter2 == null) {
          return -1;
        }

        if (firstLetter1 == null) {
          return 1;
        }

        if (firstLetter1 === firstLetter2) {
          return 0;
        }

        return firstLetter1 > firstLetter2 ? 1 : -1;
      });

      return usersCopy;
    }

    return [];
  };

  const updateMembers = async () => {
    try {
      let emailList = members.reduce((acc, item) => {
        acc.push(item.emailAddress);
        return acc;
      }, []);
      await accountsActions.syncMembership(orgDomain, ldapGroupData.getData("name"), emailList, getAccessToken);
      toastContext.showUpdateSuccessResultDialog(`${type} Membership`);
      setShowUnsavedChangesMessage(false);
      loadData();
    }
    catch (error) {
      toastContext.showErrorDialog(error);
    }
  };

  const getWarningMessage = () => {
    if (showUnsavedChangesMessage) {
      return <InlineWarning warningMessage={"You must hit save before changes will take effect"} />;
    }
  };

  const goToSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getSaveAndCancelButtonContainer = () => {
    return (
      <div className="w-100 d-flex justify-content-between py-2 mx-3">
        <div><CancelButton isLoading={isLoading} cancelFunction={goToSummaryPanel} /></div>
        <div>{getWarningMessage()}</div>
        <div><StandaloneSaveButton saveFunction={updateMembers} type={"Members"} /></div>
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
        <FontAwesomeIcon icon={faSearch} fixedWidth className="mr-2 opsera-primary h-100" />
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
        return member.emailAddress.toLowerCase().includes(lowercaseSearchText) || member.name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByFirstName(members)];
  };

  const getFilteredNonMembers = () => {
    if (searchText !== "") {
      const lowercaseSearchText = searchText.toLowerCase();
      return nonMembers.filter((nonMember) => {
        return nonMember.emailAddress.toLowerCase().includes(lowercaseSearchText) || nonMember.name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByFirstName(nonMembers)];
  };


  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Users"}/>);
  }

  return (
    <DetailPanelContainer>
      <Row className="mx-2">
        <div><h5>Add or remove people from the {ldapGroupData.getData("name")} {type}</h5></div>
      </Row>
      <Row>
        <MessageField
          message={` 
            Manage ${type} membership below by adding items from the left column into the right or removing members from the right column.  
            Changes must be saved before being complete. ${type} membership changes take effect after the User logs back in.
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
            setSearchText={setSearchText}
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
            setSearchText={setSearchText}
          />
        </Col>
      </Row>
      <Row>
        {getSaveAndCancelButtonContainer()}
      </Row>
    </DetailPanelContainer>
  );
}

LdapGroupMembershipManagementPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  orgDomain: PropTypes.string,
  getGroup: PropTypes.func,
  setActiveTab: PropTypes.func,
  loadData: PropTypes.func,
  type: PropTypes.string,
};

LdapGroupMembershipManagementPanel.defaultProps = {
  type: "Group",
};

export default LdapGroupMembershipManagementPanel;
