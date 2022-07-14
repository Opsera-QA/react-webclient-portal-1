import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import { faFilter } from "@fortawesome/pro-light-svg-icons/faFilter";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import chartsActions from "components/insights/charts/charts-actions";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import GitCustodianTableMetaData from "../table/gitCustodianTableMetaData";
import LoadingDialog from "components/common/status_notifications/loading";
import DateRangeInput from "components/common/inputs/date/DateRangeInput";

function GitCustodianFiltersMultiSelectOverlay({ showModal, filterModel, setFilterModel, saveDataFunction }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  const [authorsFilterData, setAuthorsFilterData] = useState([]);
  const [servicesFilterData, setServicesFilterData] = useState([]);
  const [repositoriesFilterData, setRepositoriesFilterData] = useState([]);
  const [statusFilterData, setStatusFilterData] = useState([]);
  const [emailFilterData, setEmailFilterData] = useState([]);
  const [typeFilterData, setTypeFilterData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [gitCustodianFilterModel, setGitCustodianFilterModel] = useState(new Model({ ...filterModel.getPersistData() }, GitCustodianTableMetaData, false));

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
      await getFilters(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage("Could not load filters.");
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getFilters = async (cancelSource) => {
    const filterResponse = await chartsActions.getGitCustodianFilters(
      getAccessToken,
      cancelSource
    );
    const filterResponseData = filterResponse?.data?.data?.data?.[0];
    if (isMounted.current === true && filterResponseData) {
      const authorsData = filterResponseData?.authors ? filterResponseData?.authors : [];
      const repositoriesData = filterResponseData?.repositories ? filterResponseData?.repositories : [];
      const statusData = filterResponseData?.status ? filterResponseData?.status : [];
      const serviceData = filterResponseData?.service ? filterResponseData?.service : [];
      const emailData = filterResponseData?.email ? filterResponseData?.email : [];
      const typeData = filterResponseData?.type ? filterResponseData?.type : [];
      setAuthorsFilterData(authorsData);
      setRepositoriesFilterData(repositoriesData);
      setStatusFilterData(statusData);
      setServicesFilterData(serviceData);
      setEmailFilterData(emailData);
      setTypeFilterData(typeData);
    }
  };

  const handleSave = async () => {
    await saveDataFunction(gitCustodianFilterModel);    
    closePanel();
  };

  const getFilteredRepositories = () => {
    const services = gitCustodianFilterModel?.getData("service");
    if (!services?.length > 0) {
      return [];
    }
    return repositoriesFilterData.filter(repo => services.includes(repo.service));
  };

  const getFiltersInput = () => {
    if (isLoading) {
      return (<LoadingDialog />);
    }
    return (
      <div>
        <TagMultiSelectInput
          dataObject={gitCustodianFilterModel}
          setDataObject={setGitCustodianFilterModel}
          fieldName={"tags"}
        />
        <MultiSelectInputBase
          fieldName={"authors"}
          placeholderText={"Filter by Authors"}
          dataObject={gitCustodianFilterModel}
          setDataObject={setGitCustodianFilterModel}          
          selectOptions={authorsFilterData}
          textField="author"
          valueField="author"
          disabled={gitCustodianFilterModel?.getData("email")?.length > 0}
        />
        <MultiSelectInputBase
          fieldName={"email"}
          placeholderText={"Filter by Email"}
          dataObject={gitCustodianFilterModel}
          setDataObject={setGitCustodianFilterModel}          
          selectOptions={emailFilterData}
          textField="email"
          valueField="email"
          disabled={gitCustodianFilterModel?.getData("authors")?.length > 0}
        />
        <MultiSelectInputBase
          fieldName={"service"}
          placeholderText={"Filter by Origin"}
          dataObject={gitCustodianFilterModel}
          setDataObject={setGitCustodianFilterModel}          
          selectOptions={servicesFilterData}
          textField="service"
          valueField="service"
        />
        <MultiSelectInputBase
          fieldName={"repositories"}
          placeholderText={"Filter by Repository"}
          dataObject={gitCustodianFilterModel}
          setDataObject={setGitCustodianFilterModel}          
          selectOptions={getFilteredRepositories()}
          textField="repository"
          valueField="repository"
        />
        <MultiSelectInputBase
          fieldName={"type"}
          placeholderText={"Filter by Issue Type"}
          dataObject={gitCustodianFilterModel}
          setDataObject={setGitCustodianFilterModel}          
          selectOptions={typeFilterData}
          textField="type"
          valueField="type"
        />
        <MultiSelectInputBase
          fieldName={"status"}
          placeholderText={"Filter by Status"}
          dataObject={gitCustodianFilterModel}
          setDataObject={setGitCustodianFilterModel}          
          selectOptions={statusFilterData}
          textField="status"
          valueField="status"
        />
        <div>
          <DateRangeInput dataObject={gitCustodianFilterModel} setDataObject={setGitCustodianFilterModel} fieldName={"date"} />
        </div>
      </div>
    );
  };

  const getButtonContainer = () => {
    return (
      <div className={"p-3 bg-white"}>
        <SaveButtonContainer>
          <CancelButton
            cancelFunction={closePanel}
            size={"md"}
            className={"mr-2"}
          />
          <LenientSaveButton
            recordDto={gitCustodianFilterModel}
            updateRecord={handleSave}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleIcon={faFilter}
      titleText={`Edit Git Custodian Filters`}
      showCloseButton={false}
      showPanel={true}
      buttonContainer={getButtonContainer()}
      size={"small"}
    >
      <div className="m-3">
        {toastContext.getInlineBanner()}
        <div className="p-3">
          {getFiltersInput()}
        </div>
      </div>
    </CenterOverlayContainer>
  );
}

GitCustodianFiltersMultiSelectOverlay.propTypes = {
  showModal: PropTypes.bool,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  saveDataFunction: PropTypes.func,
};

export default GitCustodianFiltersMultiSelectOverlay;
