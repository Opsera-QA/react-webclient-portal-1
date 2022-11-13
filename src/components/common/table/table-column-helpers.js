import { format } from "date-fns";
import {
  faCheckCircle,
  faCircle,
  faExclamationCircle,
  faOctagon,
  faPauseCircle,
  faPlay,
  faPlayCircle,
  faSearchPlus,
  faStopCircle,
  faTimesCircle,
  faTrash,
} from "@fortawesome/pro-light-svg-icons";
import { faBitbucket, faGithub, faGitlab, faJira, faSlack } from "@fortawesome/free-brands-svg-icons";
import SuccessIcon from "../../common/icons/table/SuccessIcon";
import WarningIcon from "../../common/icons/table/WarningIcon";
import FailIcon from "../../common/icons/table/FailIcon";
import SuccessMetricIcon from "components/common/icons/metric/success/SuccessMetricIcon";
import DangerMetricIcon from "components/common/icons/metric/danger/DangerMetricIcon";
import React from "react";
import DashboardFavoritesIcon from "components/common/icons/dashboards/DashboardFavoritesIcon";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import { Button } from "react-bootstrap";
import { convertFutureDateToDhmsFromNowString } from "components/common/helpers/date/date.helpers";
import { capitalizeFirstLetter, truncateString } from "components/common/helpers/string-helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { ACCESS_ROLES_FORMATTED_LABELS } from "components/common/helpers/role-helpers";
import AppliedTagBadge from "components/common/badges/tag/AppliedTagBadge";
import NoTrendMetricIcon from "components/common/icons/metric/trend/NoTrendMetricIcon";
import IconBase from "components/common/icons/IconBase";
import PageLinkIcon from "components/common/icons/general/PageLinkIcon";
import { getTimeDisplay } from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";
import PipelineTypeIconBase from "components/common/fields/pipelines/types/PipelineTypeIconBase";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import AccessRoleIconBase from "components/common/fields/access/icon/AccessRoleIconBase";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import CountdownUntilDateFieldBase from "components/common/fields/date/countdown/CountdownUntilDateFieldBase";

export const getDataObjectFromTableRow = (row) => {
  try {
    return DataParsingHelper.parseObject(row?.data[row?.row?.index], {});
  }catch (error) {
    return {};
  }
};

export const getCustomTableHeader = (field) => {
  return field ? field.label : "";
};

export const getCustomTableAccessor = (field) => {
  return field ? field.id : "";
};

export const getTableTextColumnWithoutField = (header, accessor, className) => {
  return {
    Header: header,
    accessor: accessor,
    class: className ? className : undefined
  };
};

export const getTableTextColumn = (field, className) => {
  if (className) {
    return {
      Header: getCustomTableHeader(field),
      accessor: getCustomTableAccessor(field),
      class: className
    };
  }

  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined
  };
};

export const getTableDurationTextColumn = (field, className) => {
  if (className) {
    return {
      Header: getCustomTableHeader(field),
      accessor: getCustomTableAccessor(field),
      class: className,
      Cell: function parseText(row) {
        const value = row?.value;
        return getTimeDisplay(value);
      }
    };
  }

  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined,
    Cell: function parseText(row) {
      const value = row?.value;
      return getTimeDisplay(value);
    }
  };
};

export const getOwnerNameField = (headerText = "Owner Name") => {
  return {
    Header: headerText,
    accessor: "owner_name",
  };
};

export const getSsoUserNameField = (
  headerText = "Name",
  className = "no-wrap-inline",
) => {
  return {
    Header: headerText,
    accessor: "name",
    Cell: function getRoleAccessLevel(row) {
      const dataObject = DataParsingHelper.parseObject(row?.data[row?.row?.index], {});
      return `${dataObject?.firstName} ${dataObject?.lastName}`;
    },
    class: className,
  };
};

export const getLimitedTableTextColumn = (field, maxLength, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined,
    Cell: function parseText(row) {
      const value = row?.value;

      if (value != null) {
        const truncatedString = truncateString(value, maxLength);

        if (truncatedString !== value) {
          return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
        }

        return value;
      }

      return "";
    },
  };
};

export const getFormattedLabelWithFunctionColumnDefinition = (field, formatFunction, className, sendWholeObject) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function formatValue(row) {
      if (formatFunction) {
        if (sendWholeObject === true) {
          return formatFunction(row?.row?.original);
        }

        return formatFunction(row?.value);
      }

      console.error("No valid format function passed into the column definition!");
      return row?.value;
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTaskStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    width: 105,
    Cell: function getTaskStatus(row) {
      const taskStatus = row?.value;
      if (taskStatus == null || taskStatus === "") {
        return (
          <div className="d-flex flex-nowrap">
            <div>{getPipelineStatusIcon("created")}</div>
            <div className="ml-1">Created</div>
          </div>
        );
      }

      return (
        <div className="d-flex flex-nowrap">
          <div>{getPipelineStatusIcon(row)}</div>
          <div className="ml-1">{capitalizeFirstLetter(taskStatus)}</div>
        </div>
      );
    },
    class: className ? className : undefined
  };
};

export const getTagColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const tags = row?.value;

      return (
        <AppliedTagBadge
          className={"group-badge"}
          tags={tags}
        />
      );
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableLeaderColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseLeader(row) {
      return row.value ? `${row.value.name} (${row.value.email})` : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseDate(row) {
      return row.value ? format(new Date(row.value), "yyyy-MM-dd") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateTimeColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseDateTime(row) {
      return row.value ? format(new Date(row.value), "yyyy-MM-dd', 'hh:mm a") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateAndTimeUntilValueColumn = (
  header,
  id,
  fakeColumn = "fakeColumn",
  className,
) => {
  return {
    Header: header,
    accessor: fakeColumn,
    Cell: function parseDate(row) {
      const dataObject = getDataObjectFromTableRow(row);
      const parsedDate = DataParsingHelper.parseNestedDate(dataObject, id);

      if (parsedDate) {
        return (
          <div style={{
            minWidth: "275px",
            width: "275px",
            maxWidth: "275px",
          }}>
            <CountdownUntilDateFieldBase date={parsedDate} />
          </div>
        );
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getPipelineStatusIcon = (row) => {
  switch (row.value) {
    case "failure":
    case "failed":
      return (<IconBase icon={faTimesCircle} className={"cell-icon red my-auto"}/>);
    case "error":
      return (<IconBase icon={faExclamationCircle} className={"cell-icon red my-auto"}/>);
    case "unknown":
      return (<IconBase icon={faCircle} className={"cell-icon yellow my-auto"}/>);
    case "rejected":
      return (<IconBase icon={faStopCircle} className={"cell-icon red my-auto"}/>);
    case "running":
    case "processing event":
      return (<IconBase icon={faPlayCircle} className={"cell-icon green my-auto"}/>);
    case "queued":
      return (<IconBase icon={faPauseCircle} className={"cell-icon green my-auto"}/>);
    case "stopped":
    case "halted":
      return (<IconBase icon={faOctagon} className={"cell-icon red my-auto"}/>);
    case "created":
    default:
      return (<IconBase icon={faCheckCircle} className={"cell-icon green my-auto"}/>);
  }
};

export const getAssociatedPipelineStatusIcon = (pipelineStatus) => {
  switch (pipelineStatus) {
    case "failure":
    case "failed":
      return (<IconBase icon={faTimesCircle} className={"red"} />);
    case "error":
      return (<IconBase icon={faExclamationCircle} className={"red"} />);
    case "unknown":
      return (<IconBase icon={faCircle} className={"yellow"}/>);
    case "rejected":
      return (<IconBase icon={faStopCircle} className={"red"}/>);
    case "running":
    case "processing event":
      return (<IconBase icon={faPlayCircle} className={"green"}/>);
    case "queued":
    case "pending":
      return (<IconBase icon={faPauseCircle} className={"yellow"}/>);
    case "stopped":
    case "halted":
      return (<IconBase icon={faOctagon} className={"red"}/>);
    default:
      return (<IconBase icon={faCheckCircle} className={"green"}/>);
  }
};

export const getPipelineTypeColumn = (field, className) => {
  return {
    Header: "",
    accessor: getCustomTableAccessor(field),
    Cell: function parseType(rowWrapper) {
      const types = rowWrapper?.row?.original?.type;
      let type = "";

      if (Array.isArray(types) && types.length > 0) {
        type = types[0];
      }

      return <PipelineTypeIconBase type={type} />;
    },
    class: className ? className : "cell-center"
  };
};

export const getCustomTablePipelineStateColumnDefinition = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(tableRow) {
      const pipelineState = tableRow?.row?.original[field?.id];

      return (
        <OrchestrationStateFieldBase
          orchestrationState={pipelineState}
          type={"Pipeline"}
        />
      );
    },
    class: className
  };
};

export const getChartPipelineStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      let status = typeof row?.value === "string" ? row.value.toLowerCase() : status;
      switch (status) {
        case "failure":
        case "failed":
          return (<FailIcon />);
        case "unknown":
          return (<WarningIcon/>);
        case "passed":
        case "success":
        case "successful":
          return (<SuccessIcon/>);
        default:
          return status;
      }
    },
    class: className ? className :  undefined
  };
};

export const getChartTrendStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      let status = typeof row?.value === "string" ? row.value.toLowerCase() : "";

      switch (status) {
        case "red":
          return (<DangerMetricIcon />);
        case "neutral":
          return null;
        case "green":
          return (<SuccessMetricIcon />);
        case "-":
          return (<NoTrendMetricIcon />);
        default:
          return status;
      }
    },
    class: className ? className :  undefined
  };
};

export const getStaticIconColumn = (icon, accessor = "row", className) => {
  return {
    Header: "",
    accessor: accessor,
    Cell: function StaticIcon(){
      if (icon) {
        return <IconBase icon={icon} />;
      }

      return "";
    },
    class: className ? className : undefined
  };
};

export const getGitCustodianOriginColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      let status = typeof row?.value === "string" ? row.value.toLowerCase() : "";

      switch (status) {
        case "gitlab":
          return (
            <TooltipWrapper innerText={"Gitlab"}>
              <div style={{ marginLeft: '15%' }}>
                <IconBase
                  icon={faGitlab}
                  iconClassName={"opsera-yellow cell-icon vertical-align-item"}
                />
              </div>
            </TooltipWrapper>
          );
        case "github":
          return (
            <TooltipWrapper innerText={"GitHub"}>
              <div style={{ marginLeft: '15%' }}>
                <IconBase
                  icon={faGithub}
                  iconClassName={"black cell-icon vertical-align-item"}
                />
              </div>
            </TooltipWrapper>
          );
        case "bitbucket":
          return (
            <TooltipWrapper innerText={"Bitbucket"}>
              <div style={{ marginLeft: '15%' }}>
                <IconBase
                  icon={faBitbucket}
                  iconClassName={"bitbucket-color cell-icon vertical-align-item"}
                />
              </div>
            </TooltipWrapper>
          );
        case "jira":
          return (
            <TooltipWrapper innerText={"Jira"}>
              <div style={{ marginLeft: '15%' }}>
                <IconBase
                  icon={faJira}
                  iconClassName={"bitbucket-color cell-icon vertical-align-item"}
                />
              </div>
            </TooltipWrapper>
          );
        case "slack":
          return (
            <TooltipWrapper innerText={"Slack"}>
              <div style={{ marginLeft: '15%' }}>
                <IconBase
                  icon={faSlack}
                  iconClassName={"opsera-yellow cell-icon vertical-align-item"}
                />
              </div>
            </TooltipWrapper>
          );
        default:
          return status;
      }
    },
    class: className ? className :  undefined
  };
};

export const getTableFavoriteColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getFavoritesIcon(row) {
      return <DashboardFavoritesIcon key={row.row.original._id} dashboard={row.row.original} dashboardsActions={dashboardsActions} />;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableDeleteColumn = (headerText, deleteFunction, className) => {
  return {
    Header: headerText,
    Cell: function getDeleteIcon(row) {
      return (
        <IconBase
          icon={faTrash}
          className={"pointer danger-red"}
          onClick={() => {deleteFunction(row?.data[row?.row?.index]); }}
        />
      );
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className, buttonClassName) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getTableButton(row) {
      return <Button size={"sm"} variant={variant} className={buttonClassName} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}}>{buttonText}</Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getGitTaskTableRunButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getRunButton(row) {
      return (
        <Button size={"sm"} variant={variant} disabled={row?.data[row?.row?.index].status === "running"} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}} >
          {row?.data[row?.row?.index].status === "running"
            ? (<span><IconBase isLoading={true} className={"mr-1"} />Running</span>)
            : (<span><IconBase icon={faPlay} className={"mr-1"}/>{buttonText}</span>)
          }
        </Button>
      );
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getDeletePlatformToolTableButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getDeleteButton(row) {
      return <Button size={"sm"} variant={variant} disabled={row?.data[row?.row?.index].toolStatus !== "ACTIVE"} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}} >
        {buttonText}
      </Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getPipelineActivityStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: (text) => {
      const parsedText = DataParsingHelper.parseString(text);
      if (!parsedText) {
        return (
          <span>
          <i className={"fal fa-question-circle cell-icon vertical-align-item"} />
          <span className={"ml-1"}>Unknown</span>
        </span>
        );
      }

      return (
        <span>
          <i className="fal ${getPipelineStatusIconCss(text)} cell-icon vertical-align-item" />
          <span className={"ml-1"}>${capitalizeFirstLetter(text)}</span>
        </span>
      );
    },
    class: className ? className : undefined
  };
};

export const getUppercaseTableTextColumn = (field, className, maxWidth = undefined ) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: (row) => {
      return capitalizeFirstLetter(row?.value);
    },
    class: className,
    maxWidth: maxWidth
  };
};


// TODO: Should we show nothing if not === false?
export const getTableBooleanIconColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getStatusIcon(row) {
      if (row?.value === true) {
        return (
          <div>
            <IconBase icon={faCheckCircle} className={"green ml-2"} />
          </div>
        );
      }

      return (
        <div>
          <IconBase icon={faTimesCircle} className={"red ml-2"} />
        </div>
      );
    },
    class: className ? className : "text-left"
  };
};

export const getTableInfoIconColumn = (showInformationFunction, accessor = "row", className) => {
  return {
    Header: "Info",
    accessor: accessor,
    Cell: function getInfoIcon(row) {
      if (typeof showInformationFunction !== "function") {
        return (
          <IconBase
            icon={faSearchPlus}
          />
        );
      }

      return (
        <IconBase
          icon={faSearchPlus}
          className={"pointer"}
          onClickFunction={() => {showInformationFunction(row?.data[row?.row?.index]); }}
        />
      );
    },
    class: className ? className : undefined
  };
};

// This just takes the data field and returns the count inside the array
export const getTableArrayCountColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getCount(row) {
      return Array.isArray(row?.value) ? row.value.length : "";
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getCountColumnWithoutField = (header, accessor, className) => {
  return {
    Header: header,
    accessor: accessor,
    Cell: function getCount(row) {
      return row.value.length;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

// TODO: Combine with the below
export const getRoleAccessLevelColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getRoleAccessLevel(row) {
      const roles = row?.data[row?.row?.index]?.roles;
      const text = row?.value;

      if (text == null) {
        return `${ACCESS_ROLES_FORMATTED_LABELS.no_roles_assigned}`;
      }

      const accessLevel = ACCESS_ROLES_FORMATTED_LABELS[text];

      if (accessLevel) {
        return `${accessLevel}`;
      }

      if (!Array.isArray(roles) || roles.length === 0) {
        return `${ACCESS_ROLES_FORMATTED_LABELS.no_access_rules}`;
      }

      return "ROLE ACCESS LEVEL UNKNOWN";
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getRoleAccessColumn = (
  type,
  headerText = "Access",
  rolesField = "roles",
  className = "no-wrap-inline",
) => {
  return {
    Header: headerText,
    accessor: rolesField,
    Cell: function getRoleAccessLevel(row) {
      const roles = DataParsingHelper.parseArray(row?.value, []);
      const owner = row?.data[row?.row?.index]?.owner;

      return (
        <AccessRoleIconBase
          roles={roles}
          owner={owner}
          type={type}
        />
      );
    },
    class: className,
  };
};

export const getStaticInfoColumn = (icon, accessor = "row", className) => {
  return {
    Header: "",
    accessor: accessor,
    Cell: function StaticIcon(){
      return <IconBase icon={faSearchPlus} />;
    },
    class: className ? className : undefined
  };
};

export const getExternalLinkIconColumnDefinition = (field, linkText, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getPageLink(row){
      return (
        <PageLinkIcon
          pageLink={row?.value}
          externalLink={true}
          pageLinkText={linkText}
        />
      );
    },
    class: className ? className : undefined
  };
};

export const getGitCustodianExternalLinkIconColumnDefinition = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getPageLink(row){
      return row?.value?.url ?
        (
          <PageLinkIcon
            pageLink={row?.value?.url}
            externalLink={true}
            pageLinkText={row?.value?.key}
          />
        ) : (row?.value?.key || "");
    },
    class: className ? className : undefined
  };
};

export const getUserObjectRoleLevelColumnDefinition = (userObject, className) => {
  return {
    Header: "Assigned Role",
    accessor: "row",
    Cell: function getPageLink(row){
      const parsedUserObject = DataParsingHelper.parseObject(userObject);

      if (!parsedUserObject) {
        return "";
      }

      const parsedEmail = DataParsingHelper.parseEmailAddress(parsedUserObject.email);
      const parsedUserGroups = DataParsingHelper.parseArray(parsedUserObject.groups);

      const object = getDataObjectFromTableRow(row);
      const objectRoles = DataParsingHelper.parseArray(object?.roles, []);
      const parsedRole = ObjectAccessRoleHelper.calculateUserObjectRole(
        parsedEmail,
        parsedUserGroups,
        objectRoles
      );

      return (DataParsingHelper.parseString(ObjectAccessRoleHelper.getLabelForAccessRole(parsedRole), ""));
    },
    class: className,
  };
};

export const getGroupRoleLevelColumnDefinition = (group, className) => {
  return {
    Header: "Assigned Role",
    accessor: "row",
    Cell: function getPageLink(row){
      const parsedGroup = DataParsingHelper.parseString(group);

      if (!parsedGroup) {
        return "";
      }

      const object = getDataObjectFromTableRow(row);
      const parsedRole = ObjectAccessRoleHelper.getGroupRoleLevel(
        parsedGroup,
        object,
      );

      return (DataParsingHelper.parseString(ObjectAccessRoleHelper.getLabelForAccessRole(parsedRole), ""));
    },
    class: className,
  };
};

export const getGitCustodianScmLinkIconColumnDefinition = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getPageLink(row){

      return (
        <PageLinkIcon
          pageLink={row?.value}
          externalLink={true}
          pageLinkText={""}
        />
      );
    },
    class: className ? className : undefined
  };
};

export const getPathDefinition = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getPath(row){
      const path = row?.value;
      return (<TooltipWrapper innerText={path}><span>{truncateString(path, 50, true)}</span></TooltipWrapper>);
    },
    class: className ? className : undefined
  };
};