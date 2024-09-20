import ResultRow from "./ResultRow";

const LoadingSkeleton = () => {
  return (
    <>
      <ResultRow loading={true} />
      <ResultRow loading={true} />
      <ResultRow loading={true} />
      <ResultRow loading={true} />
    </>
  );
};

export default LoadingSkeleton;
