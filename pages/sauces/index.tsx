const Sauces = () => {
  
  return (
    <div >
      {Array.from(Array(1000).keys()).map((i) => {
        return <div key={i}>{i}</div>;
      })}
    </div>
  );
};
export default Sauces;
