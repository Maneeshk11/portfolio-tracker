// lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

// ---- set up of zustand persist is done ----

export const queryClient = new QueryClient();

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5m
//       refetchOnMount: false,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// // only run on the client
// if (typeof window !== "undefined") {
//   const persister = createSyncStoragePersister({
//     storage: window.localStorage,
//   });
//   persistQueryClient({
//     queryClient,
//     persister,
//     maxAge: 1000 * 60 * 60 * 24, // 24h
//   });
// }
