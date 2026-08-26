export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'lava-db.corelab.mx' && (url.pathname === '/' || url.pathname === '')) {
      const assetRequest = new Request(new URL('/lava-db.html', request.url), request);
      return env.ASSETS.fetch(assetRequest);
    }
    return env.ASSETS.fetch(request);
  }
}
