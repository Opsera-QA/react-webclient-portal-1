import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { githubActions } from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { parseError } from "components/common/helpers/error-helpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

const ScmToScmMigrationStandaloneOrganizationSelectInput = ({ value,  disabled, setDataFunction, service, gitToolId, setErrorMessage }) => {
  
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    if (!disabled && isMongoDbId(gitToolId) === true && hasStringValue(service))
    {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [service, gitToolId, searchTerm]);

  const loadData = async (cancelSource) => {
    try {
      setError(undefined);
      setErrorMessage("");
      setIsLoading(true);
      setOrganizations([]);
      setDataFunction("");

      await loadGithubOrganizations(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setError(parsedError);
        setErrorMessage(parsedError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadGithubOrganizations = async (cancelSource) => {
    const response = await githubActions.getOrganizations(
      getAccessToken,
      cancelSource,
      gitToolId,
      searchTerm,
    );

    if (response == null) {
      return false;
    }

    const organizations = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(organizations)) {
      setOrganizations(organizations);
    }
  };

  const lazyLoadSearchFunction = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <StandaloneSelectInput
      selectOptions={organizations}
      value={value}
      busy={isLoading}
      placeholderText="Select Target Organization"
      setDataFunction={(data) => setDataFunction(data)}
      valueField={"organization"}
      textField={"organization"}
      onSearchFunction={lazyLoadSearchFunction}
      hasErrorState={hasStringValue(error) === true}
      disabled={isLoading || !service || !gitToolId}
    />
  );
};

ScmToScmMigrationStandaloneOrganizationSelectInput.propTypes = {
  gitToolId: PropTypes.string,
  service: PropTypes.string,
  value: PropTypes.string,  
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  setErrorMessage: PropTypes.func,
};

export default ScmToScmMigrationStandaloneOrganizationSelectInput;
