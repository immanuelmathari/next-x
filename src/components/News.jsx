"use client"
import React, { useEffect, useState } from 'react'

export default function News() {
    const [news, setNews] = useState([]);
    const [articleNumber, setArticleNumber] = useState(3);

    useEffect(() => {
        fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json').then((res) => res.json()).then((data) => {
            setNews(data.articles);
        });
    }, [])
  return (
    <div className='text-gray-700 space-y-1 bg-gray-100 rounded-xl pt-2'>
        <h4 className='font-bold text-xl px-4'>Whats happening</h4>
        {news.slice(0, articleNumber).map((article) => (
            <div className='' key={article.url}>
                <a href={article.url} target='_blank'>
                <div className='flex items-center justify-between px-4 py-2 space-x-1'>
                    <div>
                        <h6 className='text-sm font-bold'>{article.title}</h6>
                        <p className='text-xs font-medium text-gray-500'>{article.source.name}</p>
                        </div>
                        <img src={article.urlToImage} alt={article.title} width={70} className='rounded-xl' />
                    </div>
                    </a>
            </div>
    ))}
    <button onClick={() => setArticleNumber(articleNumber + 3)} className='w-full py-2 bg-gray-200 hover:bg-gray-300 transition duration-200'>
        Load More
    </button>


    </div>
  )
}
