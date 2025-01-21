import React, { useContext } from 'react'
import { StockContext } from '../../context/StocksContext'

function Company() {
    const { stockName } = useContext(StockContext);

    if (!stockName) return null;
    
    return (
        <div className="p-4 rounded-lg shadow-md bg-gray-100">
            <h2 className="md:text-2xl text-xl font-semibold text-gray-800 mb-6 text-left">{stockName.companyName}</h2>
            <div className="flex justify-between p-2 border-gray-[#202020]">
                <div className="space-y-4">
                    <div className="flex border-gray-[#101010] border p-3 rounded-lg">
                        <span className="font-bold text-gray-600">BSE:</span>
                        <span className="text-gray-800">{stockName.currentPrice.BSE}</span>
                    </div>
                    <div className="flex border-gray-[#303030] border p-3 rounded-lg">
                        <span className="font-bold text-gray-600">NSE:</span>
                        <span className="text-gray-800">{stockName.currentPrice.NSE}</span>
                    </div>
                    <div className="flex border-gray-[#303030] border p-3 rounded-lg">
                        <span className="font-bold text-gray-600">Year High:</span>
                        <span className="text-gray-800">{stockName.yearHigh}</span>
                    </div>
                    <div className="flex border-gray-[#303030] border p-3 rounded-lg">
                        <span className="font-bold text-gray-600">Year Low:</span>
                        <span className="text-gray-800">{stockName.yearLow}</span>
                    </div>
                </div>
                <div>
                    xyz
                </div>
            </div>
        </div>
    )
}

export default Company
