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
import { GitCustodianFilterMetadata } from "components/insights/gitCustodian/table/gitCustodianFilter.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import DateRangeInput from "components/common/inputs/date/DateRangeInput";

function GitCustodianFiltersMultiSelectOverlay({ showModal, filterModel, setFilterModel, saveDataFunction }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  const [previousFilter, setPreviousFilter] = useState(null);
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
  const [gitCustodianFilterModel, setGitCustodianFilterModel] = useState(new Model({ ...filterModel.getPersistData() }, GitCustodianFilterMetadata, false));

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    const filters = {
      authors: gitCustodianFilterModel.getData('authors'),
      email: gitCustodianFilterModel.getData('email'),
      service: gitCustodianFilterModel.getData('service'),
      repositories: gitCustodianFilterModel.getData('respositories'),
      type: gitCustodianFilterModel.getData('type'),
      status: gitCustodianFilterModel.getData('status')
    };

    if (JSON.stringify(previousFilter) !== JSON.stringify(filters)) {
      loadData(source, filters)
      .then(() => {
        setPreviousFilter(filters);
      })
      .catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [gitCustodianFilterModel, previousFilter, setPreviousFilter]);

  const loadData = async (cancelSource = cancelTokenSource, filters) => {
    try {
      setIsLoading(true);
      await getFilters(cancelSource, filters);
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

  const getFilters = async (cancelSource, filters) => {
    const filterResponse = await chartsActions.getGitCustodianFilters(
      getAccessToken,
      cancelSource,
      filters
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
          selectOptions={repositoriesFilterData}
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
