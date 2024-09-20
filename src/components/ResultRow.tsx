type ProviderName = "paybis" | "guardarian" | "moonpay" | "transak";

type ResultRowProps = {
  loading?: boolean;
  providerName?: ProviderName; // Use the union type here
  btc?: string;
};

const logosUrl: Record<ProviderName, { source: string }> = {
  paybis: {
    source:
      "https://paybis.com/blog/wp-content/themes/paybis/assets/images/logo-black.svg",
  },
  guardarian: {
    source:
      "https://guardarian.com/_next/static/media/main-logo-dark.5f4d2bf1.svg",
  },
  moonpay: { source: "https://www.moonpay.com/assets/logo-full-black-n.svg" },
  transak: {
    source: "https://assets.transak.com/images/website/transak-logo.svg",
  },
};

const ResultRow = (props: ResultRowProps) => {
  return (
    <a
      href={`https://${props.providerName}.com`}
      target="_blank"
      className="block relative border min-h-16 border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 my-2 overflow-hidden"
    >
      <div className="flex gap-4 items-center">
        {props.providerName && (
          <div className="grow items-center flex">
            <img
              src={logosUrl[props.providerName].source}
              className="w-24 invert "
              alt={props.providerName}
            />
          </div>
        )}
        {props.btc !== undefined && (
          <div className="flex gap-2">
            <span className="text-xl text-purple-200/80">
              {new Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 8,
              }).format(parseFloat(props.btc))}
            </span>
            <span className="text-xl text-purple-300/50">BTC</span>
          </div>
        )}
      </div>
      {props.loading && (
        <div className="inset-0 absolute rounded-lg bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation"></div>
      )}
    </a>
  );
};

export default ResultRow;
