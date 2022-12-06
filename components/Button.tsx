interface IProps {
  title: string;
  className?: string;
  onClick: Function;
}
const Button = ({ title, className, onClick }: IProps) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${className}  transition-all   rounded-xl px-7 py-3 text-xs`}
    >
      {title}
    </button>
  );
};
export default Button;
