import React from "react";
import PropTypes from "prop-types";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetPlatformSsoUsers from "components/common/list_of_values_input/users/sso/platform/useGetPlatformSsoUsers";
import InfoText from "components/common/inputs/info_text/InfoText";

export default function SsoUserSideBySideListInputBase(
  {
    model,
    setModel,
    fieldName,
    valueField,
    setDataFunction,
  }) {
  const {
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    platformSsoUsers,
    isLoading,
    error,
    setPlatformSsoUsers,
  } = useGetPlatformSsoUsers();

  const searchFunction = (user, searchTerm) => {
    const parsedSearchTerm = DataParsingHelper.parseAndLowercaseString(searchTerm, undefined);

    if (!parsedSearchTerm) {
      return false;
    }

    const parsedFirstName = DataParsingHelper.parseAndLowercaseString(user.firstName, "");

    if (parsedFirstName.includes(parsedSearchTerm)) {
      return true;
    }

    const parsedLastName = DataParsingHelper.parseAndLowercaseString(user.lastName, "");

    if (parsedLastName.includes(parsedSearchTerm)) {
      return true;
    }

    const parsedEmail = DataParsingHelper.parseAndLowercaseString(user.email, "");

    if (parsedEmail.includes(parsedSearchTerm)) {
      return true;
    }
  };

  const getSelectedOptions = () => {
    const selectedArray = [];
    let selectedOptions = model.getArrayData(fieldName);

    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      selectedOptions.forEach((selectedOptionName) => {
        const user = platformSsoUsers.find((user) => user[valueField] === selectedOptionName);

        if (user != null) {
          selectedArray.push(user);
        }
      });
    }

    return selectedArray;
  };

  const customTemplate = (user) => {
    const name = `${user.firstName} ${user.lastName}`;
    const email = user.email;

    return (`
      <div class="">
        <div class="d-flex justify-content-between">
            <div>${name}</div>
            <div>${email}</div>
        </div>
      </div>
    `);
  };

  // TODO: This is a workaround for the refresh issue.
  const handleRemoveFromSelected = (fieldName, valueArray) => {
    if (setDataFunction) {
      setDataFunction(valueArray);
    } else {
      model.setData(fieldName, valueArray);
      setModel({ ...model });
    }
    setPlatformSsoUsers([...platformSsoUsers]);
  };

  if (model == null || isOpseraAdministrator !== true) {
    return <CenterLoadingIndicator customMessage={"Initializing"} />;
  }

  return (
    <Row>
      <Col lg={6}>
        <ListInputBase
          fieldName={fieldName}
          selectOptions={platformSsoUsers}
          dataObject={model}
          setDataObject={setModel}
          showSelectAllButton={true}
          valueField={valueField}
          textField={"email"}
          isLoading={isLoading}
          searchFunction={searchFunction}
          setDataFunction={setDataFunction}
          icon={faSalesforce}
          disabled={isLoading}
          customTemplate={customTemplate}
          noDataMessage={"No SSO Users Found"}
        />
      </Col>
      <Col lg={6}>
        <ListInputBase
          customTitle={"Selected Users"}
          fieldName={fieldName}
          selectOptions={getSelectedOptions()}
          dataObject={model}
          setDataObject={setModel}
          setDataFunction={handleRemoveFromSelected}
          noDataMessage={"No Users Selected"}
          valueField={valueField}
          textField={"email"}
          isLoading={isLoading}
          searchFunction={searchFunction}
          icon={faSalesforce}
          disabled={isLoading || getSelectedOptions().length === 0}
          customTemplate={customTemplate}
        />
      </Col>
      <Col xs={12}>
        <InfoText errorMessage={error} />
      </Col>
    </Row>
  );
}

SsoUserSideBySideListInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  valueField: PropTypes.string,
};