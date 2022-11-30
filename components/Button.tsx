interface IProps {
  title: string;
  className?: string;
}
const Button = ({ title, className }: IProps) => {
  return (
    <button
      className={`${className}  transition-all   rounded-xl px-7 py-3 text-xs`}
    >
      {title}
    </button>
  );
};
export default Button;
