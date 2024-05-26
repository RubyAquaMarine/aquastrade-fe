The righ tway for props

```
               <PoolPrice {...{id:inputPoolAddress, pool:inputPoolAddress}}></PoolPrice>
```

## component

```
type Data = {
    id: string;
    pool: string;
  };

const PoolPrice = (params: Data) => {
    const price = useAquaFeed("getPoolPriceWithAddress", [params?.pool]);

```

## use memo

```
    const data: DataFeedV[] = useMemo(() => newArray, []);
```
