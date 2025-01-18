import type {
  ChartNode,
  EditorDefinition,
  Inputs,
  InternalProcessContext,
  NodeBodySpec,
  NodeConnection,
  NodeId,
  NodeInputDefinition,
  NodeOutputDefinition,
  NodeUIData,
  Outputs,
  PluginNodeImpl,
  PortId,
  Project,
  Rivet
} from "@ironclad/rivet-core";

export type IntermediateOutputNode = ChartNode<"intermediateOutput", IntermediateOutputNodeData>;

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
        type: "intermediateOutput",
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

    getInputDefinitions(data, _connections, _nodes, _project) {
      const inputs: NodeInputDefinition[] = [];
      if (data.useInput) {
        inputs.push({
          id: "input" as PortId,
          dataType: "string",
          title: "Input"
        });
      }
      return inputs;
    },

    getOutputDefinitions(data, _connections, _nodes, _project) {
      const outputs: NodeOutputDefinition[] = [];
      if (data.useInput) {
        outputs.push({
          id: "output" as PortId,
          dataType: "string",
          title: "Output"
        });
      }
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

    getEditors(data): EditorDefinition<IntermediateOutputNode>[] {
      return [
        {
          type: "string",
          dataKey: "inputText",
          useInputToggleDataKey: "useInput",
          label: "Default Text"
        },
        {
          type: "string",
          dataKey: "description",
          label: "Description"
        }
      ];
    },

    getBody(data): string | NodeBodySpec | NodeBodySpec[] | undefined {
      return rivet.dedent`
        Intermediate Output
        ${data.description ? `Description: ${data.description}` : ''}
        Current Value: ${data.useInput ? "(Using Input)" : data.inputText}
      `;
    },

    async process(
      data: IntermediateOutputNodeData,
      inputData: Inputs,
      _context: InternalProcessContext
    ): Promise<Outputs> {
      const outputs: Outputs = {};
      if (data.useInput) {
        const input = inputData["input" as PortId];
        const val = input?.value as string ?? data.inputText;
        outputs["output" as PortId] = {
          type: "string",
          value: val
        };
      }
      return outputs;
    }
  };

  return rivet.pluginNodeDefinition(IntermediateOutputNodeImpl, "Intermediate Output Node");
} 