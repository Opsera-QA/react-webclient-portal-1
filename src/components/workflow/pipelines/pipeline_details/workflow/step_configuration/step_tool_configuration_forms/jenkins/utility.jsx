import React from "react";
import { Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: This code is duplicated all over and also should be a React component. Revisit soon.
// TODO: Use the tool info overlay instead
export const RegistryPopover = (data) => {
    if (data) {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <IconBase icon={faTimes} className={"fa-pull-right pointer"} onClickFunction={() => document.body.click()} />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and account specific settings are stored in the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new entry to a dropdown or update settings,
              make those changes there.
            </div>
            {data.configuration && (
              <>
                {Object.entries(data.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1]!=null && a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span> {a[1]}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </Popover.Content>
        </Popover>
      );
    } else {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <IconBase icon={faTimes} className={"fa-pull-right pointer"} onClickFunction={() => document.body.click()} />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">Please select any tool/account to get the details.</div>
          </Popover.Content>
        </Popover>
      );
    }
  };
