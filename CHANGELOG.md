# Changelog

## [Unreleased]

### Added - turar-config v0.2.0 Integration

- Upgraded `@yedoma-labs/turar-config` from v0.1.0 to v0.2.0
- Added YAML configuration file support (`config/default.yaml`)
- Added TOML configuration file support (`config/default.toml`)
- Added hot reload demo page at `/config/hotreload`
  - Interactive file watching with change tracking
  - Real-time configuration updates without restart
  - Debounced change detection
- Enhanced Vault integration documentation (token + AppRole auth)

### Changed

- Updated all turar-config documentation to reflect v0.2.0 API
- Improved server-side configuration loading with `server-only` package
- Added `serverExternalPackages` config for chokidar/fsevents bundling
- Enhanced configuration examples with multi-format support

### Fixed

- Configured Next.js to properly externalize file watching dependencies
- Prevented fsevents bundling errors in Turbopack builds

## [0.3.0] - Previous

- Initial turar-config v0.1.0 integration
- bylyt-env-guard environment validation
- sir-forms and suruy-form-actions demos
- ichchi-state persistence examples
- suruk-logger structured logging
