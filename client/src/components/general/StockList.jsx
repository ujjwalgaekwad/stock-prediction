import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";

function StockList({ stocks }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stocks.map((stock) => (
        <div
          key={stock.name}
          className="bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold">{stock.name}</h3>
          <p className="text-lg mt-2">${stock.price}</p>
          <p
            className={
              stock.change > 0 ? "text-green-500" : "text-red-500"
            }
          >
            {stock.change > 0 ? "+" : ""}
            {stock.change}%
          </p>
          <AddToWishlistButton stockName={stock.name} />
        </div>
      ))}
    </div>
  );
}

export default StockList;
