import React, { useContext } from 'react'
import { StockContext } from '../../context/StocksContext'

function Company() {
    const { stockName } = useContext(StockContext);

    if(!stockName) return null; 
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{stockName.companyName}</h2>
            <div className="space-y-4">
                <div className="flex justify-between bg-white p-4 rounded-lg shadow-sm">
                    <span className="font-bold text-gray-600">BSE:</span>
                    <span className="text-gray-800">{stockName.currentPrice.BSE}</span>
                </div>
                <div className="flex justify-between bg-white p-4 rounded-lg shadow-sm">
                    <span className="font-bold text-gray-600">NSE:</span>
                    <span className="text-gray-800">{stockName.currentPrice.NSE}</span>
                </div>
                <div className="flex justify-between bg-white p-4 rounded-lg shadow-sm">
                    <span className="font-bold text-gray-600">Year High:</span>
                    <span className="text-gray-800">{stockName.yearHigh}</span>
                </div>
                <div className="flex justify-between bg-white p-4 rounded-lg shadow-sm">
                    <span className="font-bold text-gray-600">Year Low:</span>
                    <span className="text-gray-800">{stockName.yearLow}</span>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Company
