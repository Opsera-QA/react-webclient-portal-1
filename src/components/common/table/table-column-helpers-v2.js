import { format } from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import {
  faCheckCircle,
  faCircle, faOctagon,
  faPause, faPauseCircle, faPlayCircle, faSearchPlus,
  faSpinner,
  faStop,
  faStopCircle,
  faTimesCircle, faTrash, faPlay, faTag
} from "@fortawesome/pro-light-svg-icons";
import SuccessIcon from "../../common/icons/table/SuccessIcon";
import WarningIcon from "../../common/icons/table/WarningIcon";
import FailIcon from "../../common/icons/table/FailIcon";
import React from "react";
import Model from "core/data_model/model";
import PipelineTypesField from "components/common/form_fields/pipelines/PipelineTypesField";
import PipelineStatus from "components/workflow/pipelines/PipelineStatus";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import DashboardFavoritesIcon from "components/common/icons/dashboards/DashboardFavoritesIcon";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {Button} from "react-bootstrap";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {convertFutureDateToDhmsFromNowString} from "components/common/helpers/date-helpers";
import {capitalizeFirstLetter, truncateString} from "components/common/helpers/string-helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";

export const FILTER_TYPES = {
  SEARCH_FILTER: "inputFilter",
  SELECT_FILTER: "selectFilter",
};

const getColumnHeader = (field) => {
  return field ? [{ text: field.label }] : [{ text: "" }];
};

const getColumnId = (field) => {
  return field ? field.id : "";
};

export const getTableTextColumnWithoutField = (header, id) => {
  return {
    header: header,
    id: id
  };
};

export const getTableTextColumn = (field, className, maxWidth = undefined, filterType ) => {
  let header = getColumnHeader(field);

  if (filterType) {
    header.push({ content: filterType });
  }

  return {
    header: header,
    id: getColumnId(field),
    class: className ? className : undefined,
    maxWidth: maxWidth
  };
};

export const getLimitedTableTextColumn = (field, maxLength, className, autoAdjust = true) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    class: className ? className : undefined,
    adjust: autoAdjust,
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

export const getEditableTextColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    class: className ? className : undefined,
    editable: true,
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


export const getStringifiedArrayColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return JSON.stringify(array);
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getLimitedStringifiedArrayColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        const value = JSON.stringify(array);
        const truncatedString = truncateString(value ,maxLength);
        
        if (truncatedString !== value) {
          return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
        }

        return value;
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getNameValueArrayColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.name}:${item.value}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getRoleArrayColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.role}:${item.user}:${item.group}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getContactArrayColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.name}:${item.email}:${item.user_id}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getLimitedContactArrayColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
          const valueArr = array.map((item, index) => {
            return (`${item.name}:${item.email}:${item.user_id}${array.length > index + 1 ? ',' : ''}`);
          });

          const value = JSON.stringify(valueArr).replace(/[["\]]/g,'');

          const truncatedString = truncateString(value, maxLength);
          
          if (truncatedString !== value) {
            return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
          }
  
          return value;
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTagColumn = (field, maxShown = 2, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        const tags =
          <CustomBadgeContainer>
            {array.map((tag, index) => {
              if (typeof tag !== "string") {
                return (
                  <CustomBadge
                    badgeText={<span><span
                      className="mr-1">{capitalizeFirstLetter(tag.type)}:</span>{capitalizeFirstLetter(tag.value)}</span>}
                    icon={faTag}
                    key={index}
                  />
                );
              }
            })}
          </CustomBadgeContainer>;

        return (
          <TooltipWrapper innerText={maxShown < array.length ? tags : null} title={"Tags"}>
            <div>
              <span className="item-field">
              {array.map((tag, index) => {
                if (index + 1 > maxShown) {
                  return;
                }

                return (
                  <span key={index}>
                    <span className="mr-1 badge badge-light group-badge">
                      {capitalizeFirstLetter(tag.type)}: {capitalizeFirstLetter(tag.value)}
                    </span>
                  </span>
                );
              })}
                <span>{array.length > maxShown ? "..." : ""}</span>
              </span>
            </div>
          </TooltipWrapper>
        );
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTagArrayColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((tag, index) => {
          return (`${tag.type}: ${tag.value}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getLimitedTagArrayColumn = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        const valueArr = array.map((tag, index) => {
          return (`${tag.type}: ${tag.value}${array.length > index + 1 ? ',' : ''}`);
        });

        const value = JSON.stringify(valueArr).replace(/[["\]]/g,'');

        const truncatedString = truncateString(value, maxLength);

        if (truncatedString !== value) {
          return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
        }

        return value;
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableLeaderColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function parseLeader(row) {
      return row.value ? `${row.value.name} (${row.value.email})` : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateColumn = (field, className, width = 150) => {
  let header = getColumnHeader(field);
  header.push({ content: "inputFilter" });

  return {
    header: header,
    id: getColumnId(field),
    width: width,
    // TODO: Figure out why using date-type right aligns stuff. Documentation says it should be left aligned.
    template: function (text, row, col) {
      return text ? format(new Date(text), "yyyy-MM-dd") : "";
    },
    // type: "date",
    // format: "%Y-%M-%d",
    class: className ? className : ""
  };
};

export const getTableDateTimeColumn = (field, className, width = 175, showFilter) => {
  let header = getColumnHeader(field);

  if (showFilter) {
    header.push({ content: "inputFilter" });
  }

  return {
    header: header,
    id: getColumnId(field),
    width: width,
    // TODO: Figure out why date format isn't working and convert to using that.
    // type: "date",
    // format: "%Y-%M-%d %h:%m %a",/
    template: function (text, row, col) {
      return text ? format(new Date(text), "yyyy-MM-dd', 'hh:mm a") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateAndTimeUntilValueColumn = (header, id, fakeColumn = "fakeColumn", className) => {
  return {
    header: header,
    id: fakeColumn,
    template: row => {
      const originalRow = row.row.original;
      return originalRow[id] ? convertFutureDateToDhmsFromNowString(new Date(originalRow[id])) : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getPipelineActivityStatusColumn = (field, className, showFilter) => {
  let header = getColumnHeader(field);

  if (showFilter) {
    header.push({ content: "selectFilter" });
  }

  return {
    header: header,
    id: getColumnId(field),
    width: 105,
    template: function (text, row, col) {
      if (text == null) {
        return "";
      }

      return (
        `<span>
          <i class="fal ${getPipelineStatusIconCss(text)} cell-icon vertical-align-item"></i>
          <span class="ml-1">${text}</span>
        </span>`
      );
    },
    class: className ? className : undefined
  };
};

export const getPipelineStatusIconCss = (value) => {
  switch (value) {
    case "failure":
    case "failed":
      return ("fa-times-circle red");
    case "unknown":
      return ("fa-circle yellow");
    case "rejected":
      return ("fa-stop-circle red");
    case "running":
    case "processing event":
      return ("fa-play-circle green");
    case "queued":
      return ("fa-pause-circle green");
    case "stopped":
    case "halted":
      return ("fa-octagon red");
    case "passed":
    case "success":
    case "successful":
    default:
      return ("fa-check-circle green");
  }
};

export const getAssociatedPipelineStatusIcon = (pipelineStatus) => {
  switch (pipelineStatus) {
    case "failure":
    case "failed":
      return (<FontAwesomeIcon icon={faTimesCircle} className="red" fixedWidth />);
    case "unknown":
      return (<FontAwesomeIcon icon={faCircle} className="yellow" fixedWidth/>);
    case "rejected":
      return (<FontAwesomeIcon icon={faStopCircle} className="red" fixedWidth/>);
    case "running":
    case "processing event":
      return (<FontAwesomeIcon icon={faPlayCircle} className="green" fixedWidth/>);
    case "queued":
    case "pending":
      return (<FontAwesomeIcon icon={faPauseCircle} className="green" fixedWidth/>);
    case "stopped":
    case "halted":
      return (<FontAwesomeIcon icon={faOctagon} className="red" fixedWidth/>);
    default:
      return (<FontAwesomeIcon icon={faCheckCircle} className="green" fixedWidth/>);
  }
};

export const getPipelineTypeColumn = (field, className) => {
  return {
    header: "",
    id: getColumnId(field),
    Cell: function parseType(workflow) {
      return <PipelineTypesField fieldName={field.id} dataObject={new Model(workflow.row.original, pipelineMetadata, false)} />;
    },
    class: className ? className : "cell-center"
  };
};

export const getTablePipelineStatusColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function parseStatus(workflow) {
      let pipelineStatus = pipelineHelpers.getPipelineStatus(workflow.row.original);

      switch (pipelineStatus) {
      case "failed":
        return (
          <div className="red">
            <PipelineStatus className="red"
                            innerText={"An error has occurred in this pipeline.  See activity logs for details."}
                            icon={faTimesCircle} statusText={"Failed"} tableColumn={true}/>
          </div>
        );
      case "running":
        return (
          <div className="green">
            <PipelineStatus innerText={"A pipeline operation is currently in progress."} icon={faSpinner}
                            statusText={"Running"} tableColumn={true}/>
          </div>
        );
      case "paused":
        return (
          <div className="yellow">
            <PipelineStatus innerText={"The pipeline operation is currently paused."} icon={faPause}
                            statusText={"Paused"} tableColumn={true}/>
          </div>
        );
      case "success":
        return (
          <div className="green">
            <PipelineStatus innerText={"The most recent run of this pipeline was successful."} icon={faCheckCircle}
                            statusText={"Successful"} tableColumn={true}/>
          </div>
        );
      default:
        return (
          <PipelineStatus innerText={"This pipeline is not currently running."} icon={faStop}
                          statusText={"Stopped"} tableColumn={true}/>
        );
      }
    },
    class: className ? className :  "text-left"
  };
};

export const getChartPipelineStatusColumn = (field, className, width = 120) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    width: width,
    template: function (text, row, col) {
      if (text == null) {
        return "";
      }

      return (
        `<span>
          <i class="fal ${getPipelineStatusIconCss(text)} cell-icon vertical-align-item"></i>
          <span class="ml-1">${text}</span>
        </span>`
      );
    },
    class: className ? className : undefined
  };
};

export const getTableFavoriteColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function getFavoritesIcon(row) {
      return <DashboardFavoritesIcon key={row.row.original._id} dashboard={row.row.original} dashboardsActions={dashboardsActions} />;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableDeleteColumn = (headerText, deleteFunction, className) => {
  return {
    header: headerText,
    Cell: function getDeleteIcon(row) {
      return <FontAwesomeIcon icon={faTrash} className="pointer danger-red" onClick={() => {deleteFunction(row?.data[row?.row?.index]); }}/>;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableButtonColumn = (id = "row", headerText, variant, buttonText, buttonFunction, className, buttonClassName) => {
  return {
    header: headerText,
    id: id,
    Cell: function getTableButton(row) {
      return <Button size={"sm"} variant={variant} className={buttonClassName} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}}>{buttonText}</Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getGitTaskTableRunButtonColumn = (id = "row", headerText, variant, buttonText, buttonFunction, className) => {
  return {
    header: headerText,
    id: id,
    Cell: function getRunButton(row) {
      return <Button size={"sm"} variant={variant} disabled={row?.data[row?.row?.index].status === "running"} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}} >
        {row?.data[row?.row?.index].status === "running" ? (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Running </span>) : (<span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/> {buttonText} </span> ) }
        </Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getTableBooleanIconColumn = (field, className, width = 60) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    align: "center",
    width: width,
    template: function (text, row, col) {
      if (text == null) {
        return "";
      }

      const iconCss = text === true ? "fa-check-circle green" : "fa-times-circle red";
      return (
        `<i class="fa ${iconCss} cell-icon vertical-align-item"></i>`
      );
    },
    htmlEnable: true,
    class: className ? className : "text-left"
  };
};

export const getTableInfoIconColumn = (showInformationFunction, id = "row", className) => {
  return {
    header: "Info",
    id: id,
    Cell: function getInfoIcon(row) {
      return <FontAwesomeIcon icon={faSearchPlus} className="pointer" onClick={() => {showInformationFunction(row?.data[row?.row?.index]); }}/>;
    },
    class: className ? className : undefined
  };
};

// This just takes the data field and returns the count inside the array
export const getTableArrayCountColumn = (field, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    Cell: function getCount(row) {
      return row.value.length;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getCountColumnWithoutField = (header, id, className) => {
  return {
    header: header,
    id: id,
    Cell: function getCount(row) {
      return row.value.length;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getCheckBoxColumn = (handleChange) => {
  return {
    header: "",
    id: "row",
    Cell: function getCheckboxForRow(row) {
      const idx = row.row["index"];
      const item = row["data"][idx];
      return <Form.Check
        inline
        type={"checkbox"}
        name={item.committedFile}
        id={idx}
        disabled={item.checkAll}
        checked={!!item.isChecked}
        onChange = {() => {
          item.isChecked = !item.isChecked;
          handleChange(item);
        }}
      />;
    },
  };
};