import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  // Cloudflare Pages environment variables'larını process.env'ye kopyala
  // Bu sayede Keystatic GitHub OAuth kimlik doğrulaması çalışabilir.
  if (context.locals.runtime?.env) {
    globalThis.process = globalThis.process || {};
    globalThis.process.env = {
      ...globalThis.process.env,
      ...context.locals.runtime.env
    };
  }
  return next();
});
