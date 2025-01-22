import type {
  ChartNode,
  EditorDefinition,
  Inputs,
  InternalProcessContext,
  NodeBodySpec,
  NodeId,
  NodeInputDefinition,
  NodeOutputDefinition,
  NodeUIData,
  Outputs,
  PluginNodeImpl,
  PortId,
  Rivet
} from "@ironclad/rivet-core";

export type IntermediateOutputNode = ChartNode<"intermediate-output", IntermediateOutputNodeData>;

export type IntermediateOutputNodeData = {
  inputText: string;
  useInput?: boolean;
  description?: string;
  useForSubgraphOutput?: boolean;
};

export function intermediateOutputNode(rivet: typeof Rivet) {
  const IntermediateOutputNodeImpl: PluginNodeImpl<IntermediateOutputNode> = {
    create(): IntermediateOutputNode {
      return {
        id: rivet.newId<NodeId>(),
        type: "intermediate-output",
        title: "Intermediate Output",
        data: {
          inputText: "",
          useInput: true,
          description: "Captures intermediate output for debugging or analysis",
          useForSubgraphOutput: true
        },
        visualData: {
          x: 0,
          y: 0,
          width: 240
        }
      };
    },

    getInputDefinitions(data): NodeInputDefinition[] {
      const inputs: NodeInputDefinition[] = [];
      inputs.push({
        id: "input" as PortId,
        title: "Input",
        dataType: "any",
        required: false
      });
      return inputs;
    },

    getOutputDefinitions(data): NodeOutputDefinition[] {
      const outputs: NodeOutputDefinition[] = [];
      outputs.push({
        id: "output" as PortId,
        title: "Output",
        dataType: "any"
      });
      return outputs;
    },

    getUIData(): NodeUIData {
      return {
        contextMenuTitle: "Intermediate Output",
        group: "Debug",
        infoBoxBody: "Captures and displays intermediate output for debugging or analysis purposes.",
        infoBoxTitle: "Intermediate Output Node"
      };
    },

    getEditors(): EditorDefinition<IntermediateOutputNode>[] {
      return [
        {
          type: "string",
          dataKey: "description",
          label: "Description (document what this output captures)"
        },
        {
          type: "toggle",
          dataKey: "useForSubgraphOutput",
          label: "Use for subgraph partial output"
        }
      ];
    },

    getBody(data): string | NodeBodySpec | NodeBodySpec[] | undefined {
      const description = data.description ? `Description: ${data.description}` : '';
      const value = data.inputText ? `Value: ${data.inputText}` : '';
      const subgraphOutput = data.useForSubgraphOutput ? '(Used for subgraph output)' : '';
      return [description, value, subgraphOutput].filter(Boolean).join('\n');
    },

    async process(
      data: IntermediateOutputNodeData,
      inputData: Inputs,
      context: InternalProcessContext
    ): Promise<Outputs> {
      const inputPort = "input" as PortId;
      const outputPort = "output" as PortId;
      const input = inputData[inputPort] ?? { type: "string", value: data.inputText };
      
      // Pass through the partial outputs as is
      const partialOutputs: Outputs = {};
      partialOutputs[outputPort] = input;
      context.onPartialOutputs?.(partialOutputs);

      const outputs: Outputs = {};
      outputs[outputPort] = input;
      return outputs;
    }
  };

  return rivet.pluginNodeDefinition(IntermediateOutputNodeImpl, "Intermediate Output Node");
} 