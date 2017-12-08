const ruleChildren = (loader) => loader.use || loader.oneOf || Array.isArray(loader.loader) && loader.loader || [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
    let result = undefined
    const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource)
    rules.some((rule, index) => result = ruleMatcher(rule) ? {index, rules} : findIndexAndRules(ruleChildren(rule), ruleMatcher))
    return result
};

const findRule = (rulesSource, ruleMatcher) => {
    const {index, rules} = findIndexAndRules(rulesSource, ruleMatcher)
    return rules[index]
};

const createLoaderMatcher = (loader) => (rule) => rule.loader && rule.loader.indexOf(`/${loader}/`) !== -1;
const postcssLoaderMatcher = createLoaderMatcher('postcss-loader');

module.exports = function (config, env) {
  // Add postcss-nested plugins
  const postcssLoader = findRule(config.module.rules, postcssLoaderMatcher);
  const oldPostcssPlugins = postcssLoader.options.plugins();
  const autoprefixerIndex = oldPostcssPlugins.findIndex(x => x.postcssPlugin === 'autoprefixer');
  let autoprefixerOptions = {};
  if (autoprefixerIndex !== -1) {
    autoprefixerOptions = oldPostcssPlugins[autoprefixerIndex].options;
    oldPostcssPlugins.splice(autoprefixerIndex, 1);
  }
  const postcssPlugins = [
    require('postcss-nested')
  ].concat(oldPostcssPlugins);
  const newPluginsFun = function () {
    return postcssPlugins
  }.bind(postcssLoader.options);
  postcssLoader.options.plugins = newPluginsFun;

  return config;
};
