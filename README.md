# The Huddle
This is the community portal for [The Huddle](https://codehuddle.org)!

[![Generic badge](https://img.shields.io/badge/node-14.15.5-informational.svg)](https://nodejs.org/ca/blog/release/v14.15.5/)
[![Generic badge](https://img.shields.io/badge/angular-13.0.2-informational.svg)](https://angular.io/)
<br>

[![Generic badge](https://img.shields.io/badge/directus-directus-blueviolet.svg)]()
<br>

## Developer Setup
If it's your first time, be sure to check out our [Contribution Guide](./docs/CONTRIBUTING.md).

### Setup
The website is designed to run in a containerized environment.
Serving your local development server is facilitated by the `make` utility.

1. [Install `docker` for your appropriate platform](https://docs.docker.com/get-started/)
2. [Install `make` for your appropriate platform](https://www.gnu.org/software/make/)
3. Clone this repository to your local development environment

After the setup above, you can run the development server in a container by running `make serve`.
This runs as the [angular development server](https://angular.io/cli/serve), which has many helpful features like live-reloading.
Once your container is successfully running, you can access the local webpage by navigating to `localhost:4200` in your web browser.

For more information on other make commands, run `make help`.
