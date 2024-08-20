import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Minus, Plus, Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
  incrementCart: (CartItem: CartItem) => void;
  decrementCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({
  restaurant,
  cartItems,
  incrementCart,
  decrementCart,
  removeFromCart,
}: Props) => {
  const getTotalCost = () => {
    const totalInCents = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const totalWithDelivery = totalInCents + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 ">
        {cartItems.map((item) => (
          <div className="flex justify-between gap-x-1">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span></span>
            <span></span>

            <span className="flex items-center gap-2">
              <Minus
                size={20}
                onClick={() => decrementCart(item)}
                color="red"
                className="size-5 cursor-pointer  mt-1 flex items-center justify-center"
              />
              <Plus
                size={20}
                color="green"
                onClick={() => incrementCart(item)}
                className="size-5 cursor-pointer  mt-1 flex items-center justify-center"
              />
              ${((item.price * item.quantity) / 100).toFixed(2)}
              <Trash color="red" size={20} className="cursor-pointer" onClick={()=>removeFromCart(item)} />
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
