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
          description: "Captures intermediate output for debugging or analysis"
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
        dataType: "string",
        required: false
      });
      return inputs;
    },

    getOutputDefinitions(data): NodeOutputDefinition[] {
      const outputs: NodeOutputDefinition[] = [];
      outputs.push({
        id: "output" as PortId,
        title: "Output",
        dataType: "string"
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
        }
      ];
    },

    getBody(data): string | NodeBodySpec | NodeBodySpec[] | undefined {
      const description = data.description ? `Description: ${data.description}` : '';
      const value = data.inputText ? `Value: ${data.inputText}` : '';
      return [description, value].filter(Boolean).join('\n');
    },

    async process(
      data: IntermediateOutputNodeData,
      inputData: Inputs,
      context: InternalProcessContext
    ): Promise<Outputs> {
      const inputPort = "input" as PortId;
      const outputPort = "output" as PortId;
      const input = (inputData[inputPort]?.value as string) ?? data.inputText;
      
      // Use context's partial output instead of console.log
      const partialOutputs: Outputs = {};
      partialOutputs[outputPort] = {
        type: "string",
        value: input
      };
      context.onPartialOutputs?.(partialOutputs);

      const outputs: Outputs = {};
      outputs[outputPort] = {
        type: "string",
        value: input
      };
      return outputs;
    }
  };

  return rivet.pluginNodeDefinition(IntermediateOutputNodeImpl, "Intermediate Output Node");
} 