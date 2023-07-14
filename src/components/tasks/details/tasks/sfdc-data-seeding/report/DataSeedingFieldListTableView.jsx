import React, { useState, useCallback } from 'react';
import PropTypes from "prop-types";
import IconBase from "../../../../../common/icons/IconBase";
import { faChevronDown, faChevronRight } from "@fortawesome/pro-solid-svg-icons";

const DataSeedingFieldListTableView = ({ listOfFields }) => {
  const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle];
  };

console.log(listOfFields);
  const [toggle, setToggle] = useToggle();
  const listItems = listOfFields?.map((item, index) => {
    if (item?.isExternalId || item?.isMock) {
      return (
        <li
          className={"mt-3"}
          key={index.toString()}
        >
          {item?.name}
          {item?.isMock ? (
            <div
              className={"badge badge-secondary mr-2 ml-2"}
              style={{ fontSize: "10px", letterSpacing: "0.6px" }}
            >
              MOCK
            </div>
          ) : null}
          {item?.isExternalId ? (
            <div
              className={"badge badge-secondary mr-2 ml-2"}
              style={{ fontSize: "10px", letterSpacing: "0.6px" }}
            >
              External Ref ID
            </div>
          ) : null}
        </li>
      );
    }
  });

  return (
    <div>
      {listOfFields && listOfFields.length > 0 ? (
        <span
          className="text-muted"
          style={{ cursor: "pointer" }}
          onClick={setToggle}
        >
          Expand Field List
          {toggle ? (
            <IconBase
              icon={faChevronDown}
              iconSize={"sm"}
            />
          ) : (
            <IconBase
              icon={faChevronRight}
              iconSize={"sm"}
            />
          )}
        </span>
      ) : (
        <span className="text-muted">No Fields</span>
      )}
      {toggle && <ul>{listItems}</ul>}
    </div>
  );
};

DataSeedingFieldListTableView.propTypes = {
  listOfFields: PropTypes.array,
};

export default DataSeedingFieldListTableView;