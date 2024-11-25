"use client";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const CacheProviderWrapper = ({ children }: any) => {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};

export { CacheProviderWrapper };
