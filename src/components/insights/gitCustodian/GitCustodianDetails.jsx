import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {AuthContext} from "../../../contexts/AuthContext";
import axios from "axios";
import LoadingDialog from "../../common/status_notifications/loading";
import {parseError} from "../../common/helpers/error-helpers";
import { faShieldKeyhole } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "../../common/table/FilterContainer";
import GitCustodianChartsView from "./charts/GitCustodianChartsView";
import GitCustodianTable from "./table/gitCustodianTable";


function GitCustodianDetails({ gitCustodianData, gitCustodianFilterModel, setGitCustodianFilterModel }) {
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
  }, [JSON.stringify(gitCustodianData)]);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = gitCustodianFilterModel) => {
    try {
      setIsLoading(true);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTable = () => {
    return (
      <GitCustodianTable
        gitCustodianData={gitCustodianData}
        gitCustodianFilterModel={gitCustodianFilterModel}
        setGitCustodianFilterModel={setGitCustodianFilterModel}
      />
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    if (error) {
      return (
        <div className="mx-2" >
          <div className="max-content-width p-5 mt-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className={"-5"}>There was an error loading the data: {parseError(error?.message)}. Please check logs for more details.</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <GitCustodianChartsView gitCustodianData={gitCustodianData}/>
        {getTable()}
      </div>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={'Git Custodian Report'}
      type={'Jira Ticket'}
      body={getBody()}
      titleIcon={faShieldKeyhole}
      metadata={gitCustodianData}
      supportSearch={false}
      filterDto={gitCustodianFilterModel}
      setFilterDto={setGitCustodianFilterModel}
      className={"px-2 pb-2"}
      showRefreshButton={false}
    />
  );
}

GitCustodianDetails.propTypes = {
  gitCustodianData: PropTypes.object,
  setGitCustodianData: PropTypes.func,
  gitCustodianFilterModel: PropTypes.object,
  setGitCustodianFilterModel: PropTypes.func
};

export default GitCustodianDetails;
