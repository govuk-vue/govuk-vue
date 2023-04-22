# GOV.UK Vue

GOV.UK Vue (GV) is a Vue 3 component library for [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend). It enables you to build Vue apps based on the [GOV.UK Design System](https://design-system.service.gov.uk/).

> **Warning**
>
> This library is still in early development. It is very incomplete and shouldn't be used for anything important.

At the moment there's minimal documentation, but you can see examples of the components in use in `src/App.vue`.

I am not affiliated with GDS and GOV.UK Vue is not an official GOV.UK resource.

## Goals

GV aims to provide all of the [GOV.UK Frontend components](https://design-system.service.gov.uk/components/) as Vue components, with all of the options available in the original Nunjucks templates.

The structure of the HTML output by GV should be identical to the HTML from the original Nunjucks templates, except for attribute order.

All JavaScript functionality from GOV.UK Frontend, such as [accordions](https://design-system.service.gov.uk/components/accordion/) and [character counts](https://design-system.service.gov.uk/components/character-count/), will be reimplemented in TypeScript within individual Vue components. No JavaScript files from GOV.UK Frontend will be used. No external dependencies will be used in components beyond Vue.

## Progress

| Component           | Built? | Tests? | Notes                                 |
|---------------------|--------|--------|---------------------------------------|
| Accordion           | Yes    |        |                                       |
| Back link           | Yes    |        |                                       |
| Breadcrumbs         | Yes    |        |                                       |
| Button              | Yes    |        |                                       |
| Character count     | Yes    |        |                                       |
| Checkboxes          |        |        |                                       |
| Cookie banner       |        |        |                                       |
| Date input          | Yes    |        |                                       |
| Details             | Yes    |        |                                       |
| Error message       | Yes    |        |                                       |
| Error summary       |        |        |                                       |
| Fieldset            | Yes    |        |                                       |
| File upload         |        |        |                                       |
| Footer              | Yes    |        |                                       |
| Header              | Yes    |        |                                       |
| Inset text          | Yes    |        |                                       |
| Notification banner | Yes    |        |                                       |
| Pagination          |        |        |                                       |
| Panel               | Yes    |        |                                       |
| Phase banner        | Yes    |        |                                       |
| Radios              | Yes    |        | Todo: Add way to pass items as a prop |
| Select              | Yes    |        |                                       |
| Skip link           |        |        |                                       |
| Summary list        | Yes    |        |                                       |
| Table               |        |        |                                       |
| Tabs                | Yes    |        |                                       |
| Tag                 | Yes    |        |                                       |
| Text input          | Yes    |        |                                       |
| Textarea            | Yes    |        |                                       |
| Warning text        | Yes    |        |                                       |

## Project Setup

GV uses Vite. Start by installing dependencies

```sh
npm install
```

Run the dev server

```sh
npm run dev
```

GV uses ESLint and Prettier to enforce code style and formatting. You should configure your IDE to run ESLint and Prettier on save. You can also run them manually with:

```sh
npm run lint
npm run format
```

Type-check, compile and minify for production

```sh
npm run build
```
