import Input, { inputProps } from "./Input";

const AmountInput = (props: inputProps) => {
  return (
    <div className="flex items-center  bg-blue-950 border border-white/10 rounded-lg">
      <Input
        placeholder="Amount"
        className="border-0 w-24 bg-transparent text-xl"
        value={props.value}
        onChange={props.onChange}
      />
      <span className="text-white/50 px-4">USD</span>
    </div>
  );
};

export default AmountInput;
