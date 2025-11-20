export const Country = (props) => {
  const flagUrl = props.flagUrl;
  const name = props.official;
  return (
    <div className="w-[300px] h-[200px]">
      <img src={flagUrl} className="w-full h-full" />
      <div>{name}</div>
    </div>
  );
};
