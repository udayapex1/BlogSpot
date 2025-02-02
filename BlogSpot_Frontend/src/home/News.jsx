import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
    const [query, setQuery] = useState('Technology'); // Default query
    const [news, setNews] = useState([]);
    const [userInput, setUserInput] = useState(''); // Input state for user query

    useEffect(() => {
        const fetchNews = async () => {
            if (query) {
                try {
                    const { data } = await axios.get(
                        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=f26f46f42ff84421be18222227bdb368`
                    );
                    setNews(data.articles); // Update news state with articles
                    // console.log(data);
                } catch (error) {
                    console.error('Error fetching news:', error.message);
                }
            }
        };

        fetchNews();
    }, [query]); // Fetch news whenever `query` changes

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(userInput); // Update query to trigger the API call
    };

    return (
        <div className="m-5 p-4 sm:m-10 sm:p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Latest News</h1>
    
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4">
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Search for news (e.g., sports, technology)"
                className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
                Search
            </button>
        </form>
    
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.length > 0 ? (
                news.slice(0, 30).map((article, index) => (
                    <li
                        key={index}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col gap-4"
                    >
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title || "News Image"}
                                className="w-full h-40 sm:h-48 object-cover rounded-lg hover:scale-105 transition-transform"
                            />
                        )}
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 hover:text-blue-500 transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                        </div>
                        <div className="text-sm text-gray-500 flex flex-col gap-1">
                            <p>
                                <strong>Author:</strong>{" "}
                                <span>{article.author || "Unknown"}</span>
                            </p>
                            <p>
                                <strong>Published:</strong>{" "}
                                <span>{new Date(article.publishedAt).toLocaleString()}</span>
                            </p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                            >
                                Read Full Article
                            </a>
                        </div>
                    </li>
                ))
            ) : (
                <p className="text-gray-500 text-center col-span-full">
                    No articles found. Try a different query.
                </p>
            )}
        </ul>
    </div>
    
    
    );
};

export default News;
