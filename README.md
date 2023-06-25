# Project Title

Short project description or overview.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)

## Introduction

This is very basic CRUD operations using TypeScript with basic auth using JWT.

## Features

1. Sign up with username, email and password. It saves user in DB with hashed password.
2. Log in with email and password. It generates jwt access token and returns it to the frontend
3. Edit profile. User can only edit his/her own profile. This shows very basic authorization that checks whether provided id belongs to the user's id.
4. Create TODO that is protected with authentication middleware. Hence, only logged in users can create TODO.
5. Edit TODO. Only authenticated and authorized users can edit TODO.

## Prerequisites

Node app and MySQL DB run in Docker, hence Docker must be installed.

## Installation

Just run Docker command:

```bash
docker-compose up
```

## Usage

New to Docker? Please visit official site [documentation](https://docs.docker.com/engine/install/) for more information on how to install it.

## Tests

Small test suit. Only 3 functions in auth middleware function authenticateToken. Run npm run test. Keep in mind to run your app in Docker first.

---

## Docker Compose Configuration

This project includes a `docker-compose.yml` file that sets up a development environment with the required services. To use Docker Compose, follow these steps:

1. Make sure you have Docker and Docker Compose installed on your system.

2. Open a terminal or command prompt and navigate to the project's root directory.

3. Run the following command to start the containers:

```bash
docker-compose up
```
