## Install the project

```
npm install - installing dependencies
npm run start:dev or npm run start:dev:vite - starting server + frontend app in dev mode
```

---

## Scripts

- `npm run start` - Starting frontend app using webpack-dev-server
- `npm run start:vite` - Starting frontend app on vite
- `npm run start:dev` - Starting frontend app on webpack-dev-server + backend
- `npm run start:dev:vite` - Starting frontend app on vite + backend
- `npm run start:dev:server` - Starting backend part
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode
- `npm run lint:ts` - TS lint check
- `npm run lint:ts:fix` - TS lint fix
- `npm run lint:scss` - SCSS lint check
- `npm run lint:scss:fix` - SCSS lint fix
- `npm run test:unit` - Starting unit tests using jest
- `npm run test:ui` - Starting screenshots tests using loki
- `npm run test:ui:ok` - Approving screenshots changes using loki
- `npm run test:ui:ci` - Starting screenshots tests in CI
- `npm run test:ui:report` - Creating whole report for screenshots tests
- `npm run test:ui:json` - Creating JSON report for screenshots tests
- `npm run test:ui:html` - Creating HTML report for screenshots tests
- `npm run storybook` - Starting Storybook
- `npm run storybook:build` - Build Storybook
- `npm run prepare` - Precommit hooks

---

## Project architecture

The project was written in accordance with the Feature Sliced ​Design methodology

Link to the documentation - [Feature Sliced Design](https://feature-sliced.design/)

---

## Working with translations

The project uses the i18next library to work with translations.
Translation files are stored in public/locales.

For comfortable work, we recommend installing the plugin for webstorm/vscode

Documentation i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Testing

The project uses 4 types of tests:

1. Unit tests on Jest - `npm run test:unit`
2. Tests for components using React-testing-library -`npm run test:unit`
3. Screenshots using loki `npm run test:ui`
4. e2e testing using Cypress `npm run test:e2e`

More about testing - [Testing documentation](/docs/tests.md)

---

## Linting

The project uses eslint to check typescript code and stylelint to check style files.

Also for strict control of the main architectural principles uses its own eslint plugin [kenshimoral-fsd-path-checker](https://www.npmjs.com/package/eslint-plugin-kenshimoral-fsd-path-checker),
which contains 3 rules

1. path-checker - prohibits the use of absolute imports within one module
2. layer-imports - checks the correct use of layers in terms of FSD
   (for example widgets cannot be used in features and entities)
3. public-api-imports - Allows import from other modules only from public api

##### Starting linters

- `npm run lint:ts` - TS lint check
- `npm run lint:ts:fix` - TS lint fix
- `npm run lint:scss` - SCSS lint check
- `npm run lint:scss:fix` - SCSS lint fix

---

## Storybook

The project describes story cases for each component.
Requests to the server are mocked using storybook-addon-mock.

A file with story cases is created next to the component with the extension .stories.tsx

You can start storybook with the command:

- `npm run storybook`

More about: [Storybook](https://storybook.js.org/docs)

Example:

```typescript jsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Button, ButtonSize, ButtonTheme } from "./Button";
import { Theme } from "@/shared/const/theme";

export default {
  title: "shared/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Text",
};

export const Clear = Template.bind({});
Clear.args = {
  children: "Text",
  theme: ButtonTheme.CLEAR,
};
```

---

## Configuration of the project

For development, the project contains 2 configs:

1. Webpack - ./config/build
2. vite - vite.config.ts

Both collectors are adapted to the main features of the application.

All configuration is stored in /config

- /config/build - webpack config
- /config/jest - testing env config
- /config/storybook - storybook config

The `scripts` folder contains various scripts for refactoring\simplifying code writing\generating reports, etc.

---

## CI pipeline и pre commit хуки

The github actions configuration is located in /.github/workflows.
All types of tests, project and storybook assembly, and linting are run in CI.

In precommit hooks we check the project with linters, config in /.husky

---

### Work with data

Interaction with data is carried out using the redux toolkit.
If possible, reused entities should be normalized using EntityAdapter

Requests to the server are sent using [RTK query](/src/shared/api/rtkApi.ts)

For asynchronous connection of reducers (so as not to pull them into a common bundle) it is used
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)
