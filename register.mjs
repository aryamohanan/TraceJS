import { register } from 'node:module';

// TypeError [ERR_INVALID_URL]: Invalid URL when running with 20.6 and above
// import { pathToFileURL } from 'node:url';

register('./loader.mjs', import.meta.url);
