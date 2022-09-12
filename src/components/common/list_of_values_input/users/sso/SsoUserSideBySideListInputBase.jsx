import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function SsoUserSideBySideListInputBase(
  {
    model,
    setModel,
    fieldName,
    valueField,
    setDataFunction,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ssoUsers, setSsoUsers] = useState([]);
  const {
    toastContext,
    getAccessToken,
    isMounted,
    cancelTokenSource,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    if (isOpseraAdministrator === true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);

      const response = await ssoUserActions.getPlatformUsers(getAccessToken, cancelTokenSource);
      const users = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(users)) {
        setSsoUsers(users);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

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
        const user = ssoUsers.find((user) => user[valueField] === selectedOptionName);

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
    setSsoUsers([...ssoUsers]);
  };

  if (model == null) {
    return <CenterLoadingIndicator customMessage={"Initializing"} />;
  }

  return (
    <Row>
      <Col lg={6}>
        <ListInputBase
          fieldName={fieldName}
          selectOptions={ssoUsers}
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