interface IProps {
  title: string;
  className?: string;
  onClick: Function;
  type?: 'submit' | 'button';
  disabled?:boolean
}
const Button = ({ title, className, onClick, type, disabled }: IProps) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${className} transition-all px-7 py-3 text-xs`}
      type={type}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
export default Button;
