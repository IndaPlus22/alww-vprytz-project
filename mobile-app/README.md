# **How to use**

## **Install internal dependencies**

```sh
npm i -g expo-cli / yarn global add expo-cli
npm i / yarn install
```

## **Install external dependencies**

- Android Studio
- Xcode

## **Run the app**

```sh
npm run / npx expo start / yarn start
```

# **Error fixes**

## **Error**: _node_modules/expo-router/entry.js: node_modules/expo-router/entry.js:Invalid call at line 11: process.env.EXPO_ROUTER_IMPORT_MODE_

Go to: node_modules/expo-router/entry.js

paste the following

```js
import { ExpoRoot } from "expo-router";
import Head from "expo-router/head";
import "@expo/metro-runtime";
import { renderRootComponent } from "expo-router/src/renderRootComponent";

const ctx = require.context("../../app", true, /.*/);

// Must be exported or Fast Refresh won't update the context
export function App() {
  return (
    <Head.Provider>
      <ExpoRoot context={ctx} />
    </Head.Provider>
  );
}

renderRootComponent(App);
```

# **Screenshots**

![search ui version 1.0](/screenshot/search-ui-v1.png)
