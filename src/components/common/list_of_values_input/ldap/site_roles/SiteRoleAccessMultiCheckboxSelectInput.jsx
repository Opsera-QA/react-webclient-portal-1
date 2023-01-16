import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import StandaloneCheckboxInput from "components/common/inputs/boolean/checkbox/StandaloneCheckboxInput";
import siteRoleConstants from "@opsera/know-your-role/constants/siteRole.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function SiteRoleAccessMultiCheckboxSelectInput(
  {
    fieldName,
    className,
    model,
    setModel,
    disabled,
    visible,
  }) {
  const field = model?.getFieldById(fieldName);
  const siteRoles = DataParsingHelper.parseArray(model?.getData(fieldName), []);
  console.log("siteRoles: " + JSON.stringify(siteRoles));
  const {
    isSaasUser,
  } = useComponentStateReference();

  const validateAndSetData = (siteRoleArray) => {
    const parsedSiteRoles = DataParsingHelper.parseArray(siteRoleArray, []);

    if (parsedSiteRoles.includes(siteRoleConstants.SITE_ROLES.ADMINISTRATOR) !== true) {
      parsedSiteRoles.push(siteRoleConstants.SITE_ROLES.ADMINISTRATOR);
    }

    model.setData(fieldName, [...parsedSiteRoles]);
    setModel({...model});
  };

  const handleToggleFunction = (siteRole) => {
    if (siteRole === siteRoleConstants.SITE_ROLES.ADMINISTRATOR) {
      return;
    }

    const siteRoles = DataParsingHelper.parseArray(model?.getData(fieldName), []);
    const index = siteRoles.indexOf(siteRole);

    if (index === -1) {
      siteRoles.push(siteRole);
    } else {
      siteRoles.splice(index, 1);
    }

    validateAndSetData(siteRoles);
  };

  const clearDataFunction = () => {
    validateAndSetData([siteRoleConstants.SITE_ROLES.ADMINISTRATOR]);
  };

  const selectAllFunction = () => {
    validateAndSetData([
      siteRoleConstants.SITE_ROLES.ADMINISTRATOR,
      siteRoleConstants.SITE_ROLES.POWER_USER,
      siteRoleConstants.SITE_ROLES.USER,
      siteRoleConstants.SITE_ROLES.AUDITOR,
      siteRoleConstants.SITE_ROLES.SECURITY_MANAGER,
      siteRoleConstants.SITE_ROLES.GUEST,
    ]);
  };

  if (isSaasUser !== false || field == null || visible === false) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InputLabel
        field={field}
        selectAllFunction={selectAllFunction}
        clearDataFunction={clearDataFunction}
      />
      <StandaloneCheckboxInput
        id={`${field?.id}-${siteRoleConstants.SITE_ROLES.ADMINISTRATOR}`}
        value={true}
        disabled={true}
        label={siteRoleConstants.SITE_ROLE_LABELS.ADMINISTRATOR}
      />
      <StandaloneCheckboxInput
        id={`${field?.id}-${siteRoleConstants.SITE_ROLES.POWER_USER}`}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.POWER_USER)}
        disabled={disabled}
        label={siteRoleConstants.SITE_ROLE_LABELS.POWER_USER}
        setDataFunction={() => handleToggleFunction(siteRoleConstants.SITE_ROLES.POWER_USER)}
      />
      <StandaloneCheckboxInput
        id={`${field?.id}-${siteRoleConstants.SITE_ROLES.USER}`}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.USER)}
        disabled={disabled}
        label={siteRoleConstants.SITE_ROLE_LABELS.USER}
        setDataFunction={() => handleToggleFunction(siteRoleConstants.SITE_ROLES.USER)}
      />
      <StandaloneCheckboxInput
        id={`${field?.id}-${siteRoleConstants.SITE_ROLES.SECURITY_MANAGER}`}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.SECURITY_MANAGER)}
        disabled={disabled}
        label={siteRoleConstants.SITE_ROLE_LABELS.SECURITY_MANAGER}
        setDataFunction={() => handleToggleFunction(siteRoleConstants.SITE_ROLES.SECURITY_MANAGER)}
      />
      <StandaloneCheckboxInput
        id={`${field?.id}-${siteRoleConstants.SITE_ROLES.AUDITOR}`}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.AUDITOR)}
        disabled={disabled}
        label={siteRoleConstants.SITE_ROLE_LABELS.AUDITOR}
        setDataFunction={() => handleToggleFunction(siteRoleConstants.SITE_ROLES.AUDITOR)}
      />
      <StandaloneCheckboxInput
        id={`${field?.id}-${siteRoleConstants.SITE_ROLES.GUEST}`}
        value={siteRoles?.includes(siteRoleConstants.SITE_ROLES.GUEST)}
        disabled={disabled}
        label={siteRoleConstants.SITE_ROLE_LABELS.GUEST}
        setDataFunction={() => handleToggleFunction(siteRoleConstants.SITE_ROLES.GUEST)}
      />
    </InputContainer>
  );
}

SiteRoleAccessMultiCheckboxSelectInput.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};