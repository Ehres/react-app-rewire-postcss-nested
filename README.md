# react-app-rewire-postcss-nested
Add the postccs-nested plugin to your create-react-app via react-app-rewired

# Install

npm:
```bash
$ npm install --saveDev react-app-rewire-postcss-nested
```

yarn:
```bash
$ yarn add --dev react-app-rewire-postcss-nested
```

# Add it to your project

* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) than modify `config-overrides.js`

```javascript
const rewirePostCSSNested = require('react-app-rewire-postcss-nested');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewirePostCSSNested(config, env);
  return config;
}
```
