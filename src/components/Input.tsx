import { ChangeEventHandler } from "react";

export type inputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
};

export default function Input(props: inputProps) {
  return (
    <input
      placeholder={props.placeholder}
      type="text"
      className={"border border-white/10 bg-blue-950 p-2 " + props.className}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
