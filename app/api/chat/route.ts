import { mastra } from "@/src/mastra";

export async function POST(req: Request) {
  const { message, address, chainId } = await req.json();
  const agent = mastra.getAgent("cryptoAgent");

  const result = await agent.stream(
    message + "\n walletAddress: " + address + "\n chainId: " + chainId
  );

  return result.toDataStreamResponse();
}
