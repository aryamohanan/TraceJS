import { register } from 'node:module';
// Relative resolution can be handled via new URL('./local', import.meta.url).
// https://nodejs.org/api/esm.html#no-requireresolve
// TypeError [ERR_INVALID_URL]: Invalid URL when running with 20.6 and above
// import { pathToFileURL } from 'node:url';

// initializes the trcae here

import hook from './tracer.js';
hook.init();

register('./loader.mjs', import.meta.url);
