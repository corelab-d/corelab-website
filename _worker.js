export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'lava-db.corelab.mx' && (url.pathname === '/' || url.pathname === '')) {
      return Response.redirect('https://lava-db.corelab.mx/lava-db.html', 301);
    }
    return env.ASSETS.fetch(request);
  }
}
