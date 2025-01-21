import { useEffect, useState } from "react";
import { createContext } from "react";
import conf from '../conf/conf';

export const StockContext = createContext();

export const StocksProvider = ({ children }) => {
    const defaultSearchValue = 'Zomato';
    const [searchData, setUpdateSearchData] = useState(defaultSearchValue); //zomato
    const [stockName, setStockName] = useState();
    const [stockPrice, setStockPrive] = useState();

    const fetchFuntion = async () => {
        const stockDataName = await fetch(`https://stock.indianapi.in/stock?name=${searchData}`, {
            headers: {
                'X-Api-Key': conf.api_key
            }
        })
        const stockData = await stockDataName.json();
        // console.log(stockData)
        setStockName(stockData);

        const stockDataPrice = await fetch(`https://stock.indianapi.in/historical_data?stock_name=${searchData}&period=1m&filter=default`, {
            headers: {
                'X-Api-Key': conf.api_key
            }
        })
        const stockPrice = await stockDataPrice.json();
        setStockPrive(stockPrice);
    }

    useEffect(() => {
        fetchFuntion();
    }, [searchData]);

    return (
        <StockContext.Provider value={{ searchData, setUpdateSearchData, stockName, setStockName, stockPrice, setStockPrive }}>
            {children}
        </StockContext.Provider>
    )
}