import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";

import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import InlineSfdcComponentTypesFilter from "components/common/filters/sfdc/sfdc_component/InlineSfdcComponentTypesFilter";
import VanityTable from "components/common/table/VanityTable";
import axios from "axios";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import SfdcRulesInputContainer from "components/common/inputs/rules/sfdc_pipeline_wizard/SfdcRulesInputContainer";
import {isEquals} from "components/common/helpers/array-helpers";

const GitModifiedFilesTabView = (
  {
    componentType,
    pipelineId,
    stepId,
    ruleList,
    setRecordId,
    setRuleList
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const fields = sfdcTableConstants.fields;
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [gitModified, setGitModified] = useState([]);
  const [gitFilterDto, setGitFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [isLoading, setIsLoading] = useState(false);
  const [gitWarningMessage, setGitWarningMessage] = useState("");

  // TODO: Remove after node-side status fix
  const [rulesReloading, setRulesReloading] = useState(false);
  const [reloadCancelToken, setReloadCancelToken] = useState(undefined);

  let timerIds = [];

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

  useEffect(() => {
    if (reloadCancelToken) {
      reloadCancelToken.cancel();
    }

    const source = axios.CancelToken.source();
    setReloadCancelToken(source);

    if (isLoading !== true && isMounted?.current === true) {
      rulesReload(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
    };
  }, [ruleList]);

  const rulesReload = async (cancelSource = cancelTokenSource, newFilterDto = gitFilterDto) => {
    try {
      if (isMounted?.current === true) {
        setRulesReloading(true);
        newFilterDto?.setData("currentPage", 1);
        await getModifiedFiles(cancelSource, newFilterDto);
      }
    }
    catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      setRulesReloading(false);
    }
  };

  const loadData = async (cancelSource = cancelTokenSource, newFilterDto = gitFilterDto) => {
    try {
      setIsLoading(true);
      setGitWarningMessage("");
      await gitPolling(cancelSource, newFilterDto);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const gitPolling = async (cancelSource = cancelTokenSource, newFilterDto = gitFilterDto, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const gitResponse = await getModifiedFiles(cancelSource, newFilterDto);

    if (!gitResponse?.data?.data?.gitErrorMessage &&
      (!gitResponse?.data?.data?.gitCommitList || gitResponse?.data?.data?.gitCommitList?.length === 0)
      && count < 5) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      count++;
      return await gitPolling(cancelSource, newFilterDto, count);
    }
  };

  const getModifiedFiles = async (cancelSource = cancelTokenSource, newFilterDto = gitFilterDto) => {
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      dataType: "sfdc-packageXml",
      fetchAttribute: "gitCommitList",
      rules: ruleList,
      page: newFilterDto ? newFilterDto.getData("currentPage") : 0,
      size: newFilterDto ? newFilterDto.getData("pageSize") : 3000,
      search: newFilterDto ? newFilterDto.getData("search") : "",
      classFilter: newFilterDto ? newFilterDto.getData("classFilter") : ""
    };

    const gitResponse = await sfdcPipelineActions.getListFromPipelineStorageV2(getAccessToken, cancelSource, postBody);

    if (isMounted?.current === true && gitResponse) {
      if(gitResponse?.data?.data?.gitErrorMessage){
        toastContext.showInlineErrorMessage("Git Fetch Error : "+ gitResponse.data.data.gitErrorMessage);
      }

      if (!gitResponse?.data?.data) {
        toastContext.showInlineErrorMessage("something went wrong! not a valid object");
      }

      if (gitResponse?.data?.data?.gitCommitList) {
        let newGitFilterDto = gitFilterDto;
        newGitFilterDto.setData("totalCount", gitResponse.data.data.gitCommitList.count);
        newGitFilterDto.setData("activeFilters", newGitFilterDto.getActiveFilters());
        setGitFilterDto({ ...newGitFilterDto });
        setGitModified(gitResponse.data.data.gitCommitList.data);

        //storing _id so that we can edit this object
        setRecordId(gitResponse.data._id);


        if (Array.isArray(gitResponse.data.data.gitCommitList.data) && gitResponse.data.data.gitCommitList.data.length > 0) {
          setIsLoading(false);
        }
      }
    }

    return gitResponse;
  };

  const getPostBody = () => {
    return (
      {
        pipelineId: pipelineId,
        stepId: stepId,
        dataType: "sfdc-packageXml",
        fetchAttribute: "gitCommitList",
      }
    );
  };

  const gitColumnsWithCheckBoxCell = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "commitAction";})),
      getTableTextColumn(fields.find(field => { return field.id === "componentType";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedFile";}), "force-text-wrap"),
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy";})),
    ],
    [],
  );

  const getGitModifiedFilesView = () => {
    return (  
      <div>
        <VanityTable
          columns={gitColumnsWithCheckBoxCell}
          data={gitModified}
          isLoading={isLoading || rulesReloading}
          loadData={loadData}
          noDataMessage={sfdcTableConstants?.noDataMessage}
          paginationModel={gitFilterDto}
          setPaginationModel={setGitFilterDto}
        />
      </div>
    );
  };

  const getGitInlineFilters = () => {
    return (
      <div className="px-2 d-flex small">
        <div><InlineSfdcComponentTypesFilter className={"mr-2"} componentTypes={componentType} filterDto={gitFilterDto} setFilterDto={setGitFilterDto} inline={true} /></div>
      </div>
    );
  };

  return (
    <>
      <div className={"my-4"}>
        <SfdcRulesInputContainer ruleList={ruleList} setRuleList={setRuleList} postBody={getPostBody()} isGitTab={true} />
      </div>
      <InlineWarning warningMessage={gitWarningMessage} className="pl-3" />
      <FilterContainer
        loadData={loadData}
        filterDto={gitFilterDto}
        setFilterDto={setGitFilterDto}
        isLoading={isLoading || rulesReloading}
        title={"GIT Files"}
        titleIcon={faCode}
        body={getGitModifiedFilesView()}
        supportSearch={true}
        inlineFilters={getGitInlineFilters()}
      />
    </>
  );
};

GitModifiedFilesTabView.propTypes = {
  componentType: PropTypes.arrayOf(PropTypes.object),
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  gitTaskId: PropTypes.string,
  ruleList: PropTypes.array,
  setRecordId: PropTypes.func,
  setRuleList: PropTypes.func
};

export default GitModifiedFilesTabView;