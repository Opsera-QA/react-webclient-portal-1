/* This controls layout of the "count" blocks at the top of a dashboard layout
 this accepts a data object with the necessary block values and is only for UI rendering

Expecting data in this format:
[{ name: "Successful Builds", value: "1" footer: "footer text", status: "success" }]

 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { faEllipsisH, faTimes } from "@fortawesome/free-solid-svg-icons";
import DataBlock from "components/common/data_boxes/DataBlock";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import IconBase from "components/common/icons/IconBase";

function SummaryCountBlocksView({ data, view }) {
  useEffect(() => {
    // console.log("Rendering Blocks for data", data);
  }, [data]);
  
  const infoPopover = (item) => {
    return (
      <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
        <Popover.Title as="h3">
          {item.name}
          <IconBase icon={faTimes} className={"fa-pull-right pointer"} onClickFunction={() => document.body.click()} />
        </Popover.Title>
        <Popover.Content>
          <div className="text-muted mb-2">{item.info}</div>
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <>
      {data !== undefined && data.length > 0 ? (
        <DataBlockWrapper>
          {data.map(function (item, index) {
            return (
              <DataBlock
                key={index}
                title={item.value}
                subTitle={item.name}
                toolTipText={item.name}
                statusColor={item.status}
                ellipsesContent={item.info && (
                  <OverlayTrigger trigger="click" rootClose placement="top" overlay={infoPopover(item)}>
                    <IconBase
                      icon={faEllipsisH}
                      className={"fa-pull-right pointer pr-1"}
                      onClickFunction={() => document.body.click()}
                    />
                  </OverlayTrigger>
                )}
                footerText={item.footer}
              />
            );
          })}
        </DataBlockWrapper>
      ) : null}
    </>
  );
}

SummaryCountBlocksView.propTypes = {
  data: PropTypes.array,
  view: PropTypes.string,
};

export default SummaryCountBlocksView;