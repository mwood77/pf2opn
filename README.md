# pf2open

A simple pfsense to opnsense confing mapper.

## Development

### Prerequisites

1. Clone this repository
1. Download [NodeJS](https://nodejs.org/en)
1. Download [Angular's cli](https://angular.io/guide/setup-local#install-the-angular-cli)

### Installation & Running locally for development

1. `cd` into this repository
1. Run `npm i`  to install project dependencies
1. Run `npm run start` to spool up a development server
1. Navigate to [`localhost:4200`](localhost:4200) to see the website. The application will automatically reload if you change any of the source files.

## Deployment

> [!IMPORTANT]
> These images are built in production mode. They are not suitable for development.

### Prerequisites (for Docker/Podman)

1. Clone this repository
2. Install [Docker](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation)

### Deployment via Docker or Podman

1. `cd` into this repository
1. Run `docker compose up`
1. Navigate to [`localhost:4200`](localhost:4200) to see the website.

#### Alternative:
1. Build docker image: 
    ```
    docker build -t pf2opn .       
     ```
1. Run docker image: 
    ```
    docker run -p 4200:80 -d pf2opn
    ```
1. Navigate to [`localhost:4200`](localhost:4200) to see the website.