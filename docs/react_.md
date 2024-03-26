# react

## rendering : React Server Components

- all pages are rendered two times, once on server and once on client : outputs must match otherwise : hydration errors
- server side (by default)
- client side "use client"

## useMemo

for for big computating

## useCallBack

- to prevent rerenders for child components

## useState

store values, update values

## useEffect

re-run logic when state values change

# useRef

re- run logic without re-rendering the ui (immutable data)

## useState : to rerender ui

if these values change, then re-render

- useful for

```js
onClick ={ () => setValueForuseState(new.value)}
```

## hooks

must be called at top of function components

```js
function APP() {
  useHook();

  const notThisWay = () => {
    useDontDoThis();
  };
}
```
