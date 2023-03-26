"use client";
import trpcClient from "@/utils/trpcClient";

export const ClientComponent = trpcClient.withTRPC(() => {
  const hello = trpcClient.hello.useQuery({text: 'client'});
  return (
    <div>
      Greeting: {hello.data?.greeting}
      <button onClick={() => hello.refetch()}>Refetch</button>
    </div>
  )
});
