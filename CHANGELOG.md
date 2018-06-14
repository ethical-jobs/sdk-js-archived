# [staged]

- refactoring build process
- migrating to NPM organisation ethical-jobs
- fixing local storage issue on older browsers

# 1.1.0

- Adding headers to verb functions
- adding getAuthToken helper

# 1.0.0

- Bumping sem ver 
- Adding tests for checkStatus, fixing status on ApiError

# 0.3.5

- Updated AUTH env variables to match user clients
- Invalid tokens are now caught and routed to no-existing user `/users/-1` for a 404

# 0.3.1

- Addressed issues in Api.auth.login helper flow

# 0.3.0

- Breaking changes bumping feature ver
- Updating auth module to new auth workflow on API
- Createing environment variable helper function

# 0.2.16

- Increase timeout on HTTP requests to 15000

# 0.2.15

- Set body of GET and HEAD requests to unrefined instead of null to support IE Edge

# 0.2.13

- Added Array.from polyfill to LocalStorage shim 

# 0.2.12

- Added media.detach helper

# 0.2.11

- Isomorphic SSL support (basic, just ignoring certs)

# 0.2.10

- SSL support

# 0.2.9

- Refactored stringifier
- Refactored immutable converter
- Truthy params are set to valid URL values

# 0.2.6

- Added isomorphic shims for FormData and localStorage