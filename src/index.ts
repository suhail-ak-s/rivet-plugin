// It is important that you only import types from @ironclad/rivet-core, and not
// any of the actual Rivet code. Rivet is passed into the initializer function as
// a parameter, and you can use it to access any Rivet functionality you need.
import type { RivetPlugin, RivetPluginInitializer } from "@ironclad/rivet-core";

import { intermediateOutputNode } from "./nodes/IntermediateOutputNode.js";

// A Rivet plugin must default export a plugin initializer function. This takes in the Rivet library as its
// only parameter. This function must return a valid RivetPlugin object.
const plugin: RivetPluginInitializer = (rivet) => {
  // Initialize the new IntermediateOutputNode
  const intermediateNode = intermediateOutputNode(rivet);

  // Define the plugin object
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

// Make sure to default export your plugin.
export default plugin;
