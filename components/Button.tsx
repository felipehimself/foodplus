interface IProps {
  title: string;
  className?: string;
}
const Button = ({ title, className }: IProps) => {
  return (
    <button
      className={`${className} transition-all bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-7 py-3 text-xs`}
    >
      {title}
    </button>
  );
};
export default Button;
