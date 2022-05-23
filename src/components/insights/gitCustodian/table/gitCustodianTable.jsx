import React, {useEffect, useState, useRef, useContext, useMemo} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import LoadingIcon from "../../../common/icons/LoadingIcon";
import CustomTable from "../../../common/table/CustomTable";
import {
  getTableTextColumn,
  getTableDateTimeColumn,
  getGitCustodianOriginColumn
} from "../../../common/table/table-column-helpers";
import {getField} from "../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import GitCustodianTableMetaData from "./gitCustodianTableMetaData";

function GitCustodianTable({ dashboardData}) {
  const toastContext = useContext(DialogToastContext);
  const [tableFilterDto, setTableFilterDto] = useState(new Model({ ...GitCustodianTableMetaData.newObjectFields }, GitCustodianTableMetaData, false));
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [responseData, setResponseData] = useState([
    {
      "repoId": "17365813",
      "service": "gitlab",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "Merge branch 'datadog' into 'master-dev'\n\nOPL-1863 Add datadog helm chart\n\nSee merge request opsera-repo/cloud-infrastructure/helmcharts!75\n\ncommit 1f02190e591bae7afea4f30d96ce2521fc4b551f\nAuthor: Vignesh Kumar Subramanian <vignesh.ks@opsera.io>\nDate:   Tue Apr 19 15:09:50 2022 +0000\n\nOPL-1863 Add datadog helm chart",
      "commitHash": "645d799933b8c8f6989ce33044831156bcf1d596",
      "commitDate": "2022-04-19T15:09:51.000Z",
      "path": "datadog/honeywell-sandbox-cluster.yaml",
      "lineNumber": 6,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "false"
    },
    {
      "repoId": "17365813",
      "service": "github",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "Datadog work",
      "commitHash": "4447db4ddb95b00a13701614b179f9f3a71edef3",
      "commitDate": "2021-12-21T15:34:57.000Z",
      "path": "datadog/opsera-test-cluster-apm.yaml",
      "lineNumber": 6,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "true"
    },
    {
      "repoId": "17365813",
      "service": "bitbucket",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "adding synthetic locations",
      "commitHash": "d838014b370793ec1a9a0899b1217f728245d741",
      "commitDate": "2022-03-23T19:44:51.000Z",
      "path": "datadog/honeywell-prod-platform.yaml",
      "lineNumber": 6,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "false"
    },
    {
      "repoId": "17365813",
      "service": "slack",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "Merge branch 'datadog' into 'master-dev'\n\nOPL-1863 Add datadog helm chart\n\nSee merge request opsera-repo/cloud-infrastructure/helmcharts!75\n\ncommit 1f02190e591bae7afea4f30d96ce2521fc4b551f\nAuthor: Vignesh Kumar Subramanian <vignesh.ks@opsera.io>\nDate:   Tue Apr 19 15:09:50 2022 +0000\n\nOPL-1863 Add datadog helm chart",
      "commitHash": "645d799933b8c8f6989ce33044831156bcf1d596",
      "commitDate": "2022-04-19T15:09:51.000Z",
      "path": "datadog/opsera-test-cluster.yaml",
      "lineNumber": 7,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "false"
    },
    {
      "repoId": "17365813",
      "service": "gitlab",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "Merge branch 'datadog' into 'master-dev'\n\nOPL-1863 Add datadog helm chart\n\nSee merge request opsera-repo/cloud-infrastructure/helmcharts!75\n\ncommit 1f02190e591bae7afea4f30d96ce2521fc4b551f\nAuthor: Vignesh Kumar Subramanian <vignesh.ks@opsera.io>\nDate:   Tue Apr 19 15:09:50 2022 +0000\n\nOPL-1863 Add datadog helm chart",
      "commitHash": "645d799933b8c8f6989ce33044831156bcf1d596",
      "commitDate": "2022-04-19T15:09:51.000Z",
      "path": "synthetics-private-location/honeywell-prod-cluster-pl-config.json",
      "lineNumber": 7,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "false"
    },
    {
      "repoId": "17365813",
      "service": "gitlab",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "Merge branch 'datadog' into 'master-dev'\n\nOPL-1863 Add datadog helm chart\n\nSee merge request opsera-repo/cloud-infrastructure/helmcharts!75\n\ncommit 1f02190e591bae7afea4f30d96ce2521fc4b551f\nAuthor: Vignesh Kumar Subramanian <vignesh.ks@opsera.io>\nDate:   Tue Apr 19 15:09:50 2022 +0000\n\nOPL-1863 Add datadog helm chart",
      "commitHash": "645d799933b8c8f6989ce33044831156bcf1d596",
      "commitDate": "2022-04-19T15:09:51.000Z",
      "path": "synthetics-private-location/honeywell-prod-cluster-pl-config.json",
      "lineNumber": 7,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "false"
    },
    {
      "repoId": "17365813",
      "service": "gitlab",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "Merge branch 'datadog' into 'master-dev'\n\nOPL-1863 Add datadog helm chart\n\nSee merge request opsera-repo/cloud-infrastructure/helmcharts!75\n\ncommit 1f02190e591bae7afea4f30d96ce2521fc4b551f\nAuthor: Vignesh Kumar Subramanian <vignesh.ks@opsera.io>\nDate:   Tue Apr 19 15:09:50 2022 +0000\n\nOPL-1863 Add datadog helm chart",
      "commitHash": "645d799933b8c8f6989ce33044831156bcf1d596",
      "commitDate": "2022-04-19T15:09:51.000Z",
      "path": "synthetics-private-location/honeywell-prod-cluster-pl-config.json",
      "lineNumber": 7,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "false"
    },
    {
      "repoId": "17365813",
      "service": "gitlab",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "Merge branch 'datadog' into 'master-dev'\n\nOPL-1863 Add datadog helm chart\n\nSee merge request opsera-repo/cloud-infrastructure/helmcharts!75\n\ncommit 1f02190e591bae7afea4f30d96ce2521fc4b551f\nAuthor: Vignesh Kumar Subramanian <vignesh.ks@opsera.io>\nDate:   Tue Apr 19 15:09:50 2022 +0000\n\nOPL-1863 Add datadog helm chart",
      "commitHash": "645d799933b8c8f6989ce33044831156bcf1d596",
      "commitDate": "2022-04-19T15:09:51.000Z",
      "path": "synthetics-private-location/honeywell-prod-cluster-pl-config.json",
      "lineNumber": 7,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "false"
    },
    {
      "repoId": "17365813",
      "service": "gitlab",
      "lastScannedOn": "2022-05-18T12:24:14.218Z",
      "library": "git_custodian",
      "repository": "HelmCharts",
      "runCount": 1,
      "taskId": "6284e17b0300f10012d5cb21",
      "author": "Vignesh Kumar Subramanian",
      "commit": "Merge branch 'datadog' into 'master-dev'\n\nOPL-1863 Add datadog helm chart\n\nSee merge request opsera-repo/cloud-infrastructure/helmcharts!75\n\ncommit 1f02190e591bae7afea4f30d96ce2521fc4b551f\nAuthor: Vignesh Kumar Subramanian <vignesh.ks@opsera.io>\nDate:   Tue Apr 19 15:09:50 2022 +0000\n\nOPL-1863 Add datadog helm chart",
      "commitHash": "645d799933b8c8f6989ce33044831156bcf1d596",
      "commitDate": "2022-04-19T15:09:51.000Z",
      "path": "synthetics-private-location/honeywell-prod-cluster-pl-config.json",
      "lineNumber": 7,
      "updatedDate": "2022-05-18T12:14:29.895Z",
      "status": "Open",
      "exposedFor": "4h, 20m",
      "mainBranch": "false"
    },
  ]);

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
  }, [dashboardData]);

  const noDataMessage = "Git Custodian data is currently unavailable at this time";

  const fields = GitCustodianTableMetaData.fields;

  const columns = useMemo(
    () => [
      getTableDateTimeColumn(getField(fields, "commitDate")),
      getTableTextColumn(getField(fields, "author")),
      getTableTextColumn(getField(fields, "path")),
      getGitCustodianOriginColumn(getField(fields, "service")),
      getTableTextColumn(getField(fields, "exposedFor")),
      getTableTextColumn(getField(fields, "library")),
      getTableTextColumn(getField(fields, "mainBranch"))
    ],
    []
  );
  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", 9);
      setTableFilterDto({...newFilterDto});
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

  const getBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
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
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
      />
    );
  };

  return (
    <div>
      {getBody()}
    </div> );
}

GitCustodianTable.propTypes = {
  dashboardData: PropTypes.object,
};

export default GitCustodianTable;