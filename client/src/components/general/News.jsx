import React, { useContext, useState, useEffect } from 'react'
import { StockContext } from '../../context/StocksContext';
import conf from '../../conf/conf';


function News() {
    const [recentNews, setRecentNews] = useState();
    const { searchData } = useContext(StockContext);
    useEffect(() => {
        const fetchNews = async () => {
            const stockDataName = await fetch(`https://stock.indianapi.in/stock?name=${searchData}`, {
                headers: {
                    'X-Api-Key': conf.api_key
                }
            })
            const stockData = await stockDataName.json();
            setRecentNews(stockData.recentNews.slice(0, 3));
            console.log("From New Console;",stockData);
        }
        fetchNews();
    }, [searchData])

    return (
        // <div className="news-container">
        //     <h2>Recent News</h2>
        //     {recentNews?.map((newsItem, index) => (
        //         <div key={index} className="news-item">
        //             <div>
        //                 <div className='p-3'>{newsItem.headline}</div>
        //                 <p>{newsItem.date}</p>
        //             </div>
        //         </div>
        //     ))}
        // </div>

        <div>
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">Recent News</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentNews?.map((newsItem, index) => (
                    <div key={index} className="bg-white border rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-medium text-gray-900">{newsItem.headline}</h3>
                        <p className="text-sm text-gray-500 mb-4">{newsItem.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News
