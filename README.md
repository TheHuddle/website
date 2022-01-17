# The Huddle
This is the community portal for [The Huddle](https://codehuddle.org)!

[![Generic badge](https://img.shields.io/badge/node-14.15.5-informational.svg)](https://nodejs.org/ca/blog/release/v14.15.5/)
[![Generic badge](https://img.shields.io/badge/angular-13.0.2-informational.svg)](https://angular.io/)
<br>

[![Generic badge](https://img.shields.io/badge/directus-directus-blueviolet.svg)]()
<br>

## Developer Setup
If it's your first time, be sure to check out our [Contribution Guide](./docs/CONTRIBUTING.md).

### NPM
With the appropriate version of `node` and `npm`, you can simply clone this repository and run
```
npm install
```

### Docker
On production, the application runs in a container.
Always review changes in a production container locally before making a pull request!

Serving containerized builds is facilitated by the `make` utility.

1. [Install `docker` for the appropriate platform](https://docs.docker.com/get-started/)
2. [Install `make` for the appropriate platform](https://www.gnu.org/software/make/)
3. Clone this repository to a local development environment
4. Run `make help` to review build options

The container's application is exposed on the host machine at `0.0.0.0:4200`.
