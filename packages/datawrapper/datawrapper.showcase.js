import React from "react";
import Datawrapper from "./src/datawrapper";

export default {
  children: [
    {
      component: () => <Datawrapper embedId="exjX8" />,
      name: "Datawrapper (Broken)",
      type: "story"
    },
    {
      component: () => <Datawrapper embedId="exjX8" height={600} />,
      name: "Datawrapper (Broken with fix)",
      type: "story"
    },
    {
      component: () => <Datawrapper embedId="DUDJ7" />,
      name: "Datawrapper (Working)",
      type: "story"
    }
  ],
  name: "Primitives/Datawrapper"
};
