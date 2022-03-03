import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import registeredUsersMetadata from "components/admin/registered_users/registeredUsers.metadata";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeactivateUserButton from "components/admin/registered_users/actions/deactivate_user/DeactivateUserButton";
import ShowUserDetailsButton from "components/admin/registered_users/actions/show_details/ShowUserDetailsButton";
import CardContainerBase from "components/common/card_containers/CardContainerBase";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import DeployElkButton from "components/admin/registered_users/actions/deploy_elk/DeployElkButton";
import UserToolsTable from "components/admin/registered_users/actions/users_tools/UserToolsTable";
import IconBase from "components/common/icons/IconBase";

function RegisteredUserSummaryCard({ registeredUsersData, loadData }) {
  let history = useHistory();
  const [registeredUserDto, setRegisteredUserDto] = useState(undefined);

  useEffect(() => {
    initializeDto();
  }, [registeredUsersData]);

  const initializeDto = async () => {
    setRegisteredUserDto(new Model({...registeredUsersData}, registeredUsersMetadata, false));
  };

  const getTitleBar = () => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div><IconBase icon={faUser} className="mr-1"/>Registered User Data [{registeredUserDto.getData("email")}]</div>
        <div><ShowUserDetailsButton registeredUserDto={registeredUserDto} /></div>
      </div>
    );
  };

  const getTools = () => {
    let tools = registeredUserDto.getData("tools");
    if (!Array.isArray(tools) || tools.length === 0) {
      return (
        <Row>
          <Col lg={9}>
            <div className="h-100"><div className="mt-auto h-100">No tools are associated with this user account! Go into the User Settings Tools tab to deploy ELK stack</div></div>
          </Col>
          <Col lg={3}>
            <DeployElkButton loadData={loadData} userId={registeredUserDto.getData("_id")} />
          </Col>
        </Row>
      );
    }

    return (
      <div>
        <UserToolsTable data={tools} />
      </div>
    );
  };

  const gotoProfile = () => {
    history.push(`/admin/registered-users/${registeredUserDto.getData("_id")}`);
  };

  if (registeredUserDto == null) {
    return <></>;
  }

  return (
    <CardContainerBase titleBar={getTitleBar()}>
      <div className={"m-2"}>
        <small>
          <Row>
            <Col sm={12} md={6} lg={3}>
              <TextFieldBase dataObject={registeredUserDto} fieldName={"firstName"}/>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <TextFieldBase dataObject={registeredUserDto} fieldName={"lastName"}/>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <TextFieldBase dataObject={registeredUserDto} fieldName={"email"}/>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <Button variant="primary" size="sm" onClick={() => {gotoProfile();}} className="w-100">User Settings</Button>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <TextFieldBase dataObject={registeredUserDto} fieldName={"organizationName"}/>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <TextFieldBase dataObject={registeredUserDto} fieldName={"domain"}/>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <DateFieldBase dataObject={registeredUserDto} fieldName={"createdAt"}/>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <DeactivateUserButton loadData={loadData} userId={registeredUserDto.getData("_id")}/>
            </Col>
          </Row>
          {getTools()}
        </small>
      </div>
    </CardContainerBase>
  );
}

RegisteredUserSummaryCard.propTypes = {
  registeredUsersData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default RegisteredUserSummaryCard;
