# GOV.UK Vue

GOV.UK Vue is a Vue 3 component library for [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend). It enables you to build Vue apps based on the [GOV.UK Design System](https://design-system.service.gov.uk/).

![An illustration of a big green 'Start now' button connected to its Vue code](https://github.com/govuk-vue/govuk-vue/assets/1935173/1576c792-0fe8-4d47-8ffb-e046ba4e3521)

You can use GOV.UK Vue to build easy-to-use, accessible apps whether you're working on a government service or not.

GOV.UK Vue is currently in alpha, so things may change between now and the first stable release - please share any feedback by starting a [discussion](https://github.com/govuk-vue/govuk-vue/discussions) or raise an [issue](https://github.com/govuk-vue/govuk-vue/issues) for any problems.

## Getting started

[govukvue.org](https://govukvue.org) has detailed instructions on [how to install GOV.UK Vue](https://govukvue.org/get-started/installing-govuk-vue), including [how to use GOV.UK Vue with Nuxt](https://govukvue.org/get-started/using-govuk-vue-with-nuxt).

There's also [detailed documentation and examples for every component](https://govukvue.org/components).

If you need any help getting set up, [get in touch](https://govukvue.org/support).

## Goals

GOV.UK Vue aims to provide all of the [GOV.UK Frontend components](https://design-system.service.gov.uk/components/) as Vue components.

In almost all cases GOV.UK Vue provides every option available in the original Nunjucks templates and outputs the same HTML (though there are [some differences](https://govukvue.org/get-started/differences-to-govuk-frontend)).

Styling is entirely provided by GOV.UK Frontend. GOV.UK Vue does not reimplement any of the Frontend styling, or provide any of its own.

Accessibility is the #1 priority of GOV.UK Vue. It provides full support for all accessibility features in GOV.UK Frontend, and any accessibility issues will be given priority over new features.

All JavaScript functionality from GOV.UK Frontend, such as [accordions](https://design-system.service.gov.uk/components/accordion/) and [character counts](https://design-system.service.gov.uk/components/character-count/), is reimplemented in TypeScript within individual Vue components. No JavaScript files from GOV.UK Frontend are used. No external dependencies are used in components beyond Vue.

## License and credit

This project is licenced under the MIT License. An acknowledgement in your README.md is appreciated but not necessary.

Even if you don't need any help, I'd love to know what you're using GOV.UK Vue for - please [get in touch](https://govukvue.org/support) if you use it.

## Sponsoring GOV.UK Vue

GOV.UK Vue is built and maintained by [Matt Eason](https://github.com/matteason) as a community resource. It's not maintained or supported by GDS.

If you find this project useful, I'd really appreciate your support through [Ko-fi](https://ko-fi.com/matteason) or [GitHub Sponsors](https://github.com/sponsors/govuk-vue).

<a href='https://ko-fi.com/matteason' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
