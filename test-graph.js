import { runGraphInFile } from '@ironclad/rivet-node'
import * as RivetCore from '@ironclad/rivet-core'
import intermediateOutputPlugin from "./dist/bundle.js";

// Initialize Rivet with the plugin
RivetCore.globalRivetNodeRegistry.registerPlugin(intermediateOutputPlugin(RivetCore));

async function testGraph() {
  try {
    const result = await runGraphInFile("./MasterAgent.rivet", {
      graph: "jZDbKoqXeqOgJo1EhumeF",
      inputs: {
        input: "What is the weather in Tokyo?",
      },
      plugins: [intermediateOutputPlugin(RivetCore)],
      onPartialOutput: (output) => {
        console.log("Partial output:", output);
      },
    });

    console.log("Final result:", result);
  } catch (err) {
    console.error("Error running the graph:", err);
  }
}

testGraph();