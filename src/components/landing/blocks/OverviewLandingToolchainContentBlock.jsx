import React from "react";
import {useHistory} from "react-router-dom";

function OverviewLandingToolchainContentBlock() {
  const history = useHistory();

  const loadPlatforms = () => {
    history.push("/platform");
  };

  return (
    <div className={"landing-content-module"}>
      <div>
        <img
          alt="Toolchain Automation"
          src="/img/platform.png"
          width="195"
          height="225"
          className="d-inline-block align-top pointer"
          onClick={() => {
            loadPlatforms();
          }}
        />
      </div>
      <div className="mt-4">
        <div className="h5 text-color">
          <div>Toolchain Automation</div>
        </div>
        <div className="text-muted pr-2">
          You choose your tools, we take care of the rest. Put together the perfect CI/CD stack that fits your
          organization’s goals with zero vendor lock-in.
        </div>
      </div>
    </div>
  );
}

export default OverviewLandingToolchainContentBlock;
