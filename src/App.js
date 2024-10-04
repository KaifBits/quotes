import { useEffect, useState } from 'react';
import img from './quill-pen.png'

function App() {
  const [quote, setQuote] = useState('');
  const [addQuotes, setAddQuotes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Load saved quotes from localStorage when the app starts
  const addfun = () => {
    if (localStorage.getItem('savedQuotes')) {
      const storedQuotes = JSON.parse(localStorage.getItem('savedQuotes'));
      storedQuotes.push(quote);
      setAddQuotes(storedQuotes);
      localStorage.setItem('savedQuotes', JSON.stringify(storedQuotes));
    } else {
      localStorage.setItem('savedQuotes', JSON.stringify([quote]));
    }
    setRefresh(!refresh);
  };

  // Save quotes to localStorage whenever savedQuotes changes
  useEffect(() => {
    fetchQuote();
    const storedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
    setAddQuotes(storedQuotes);
  }, [refresh]);

  const fetchQuote = async () => {
    const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
    const data = await response.json();
    setQuote(data[0]);
  };

  return (
    <div className="container mx-auto p-8">
      <div className='flex justify-center items-center space-x-3'>
      <h1 className="text-center text-3xl font-bold mb-6">Quote Saver</h1>
      <img src={img} alt="bgpic" className='size-10 mb-5'/>
      </div>

      <div className="flex justify-between gap-8">
        {/* Quote Display Section */}
        <div className="w-1/2 h-80 p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Random Quote</h2>
          <p className="text-lg italic mb-6">"{quote}"</p>
          <button
            onClick={addfun}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save Quote
          </button>
          <button
            onClick={()=>{setRefresh(!refresh)}}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ml-6"
          >
            Generate
          </button>
        </div>

        {/* Saved Quotes Section */}
        <div className="w-1/2 p-6 border border-gray-300 rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Saved Quotes</h2>
          <div >
            {addQuotes.length > 0 ? (
              <ul className="list-disc pl-6">
                {addQuotes.map((val, index) => (
                  <li key={index} className="text-lg mb-2">
                    "{val}"
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No saved quotes yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
