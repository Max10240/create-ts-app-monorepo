# create-ts-app

## Introduction
Create a app for you, with `Typescript`, `father`(a build tool) and `vitest`,

support both of `ESM` and `CommonJS`.

## Installation and Usage
```shell
npm install --global @ts-devtools/create-ts-app

create-ts-app --help
```

```text
Usage:
  $ create-ts-app [OPTION]... [NAME]

Options:
  -m, --module <module>  module type 
  -t, --target <target>  target 
  -h, --help             Display this message 
  -v, --version          Display version number 
```

### Create an app by prompt(recommended)
```shell
create-ts-app
```
![demo](https://github.com/Max10240/create-ts-app-monorepo/raw/master/packages/create-ts-app/examples/creat-ts-app/create-by-prompt.gif)

### Or, you can create an app by CLI args
```shell
create-ts-app name-of-project --module=esnext --target=esnext
```
