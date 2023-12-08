# Software Engineering - SSPO

A school assigment that requires building an app for university printing services.

Along with the code is some docs and diagrams, albeit a little out-dated and inaccurate (still got a long way to go).

## Developer's guide

* Package manager: `yarn`
  Run scripts and install using `yarn` instead of `npm`.

* Database:
  * DBMS: Postgres
  * Run `yarn migrate` to set up db.

* `yarn dev` should suffice in most cases. It automatically rebuild backend & frontend on change and restarting the server. However, the page must be refreshed to see the change.

* Before commit, `husky` will automatically run lint check and test files.

* During development, the site is available on localhost:3000.

## Introduction

Overall satisfaction: ★ ★ ☆ ☆ ☆ ☆

### What I've learnt

This is the first time I play around with the NodeJS build system and the knowledge I have gained about the lifecycle of a webpage.

This is also the first time I use `Tailwind`, and I like it, although I strongly believe I'm not using it correctly, same thing as React though.

* The project is a fullstack app that I mechanically hand-crafted with `express` as the backend and `React` as the front-end (with the aid of `Tailwind` for styling).

* The app is structured like so:
  * The backend runs `express` as the HTTP server.
  * All the backend does is exposes all apis under the endpoint space `/api` and an endpoint for static files `/public`.
  * All HTTP requests to other routes are responded with the same markup document (which is generated by `express` + `index.ejs` template), which loads the front-end code at `/public/index.js` and the React code takes over from there, e.g `react-router` performs further front-end routing.
    ![app structure](https://github.com/HuyDNA/Assignment-SSPO/assets/108089394/9799c7d4-1b3e-4d63-9cd3-375dc13af799)
  I never thought to put all of these together and somehow it worked with so little trouble!
* I also handcrafted tedious scripts to provide a decent developer's experience e.g watching for re-compilation.
* Files transmitted between the frontend and backend are encoded in Base64. Initially, I chose Base64 as I know it's a popular encoding for transmission. Surprisingly, I found out there are great support for displaying files natively from Base64.
* I discovered the `data` URI and its usage in displaying files from its content.
* The CAS authentication protocol and a chance to mock a working CAS server.

* Major issues (e.g build & dev process)
  Due to the nature of being mechanically put together, things are forced to work against their natural assumptions & there are little native support:
  * Due to every static files being exposed & have to be accessed under `/public`, Webpack must be configed to bundle and import images at the right path.
    I was also worried that some modules will fail to be loaded properly if the generated front-end code were to be all over the place and the imports would not be made under `/public`.
  * In general, the `/public` restriction is kind of fatal as any front-end code build tools must be used with caution - which includes `Tailwind` also.
  * Confused eslint when it encounters both backend and frontend code.
  * `husky` is running lint analysis on working space code, not staging area, which is very annoying.
    **Try it next time**: I think `lintstagedrc` could help with this.
  * The watch-mode compilation I implemented using `nodemon` is not very good, from time to time it crashes the app.
    **Try it next time**: I think `vite` could help with this and also provie HMR natively.
  * The stupidest thing that I decided is to use JS, not TS for this project. I thought JS + JSDoc would suffice as my teammates don't know TS. However, importing types that are defined in some other files to be used in JSDoc comments is too cumbersome. Turns out, JSDoc serves so little role in this project and most of them are just wrong types (the API's JSDoc).
    **Do it next time**: `Typescript` of course.
  * No API documentation.
    **Try it next time**: SwaggerUI
* Coding issues
  * Frontend code is not very good:
    * Component logics are duplicated.
    * Components are not splitted carefully and are not truly modular (`Grid` component). Sometimes I felt like I'm just creating a new component because I'm lazy to write duplicate code.
    * Tailwind styling is not consistent & arbitrary.
  * Backend code is better but there are some issues that need to be addressed:
    * Payment logic isn't being handled properly (Noted in `/backend/apis/payment/index.js`).
    * ~~Concurrency issues in database update (Noted in `/backend/apis/printerjobs/index.js`). This is mainly due to the expressiveness power of prisma in describing transactions.~~ (solved)
    * I was/am not reading `Joi` documentation properly so I was using its payload validation utilities incorrectly.
      **Try it next time**: `Typebox`, which seems more predictable & user-friendly?
    * Sometimes I don't know why I neglected to perform backend validation properly, although I know it's extremely crucial.
    * Some APIs are not well designed.
    * Slowly changing dimensions are not placed much focus on.

At least out of all the mess that I've made, I appreciated that I've learnt:

* My idea of what possible was actually feasible (backend js delegates control to frontend js).
* Some experience in storing and transmitting files, especially binary files.
* Aware of slowly changing dimensions.
* The CAS authentication protocol & implementing a mock CAS server.
* No compromise when it comes to developer's experience.
* Hand-crafted stuff should be for experimentation only, well-built tools next time.
* I'm so bad at coding front-end.
