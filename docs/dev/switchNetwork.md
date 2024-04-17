```
{chain && chain.id !== CHAIN.id ? (
        <div>
          <p>Please select ChainID: 2046399126</p>
          <button
            onClick={(event) => handleToEuropa(event, 2046399126)}
            className={styles.toggleButton}
          >
            Switch Network
          </button>
        </div>
      ) : (
        <div></div>
      )}
```
