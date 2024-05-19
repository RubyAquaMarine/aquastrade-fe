# react

## components

- parent -> pass props to child
- - dumb child : only renders when props change

## rendering : React Server Components

- all pages are rendered two times, once on server and once on client : outputs must match otherwise : hydration errors
- server side (by default)
- client side "use client"
- if any page or component has a function has a props, it will cause the component to rerender everytime when using `memo` therefore `useCallback`
- - wrap the function with `useCallback`

## useMemo

import {memo} from react

type Props {
dataChanges?:string
}

functionName( {} :Props){

}

export default memo( functionName);

for big computating

## useCallBack

- to prevent rerenders for child components

## useState

store values, update values

## useEffect

re-run logic when state values change

# useRef

re- run logic without re-rendering the ui (immutable data)

## useState : to rerender ui

if these values change in ui, then re-render

- useful for

```js
onClick ={ () => setStateValue(new.value)}
```

Arrays

```
useState<Array<CandlestickData>>([]);
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
