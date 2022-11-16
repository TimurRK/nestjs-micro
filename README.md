# NestJS-Micro

* NestJS 9
* Lerna 6

## Dependencies

* [NodeJS 16](https://nodejs.org/download/release/latest-v16.x/)

## Installation

```bash
npm i -g lerna
```

```bash
npm ci
```

### Packages

### Add global package

```bash
npm i ${package_name}
```

or

```bash
npm i -D ${package_name}
```

### Add package to workspace

```bash
lerna add ${package_name} --scope ${scope_name}
```

or

```bash
lerna add ${package_name} --dev --scope ${scope_name}
```
