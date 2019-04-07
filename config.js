const config = require('config');

const define = (name, value) => {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: false,
        writable: false,
        configurable: false
    });
}

// App Setting
define('mode', config.mode);
define('secret', config.secret);
define('listenPort', 3001);
define('coreUrl', 'http://localhost:3000/core/');
