import { createContext, useState } from "react";
import conf from '../conf/conf';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Search } from "lucide-react";


export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stockData, setStockData] = useState();
  const [SearchData, UpdateSearchData] = useState("Tata steel");

  const { error, isPending, data } = useQuery({
    queryKey: ["Stock", stockData],
    queryFn: async () => {
      try {
        const response = await fetch(`https://stock.indianapi.in/stock?name=${SearchData}`, {
          headers: {
            'X-Api-Key': conf.api_key
          }
        })
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.log("Stock context catch error", error);
        throw error
      }
    },
    enabled: !!Search
  })

  const stockValues = {
    data,
    error,
    isPending,
    UpdateSearchData,
    stockData,
  }

  return (
    <StockContext.Provider value={stockValues}>
      {children}
    </StockContext.Provider>
  )
}