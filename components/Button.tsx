import { IButton } from '../interfaces/Props';

const Button = ({ title, className, onClick, type, disabled }: IButton) => {
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
