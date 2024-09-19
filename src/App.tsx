import axios from "axios";
import { useState, useEffect } from "react";
import { AmountInput, ResultRow } from "./components";
import { sortBy } from "lodash";

type CachedResult = {
  provider: string;
  btc: string;
};
function App() {
  const [amount, setAmount] = useState("100");
  const [cachedResults, setCachedResult] = useState<CachedResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3000/cached").then((res) => {
      setCachedResult(res.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-6xl text-center font-bold bg-gradient-to-br from-purple-600 to-sky-400 bg-clip-text text-transparent from-30%">
        Find cheapest BTC
      </h1>
      <div className="flex justify-center mt-6">
        <AmountInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mt-6">
        {isLoading && (
          <>
            <ResultRow loading={true} />
            <ResultRow loading={true} />
            <ResultRow loading={true} />
            <ResultRow loading={true} />
          </>
        )}
        {!isLoading &&
          sortBy(cachedResults, "btc")
            .reverse()
            .map((result: CachedResult) => (
              <ResultRow providerName={result.provider} btc={result.btc} />
            ))}
      </div>
    </main>
  );
}

export default App;
