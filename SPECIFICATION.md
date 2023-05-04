# Specification

This document describes the specification for a project in [DD1349](https://www.kth.se/student/kurser/kurs/DD1349) "_Projektuppgift i introduktion till datalogi_" at KTH.

## Introduction

"**Osqspeed**": measurement server and app/program on phone. For users who are on the KTH campus, the program/app measures speed and latency once a minute and reports this together with location (available via API through the phone) to a server. Collected data is used to create a coverage map (Mb/s on average in different locations).

## Tech stack

- Mobile app: React Native with TypeScript
- ~~Frontend/web app: React with TypeScript~~
- Backend: Rust with Actix web framework
- Database: PostgreSQL
- Speedtest server: nginx, preferably server in Stockholm with 1 Gbps or better connection

Naming convention depending on language (for TypeScript/NodeJS we use camelCase, for Rust we use snake_case).

## Work distribution

- Backend: Vilhelm
- Mobile app: Albin, Vilhelm
- Frontend: Albin

## Features

- Users able to sign-in and sign-out, preferably with KTH account.
- Speedtest in app, measuring internet speed and latency. Speedtest against specific server.
- Report results together with location (GPS) to server.
- Map with coverage of KTH campus.
- Web app with map and statistics.
- Cool ways to visualize data, e.g. heat map, 3D map (mesh map), etc.

## Feasibility

Bare MVP features are feasible. Additional features are feasible if we have time. Difficulties may be visualizing data in a cool way, and mobile app.

## Authors

- Vilhelm Prytz <vilhelm@prytznet.se> / <vprytz@kth.se>
- Albin Wallenius Woxnerud <albin@woxnerud.se> / <alww@kth.se>
