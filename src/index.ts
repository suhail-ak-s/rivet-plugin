import type { RivetPlugin, RivetPluginInitializer } from "@ironclad/rivet-core";
import { intermediateOutputNode } from "./nodes/IntermediateOutputNode.js";

const plugin: RivetPluginInitializer = (rivet) => {
  const intermediateNode = intermediateOutputNode(rivet);

  const intermediateOutputPlugin: RivetPlugin = {
    id: "intermediate-output",
    name: "Intermediate Output",
    configSpec: {},
    contextMenuGroups: [
      {
        id: "debug",
        label: "Debug"
      }
    ],
    register: (register) => {
      register(intermediateNode);
    }
  };

  return intermediateOutputPlugin;
};

export default plugin;
