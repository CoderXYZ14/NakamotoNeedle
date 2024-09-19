type ResultRowProps = {
  loading?: boolean;
  providerName?: string;
  btc?: string;
};

const ResultRow = (props: ResultRowProps) => {
  return (
    <div className="relative border min-h-16 border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 my-2 overflow-hidden">
      <div className="flex gap-4 items-center">
        {props.providerName && <div>Logo</div>}
        <div className="grow">{props.providerName || ""}</div>
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
    </div>
  );
};

export default ResultRow;
