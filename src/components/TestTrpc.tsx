"use client";
import trpcClient from "@/utils/trpcClient";

export const ClientComponent = trpcClient.withTRPC(() => {
  const sanity = trpcClient.healthcheck.useQuery();
  const mutation = trpcClient.event.create.useMutation();
  const createEvent = async () => {
    await mutation.mutate({
      name: 'test',
      description: 'test',
    })
  };

  return (
    <div>
      {sanity.data === 'yay!' && <p>Sanity check: OK</p>}
      <button onClick={createEvent}  disabled={mutation.isLoading}>Create</button>
      {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
    </div>
  )
});
