import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextField from "../../../common/form_fields/text-field";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import Modal from "../../../common/modal/modal";
import accountsActions from "../../accounts-actions";
import ldapUsersFormFields from "../ldap-users-form-fields";

// TODO: Eventually pull fields from ldapUserData
function LdapUserSummaryPanel({ ldapUserData, setLdapUserData } ) {
  const [fields, setFields ] = useState({ ...ldapUsersFormFields });
  const { getAccessToken } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const history = useHistory();

  // TODO: Move to helper
  function renderTooltip(props) {
    const { message } = props;
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  }

  const deleteLdapUser = async (userData) => {
    try {
      // TODO: Should this be 'name'?
      console.log("Deleting LDAP User: " + JSON.stringify(userData.emailAddress));
      let response = await accountsActions.delete(userData.emailAddress, getAccessToken);

      console.log("Delete response: " + JSON.stringify(response));
      setShowDeleteModal(false);
      history.push("/admin/tags/");
    }
    catch (err) {
      console.log(err.message);
    }
  };

  // TODO: Implement if necessary
  // const duplicateTag = async (tagData) => {
  //   try {
  //     console.log("Duplicating tag: " + JSON.stringify(tagData._id));
  //     let response = await adminTagsActions.duplicate(tagData._id, getAccessToken);
  //
  //     console.log("Duplicate response: " + JSON.stringify(response));
  //     // setShowDeleteModal(false);
  //     history.push("/admin/tags/" + response.data._id);
  //   }
  //   catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      {showDeleteModal ? <Modal header="Confirm LDAP User Delete"
        message="Warning! Data cannot be recovered once this user is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteLdapUser(ldapUserData)} /> : null}
      { ldapUserData && <>
        <div className="scroll-y pt-3 px-3">
          <div className="mb-3 flat-top-content-block p-3">
            <Row>
              <Col lg={6}>
                <TextField field={fields["firstName"]} value={ldapUserData.firstName} />
              </Col>
              <Col lg={6}>
                <TextField field={fields["name"]} value={ldapUserData.name} />
              </Col>
              <Col lg={6}>
                <TextField field={fields["preferredName"]} value={ldapUserData.preferredName} />
              </Col>
              <Col lg={6}>
                <TextField field={fields["lastName"]} value={ldapUserData.lastName} />
              </Col>
              <Col lg={6}>
                <TextField field={fields["emailAddress"]} value={ldapUserData.emailAddress} />
              </Col>
              <Col lg={6}>
                <TextField field={fields["site"]} value={ldapUserData.site} />
              </Col>
              <Col lg={6}>
                <TextField field={fields["departmentName"]} value={ldapUserData.departmentName} />
              </Col>
              <Col lg={6}>
                <TextField field={fields["title"]} value={ldapUserData.title} />
              </Col>
            </Row>

          </div>
        </div>
      </>}
    </>
  );
}

LdapUserSummaryPanel.propTypes = {
  ldapUserData: PropTypes.object,
  fields: PropTypes.object,
  setLdapUserData: PropTypes.func,
};


export default LdapUserSummaryPanel;
