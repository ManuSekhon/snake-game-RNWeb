const createExpoWebpackConfig = require('@expo/webpack-config')

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfig(env, argv)

  // https://github.com/expo/expo/issues/4545#issuecomment-504742710
  // Production build fails to run due to some bug in expo 33 beta.
  // Workaround is to remove WebpackDeepScopeAnalysisPlugin for now.
  config.plugins = config.plugins.filter(x => x.constructor.name !== 'WebpackDeepScopeAnalysisPlugin')

  return config
}
