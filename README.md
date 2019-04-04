# Functions

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install @nuware/functions@latest --save
```

or

```html
<script defer src="https://unpkg.com/@nuware/functions@latest/dist/functions.umd.js"></script>
```

or

```html
<script defer src="https://unpkg.com/@nuware/functions@latest/dist/functions.min.js"></script>
```

## Usage

Browser

```javascript
const { K, I, assoc, map ... } = window.nuware.F
```

Node

```javascript
const { K, I, assoc, map ... } = require('@nuware/functions')
```

or

```javascript
import { K, I, assoc, map ... } from '@nuware/functions'
```

## API

### map

```
(a -> b) -> [a] -> [b]
(a -> b) -> Promise a -> Promise b
(a -> b) -> Functor a -> Functor b
```

### each

```
(a -> *) -> [a] -> void
```

### join

```
String -> [*] -> String
```

### filter

```
(a -> Boolean) -> [a] -> [a]
```

### find

```
find :: (a -> Boolean) -> [a] -> [a] | void
```

## Authors

* Dmitry Dudin <dima@nuware.ru>
