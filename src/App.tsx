import axios from "axios";
import { useState, useEffect } from "react";
import { AmountInput, ResultRow } from "./components";
import { sortBy } from "lodash";
import useDebouncedEffect from "use-debounced-effect";

type ProviderName = "paybis" | "guardarian" | "moonpay" | "transak";

type CachedResult = {
  provider: string;
  btc: string;
};

type OfferResult = { [key: string]: string };

// Type guard to check if a string is a valid ProviderName
const isProviderName = (name: string): name is ProviderName => {
  return ["paybis", "guardarian", "moonpay", "transak"].includes(name);
};

function App() {
  const [prevAmount, setPrevAmount] = useState("100");
  const [amount, setAmount] = useState("100");
  const [cachedResults, setCachedResult] = useState<CachedResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offerResults, setOfferResults] = useState<OfferResult>({}); // Explicit type

  useEffect(() => {
    axios.get("http://localhost:3000/cached").then((res) => {
      setCachedResult(res.data);
      setIsLoading(false);
    });
  }, []);

  useDebouncedEffect(
    () => {
      if (amount !== prevAmount) {
        setIsLoading(true);
        axios.get(`http://localhost:3000/?amount=${amount}`).then((res) => {
          setIsLoading(false);
          setOfferResults(res.data);
          setPrevAmount(amount);
        });
      }
    },
    500,
    [amount]
  );

  const showCached = amount === "100";

  // Correctly type sortedResults as CachedResult[]
  const sortedResults: CachedResult[] = sortBy(
    Object.keys(offerResults).map((provider) => ({
      provider,
      btc: offerResults[provider],
    })),
    "btc"
  ).reverse();

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
          showCached &&
          sortBy(cachedResults, "btc")
            .reverse()
            .map((result: CachedResult) => {
              const providerName = isProviderName(result.provider)
                ? result.provider
                : undefined;
              return (
                <ResultRow
                  key={result.provider}
                  providerName={providerName}
                  btc={result.btc}
                />
              );
            })}
        {!isLoading &&
          !showCached &&
          sortedResults.map((result) => (
            <ResultRow
              key={result.provider}
              providerName={result.provider}
              btc={result.btc}
            />
          ))}
      </div>
    </main>
  );
}

export default App;
