/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // chokidar/fsevents can't be bundled (native dependencies)
  // turar-config v0.2.0 depends on chokidar for watchConfig() hot reload
  serverExternalPackages: ['@yedoma-labs/turar-config', 'chokidar'],
}

module.exports = nextConfig
