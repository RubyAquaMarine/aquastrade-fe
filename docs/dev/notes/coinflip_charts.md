## coinflip

(working)

http://localhost:3000/dashboard/coinflip

- show Contract Balance as the Max Prize aka = MAX BET
- balance returns a huge value ...
- fetches on each input change : change this to useRef
- websocket does retrieve latest info, must disconnect and reconnect
- - promiseALL : multiCall read ^^
- `write:` approve erc20, flip , withdraw ,
- `read:` wins, losses, balance <"Component">
- coinflip still returns `115792089237316195423570985008687907853269984665640564039057.584007913129639936`
- coinflip : userAllowance move into a components ( atm button click fetches allowance twice )
- this `typeof token_balance === 'bigint' ? (` fixes the issue with showing the MAX_INT when object is undefined (coinFlip)

## Charts

- https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi#setdata
- websocket live data for perps using binance
- timeframe toggle
- asset/market/ section drop down menu , needs to import a list of markets , need to fetch markets , need to design how to layout the markets : is this spot or futures api data?

### chart plugins

- https://github.com/tradingview/lightweight-charts/tree/0eef9d7dcc4c0ab67234003ab23f0880f82fa518/plugin-examples
- https://tradingview.github.io/lightweight-charts/plugin-examples/
- https://github.com/tradingview/lightweight-charts/tree/master/plugin-examples/src/plugins/trend-line/example
