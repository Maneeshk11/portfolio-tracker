import { mastra } from "@/src/mastra";
import { RuntimeContext } from "@mastra/core/runtime-context";

type CryptoRuntimeContext = {
  address: `0x${string}`;
  chainId: number;
};

export async function POST(req: Request) {
  const { messages, address, chainId } = await req.json();
  const agent = mastra.getAgent("cryptoAgent");

  const runtimeContext = new RuntimeContext<CryptoRuntimeContext>();
  runtimeContext.set("address", address);
  runtimeContext.set("chainId", chainId);

  try {
    const result = await agent.stream(messages, {
      runtimeContext,
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("error while streaming: ", error);
    return new Response("Error while streaming", { status: 500 });
  }
}
