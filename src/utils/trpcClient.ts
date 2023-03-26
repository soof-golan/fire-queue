import {httpBatchLink} from '@trpc/client';
import {createTRPCNext} from '@trpc/next';
import type {AppRouter} from '@/server/routers/_app';
import {getBaseUrl} from "@/utils/getBaseUrl";
// import {getAccessToken} from "@/utils/getAccessToken";



const trpcClient = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // Authorization: `Bearer ${await getAccessToken()}`,
            };
          },
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});

export default trpcClient;
