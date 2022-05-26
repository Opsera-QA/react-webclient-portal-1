import React, {useEffect, useState, useRef, useContext, useMemo} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "../../../../contexts/AuthContext";
import LoadingIcon from "../../../common/icons/LoadingIcon";
import CustomTable from "../../../common/table/CustomTable";
import {
  getTableTextColumn,
  getTableDateTimeColumn,
  getGitCustodianOriginColumn,
  getTableBooleanIconColumn
} from "../../../common/table/table-column-helpers";
import { getDurationInDaysHours } from "components/common/table/table-column-helpers-v2";
import {getField} from "../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {faDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "../../../common/tooltip/TooltipWrapper";
import Button from "react-bootstrap/Button";
import IconBase from "../../../common/icons/IconBase";
import FilterContainer from "../../../common/table/FilterContainer";
import GitCustodianNewJiraTicketModal from "../modal/GitCustodianNewJiraTicketModal";
import chartsActions from "../../charts/charts-actions";
import GitCustodianTableMetaData from "./gitCustodianTableMetaData";
import Model from "../../../../core/data_model/model";

function GitCustodianTable({ gitCustodianData, gitCustodianFilterModel, setGitCustodianFilterModel }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [responseData, setResponseData] = useState([]);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({...GitCustodianTableMetaData.newObjectFields}, GitCustodianTableMetaData, true)
  );


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
  }, [JSON.stringify(gitCustodianData)]);

  const noDataMessage = "No data found";

  const fields = GitCustodianTableMetaData.fields;

  const columns = useMemo(
    () => [
      getTableDateTimeColumn(getField(fields, "commitDate")),
      getTableTextColumn(getField(fields, "author")),
      getTableTextColumn(getField(fields, "path")),
      getTableTextColumn(getField(fields, "lineNumber")),
      getGitCustodianOriginColumn(getField(fields, "service")),
      getDurationInDaysHours(getField(fields, "exposedHours")),
      getTableTextColumn(getField(fields, "type")),
      getTableBooleanIconColumn(getField(fields, "jiraTicket"))
    ],
    []
  );
  const loadData = async (cancelSource = cancelTokenSource, filterDto = gitCustodianFilterModel) => {
    try {
      setIsLoading(true);
      let tableResponseData = await chartsActions.getGitCustodianTableData(
        getAccessToken,
        cancelSource,
        gitCustodianData
      );
      let tableResponse = tableResponseData?.data?.data;
      if (isMounted?.current === true && Array.isArray(tableResponse?.data)) {
        setResponseData(tableResponse?.data);
      }
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", tableResponse?.count);
      setGitCustodianFilterModel({...newFilterDto});
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const exportData = async () => {
    try {
      await chartsActions.exportGitCustodianData(getAccessToken, cancelTokenSource, gitCustodianData);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  const createNewJiraTicket = () => {
    toastContext.showOverlayPanel(
      <GitCustodianNewJiraTicketModal
        gitCustodianData={gitCustodianData}
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const getBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading Data</div>;
    }
    return (
      <>
        {getTable()}
      </>
    );
  };
  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={responseData}
        noDataMessage={noDataMessage}
        loadData={loadData}
        paginationDto={gitCustodianFilterModel}
        setPaginationDto={setGitCustodianFilterModel}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={'Vulnerable Commits'}
      addRecordFunction={createNewJiraTicket}
      type={'Jira Ticket'}
      body={getBody()}
      metadata={gitCustodianData}
      supportSearch={false}
      className={"px-2 pb-2"}
      showRefreshButton={false}
      disableNewRecordButton={responseData?.length === 0}
      exportButton={
        <TooltipWrapper innerText={"Export CSV"}>
          <div className={"mx-2"}>
            <Button
              variant={"outline-primary"}
              size={"sm"}
              onClick={exportData}
              disabled={isLoading || responseData?.length === 0}>
              <span><IconBase icon={faDownload}/></span>
            </Button>
          </div>
        </TooltipWrapper>
      }
    />
  );
}

GitCustodianTable.propTypes = {
  gitCustodianData: PropTypes.object,
  gitCustodianFilterModel: PropTypes.object,
  setGitCustodianFilterModel: PropTypes.func
};

export default GitCustodianTable;