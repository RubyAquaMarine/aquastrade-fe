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

## tables

Utilizing React’s React.memo for functional components, or shouldComponentUpdate lifecycle method for class components, helps in implementing this strategy effectively.

Efficient state management plays a critical role in optimizing table performance. Inefficient state updates can lead to unnecessary re-renders, adversely affecting the application’s responsiveness

To address this, make sure your table instance is updated correctly by leveraging the useEffect hook to listen for changes in your data source and then using the table's `setTableData`() method to update the table.

ensure you are using immutable data patterns and updating the state in a manner that React can detect changes, such as spreading into a new array or object. This ensures that the table re-renders and stays in sync with the latest data

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

- `useRef` when using with div elements , This should work for `onClick` and `onTouchStart` situations.

```js
onFocus ={ () => setStateValue(new.value)}
```

- Arrays

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
