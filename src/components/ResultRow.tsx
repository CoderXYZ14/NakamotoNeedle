type ResultRowProps = {
  loading?: boolean;
};
const ResultRow = (props: ResultRowProps) => {
  return (
    <div className="relative border min-h-12 border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 my-2 overflow-hidden">
      <div className="flex gap-4">
        <div>Logo</div>
        <div className="grow">Provider Name</div>
        <div className="flex gap-2">
          <span className="text-xl text-purple-200/80">0.01</span>
          <span className="text-xl text-purple-300/50">BTC</span>
        </div>
      </div>
      {props.loading && (
        <div className="inset-0 absolute rounded-lg bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation"></div>
      )}
    </div>
  );
};

export default ResultRow;
