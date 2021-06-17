import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import organizationActions from "components/settings/organizations/organization-actions";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";

function OrganizationListInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction, className, clearDataFunction, showLabel}) {
  const { getAccessToken } = useContext(AuthContext);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
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
      await getOrganizations(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage("Could not load organizations.");
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getOrganizations = async (cancelSource = cancelTokenSource) => {
    const response = await organizationActions.getAllOrganizationsV2(getAccessToken, cancelSource);
    let organizations = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(organizations) && organizations.length > 0) {
      setOrganizations(organizations);
    }
  };

  const getPlaceholderText = () => {
    if (errorMessage) {
      return errorMessage;
    }

    return "Select Organizations";
  };

  const searchFunction = (item, searchTerm) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  if (field == null) {
    return null;
  }

  return (
    <ListInputBase
      icon={faSitemap}
      searchFunction={searchFunction}
      className={className}
      fieldName={fieldName}
      disabled={disabled || isLoading}
      setDataFunction={setDataFunction}
      setDataObject={setDataObject}
      clearDataFunction={clearDataFunction}
      textField={"name"}
      valueField={"_id"}
      busy={isLoading}
      dataObject={dataObject}
      showLabel={showLabel}
      placeholderText={getPlaceholderText()}
      selectOptions={organizations}
    />
  );
}

OrganizationListInput.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

export default OrganizationListInput;