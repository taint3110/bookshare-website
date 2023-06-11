/** @type {import('next').NextConfig} */



const moduleExports = {
  reactStrictMode: true,
  styledComponents: true,
  swcMinify: true,
  experimental: {
    swcTraceProfiling: true,
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}'
      }
    }
  },
  compiler: {
    styledComponents: true,
    emotion: true
  },
  env: {
    FE_BASE_URL: process.env.FE_BASE_URL,
    API_URL: process.env.API_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack']
    })
    return config
  },
}


module.exports = moduleExports
