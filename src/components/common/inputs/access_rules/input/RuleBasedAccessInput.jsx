import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  faIdCard,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import RuleBasedAccessInputRow from "components/common/inputs/access_rules/input/RuleBasedAccessInputRow";
import {accessRuleTypeConstants} from "components/common/inputs/access_rules/constants/AccessRuleType.constants";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";

function RuleBasedAccessInput(
  { 
    fieldName, 
    model, 
    setModel, 
    helpComponent, 
    disabled,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [accessRules, setAccessRules] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [ssoUserOrganizationNames, setSsoUserOrganizationNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      unpackData();
      await getSsoUserOrganizationNames(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getSsoUserOrganizationNames = async (cancelSource = cancelTokenSource) => {
    const response = await accountsActions.getSsoUserOrganizationNames(getAccessToken, cancelSource);
    const organizationNamesList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(organizationNamesList)) {
      setSsoUserOrganizationNames([...organizationNamesList]);
    }
  };


  const unpackData = () => {
    const currentData = model?.getData(fieldName);
    const unpackedRoles = [];

    if (Array.isArray(currentData) && currentData.length > 0) {
      unpackedRoles.push(...currentData);
    }
    else {
      unpackedRoles.push(
        {
          type: accessRuleTypeConstants.ACCESS_RULE_TYPES.ALLOWED_SSO_USER_ORGANIZATIONS,
          value: []
        }
      );
    }

    setAccessRules([...unpackedRoles]);
  };

  const validateAndSetData = (newRoleList) => {
    setAccessRules([...newRoleList]);
    const newDataObject = {...model};

    if (newRoleList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of access rules. Please remove one to add another.");
      return;
    }

    const newArray = [];

    if (Array.isArray(newRoleList) && newRoleList?.length > 0) {
      newRoleList.map((accessRule) => {
        if (isRoleComplete(accessRule) !== true) {
          return;
        }

        newArray.push(accessRule);
      });
    }

    newDataObject.setData(fieldName, [...newArray]);
    setModel({...newDataObject});
  };

  const isRoleComplete = (accessRule) => {
    return (hasStringValue(accessRule?.type) === true && hasValues(accessRule?.type, accessRule?.value) === true);
  };

  const hasValues = (type, value) => {
    switch (type) {
      case accessRuleTypeConstants.ACCESS_RULE_TYPES.ALLOWED_SSO_USER_ORGANIZATIONS:
        return Array.isArray(value) && value.length > 0;
      default:
        return false;
    }
  };

  const lastRuleComplete = () => {
    let newPropertyList = accessRules;

    if (newPropertyList.length === 0) {
      return true;
    }

    const lastObject = newPropertyList[newPropertyList.length - 1];
    return isRoleComplete(lastObject);
  };

  const addAccessRule = () => {
    let newRoleList = accessRules;

    if (lastRuleComplete()) {
      const newRow = {
        type: accessRuleTypeConstants.ACCESS_RULE_TYPES.ALLOWED_SSO_USER_ORGANIZATIONS,
        value: [],
      };
      newRoleList.push(newRow);
      validateAndSetData(newRoleList);
    }
  };

  const deleteAccessRule = (index) => {
    let newRoleList = accessRules;
    newRoleList.splice(index, 1);
    validateAndSetData(newRoleList);
  };

  const setAccessRoleTypeFunction = (index, newValue) => {
    let newPropertyList = accessRules;

    if (newPropertyList[index]["type"] !== newValue) {
      newPropertyList[index]["value"] = "";
      newPropertyList[index]["type"] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const setAccessRoleValueFunction = (index, newValue) => {
    let newPropertyList = accessRules;

    if (newPropertyList[index]["value"] !== newValue) {
      newPropertyList[index]["value"] = newValue;
      validateAndSetData(newPropertyList);
    }
  };


  const getDisabledSsoUserOrganizations = () => {
    if (accessRules.length > 0) {
      const disabledSsoUserOrganizations = [];

      accessRules?.map((property) => {
        if (hasStringValue(property?.value) === true) {
          disabledSsoUserOrganizations.push(property.value);
        }
      });

      return disabledSsoUserOrganizations;
    }
  };

  const getFieldBody = () => {
    if (!accessRules || accessRules.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">No access rules have been added yet.</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {accessRules.map((accessRule, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <RuleBasedAccessInputRow
                deleteAccessRule={() => deleteAccessRule(index)}
                accessRule={accessRule}
                disabledSsoUserOrganizations={getDisabledSsoUserOrganizations()}
                setAccessRoleTypeFunction={(value) =>  setAccessRoleTypeFunction(index, value)}
                setAccessRoleValueFunction={(value) => setAccessRoleValueFunction(index, value)}
                disabled={disabled}
                ssoUserOrganizationNames={ssoUserOrganizationNames}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex py-1">
        <Col sm={11}>
          <Row>
            <Col sm={3}>
              <span className="text-muted ml-5">Type</span>
            </Col>
            <Col sm={9} className={"mx-auto"}>
              <span className="text-muted">Value</span>
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"} />
      </div>
    );
  };

  const getIncompleteRoleMessage = () => {
    if (lastRuleComplete() !== true) {
      return (`Incomplete Access Rules Will Be Removed Upon Saving`);
    }
  };

  const getHelpComponent = () => {
    if (helpComponent) {
      return (helpComponent);
    }
  };

  const getRolesMessage = () => {
    if (!Array.isArray(accessRules) || accessRules.length === 0 || (accessRules.length === 1 && lastRuleComplete() === false)) {
      return (`If no access rules are assigned, all users will have access.`);
    }

    return (`Only users that meet the access rules assigned will be given access to this.`);
  };

  if (field == null) {
    return null;
  }

  return (
    <div style={{minWidth: "575px"}}>
      <InfoText customMessage={getRolesMessage()} />
      <PropertyInputContainer
        titleIcon={faIdCard}
        field={field}
        addProperty={addAccessRule}
        titleText={"Access Rules"}
        errorMessage={errorMessage}
        type={"Access Rule"}
        addAllowed={lastRuleComplete() === true && disabled !== true}
        helpComponent={getHelpComponent()}
        incompleteRowMessage={getIncompleteRoleMessage()}
      >
        <div>
          <div className={"filter-bg-white"}>
            {getHeaderBar()}
          </div>
          <div className="rules-input">
            {getFieldBody()}
          </div>
        </div>
      </PropertyInputContainer>
    </div>
  );
}

RuleBasedAccessInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
};

RuleBasedAccessInput.defaultProps = {
  fieldName: "accessRules",
};

export default RuleBasedAccessInput;