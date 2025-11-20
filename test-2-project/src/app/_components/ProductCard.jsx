import { Button } from "@/components/ui/button";

export const ProductCard = (props) => {
  const title = props.title;
  const price = props.price;
  const category = props.category;
  const imgUrl = props.imgUrl;
  const onChange = props.onChange;
  return (
    <div>
      <img src={imgUrl} className="w-50 h-50" />
      <div>{title}</div>
      <div>{category}</div>
      <div>{price}</div>
      <Button onClick={onChange}>view details</Button>
    </div>
  );
};
