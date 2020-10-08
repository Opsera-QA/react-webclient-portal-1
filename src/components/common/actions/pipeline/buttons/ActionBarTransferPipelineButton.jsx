import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faUserEdit, faUserTimes} from "@fortawesome/pro-light-svg-icons";
import Popover from "react-bootstrap/Popover";
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {AuthContext} from "../../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import ActionBarPopoverButton from "../../buttons/ActionBarPopoverButton";
import DropdownList from "react-widgets/lib/DropdownList";
import accountsActions from "../../../../admin/accounts/accounts-actions";

// TODO: Should this be made into a transfer owner button for reuse?
function ActionBarTransferPipelineButton({pipeline, transferPipeline}) {
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [newUserId, setNewUserId] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getUsers();
    }
    catch (error) {
      toastContext.showErrorDialog(error,"Could not load users");
    }
    finally {
      setIsLoading(false);
    }
  }

  const getUsers = async () => {
    // let response = await accountsActions.getOrganizationAccountByName(pipeline.account, getAccessToken);
    //
    // if (response.data != null) {
    //   setUserList(response.data["users"]);
    // }
  };

  // TODO: Make general use popover container
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className="filter-title">
        <Row>
          <Col sm={10} className="my-auto">Transfer Pipeline</Col>
          <Col sm={2} className="text-right">
            <FontAwesomeIcon
              icon={faTimes}
              className="pointer"
              onClick={() => { document.body.click();}}
            />
          </Col>
        </Row>
      </Popover.Title>
      <Popover.Content className="filter-body">
        <div>
          <DropdownList
            data={userList}
            valueField='_id'
            value={userList[userList.findIndex(x => x._id === pipeline.owner)]}
            busy={isLoading}
            disabled={isLoading}
            textField='firstName'
            filter='contains'
            // groupBy={tool => capitalizeFirstLetter(tool.tool_type_identifier, "-", "No Tool Type Identifier")}
            onChange={data => setNewUserId(data['_id'])}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="w-50 mr-1">
            <Button type="primary" size="sm" onClick={() => transferPipeline()} className="w-100">
              <span className="pr-3"><FontAwesomeIcon icon={faUserEdit} fixedWidth className="mr-2"/>Transfer</span>
            </Button>
          </div>
          <div className="w-50 ml-1">
            <Button type="primary" size="sm" onClick={() => document.body.click()} className="w-100">
              <span><FontAwesomeIcon icon={faUserTimes} fixedWidth className="mr-2"/>Cancel</span>
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover} className="filter-popover">
      <div>
        <ActionBarPopoverButton icon={faUserEdit} popoverText={`Transfer Pipeline to new Owner`} />
      </div>
    </OverlayTrigger>
  );
}

ActionBarTransferPipelineButton.propTypes = {
  transferPipeline: PropTypes.func,
  pipeline: PropTypes.object
};

export default ActionBarTransferPipelineButton;