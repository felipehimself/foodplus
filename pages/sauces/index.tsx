import { CartLayout } from '../../layouts/CartLayout';

const Sauces = () => {
  return (
    <div>
      {Array.from(Array(1000).keys()).map((i) => {
        return <div key={i}>{i}</div>;
      })}
    </div>
  );
};

Sauces.PageLayout = CartLayout;

export default Sauces;
