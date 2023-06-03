import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

export const Order = () => {
  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [order, setOrder] = useState();

  console.log(id);

  useEffect(() => {
    const getOrder = async () => {
      const response = await axiosPrivate.get(`/order/order/?userId=${id}`);
      console.log(response);
      setOrder(response.data);
    };

    if (id) {
      getOrder();
    }
  }, [id]);

  console.log({ order });

  if (!order) {
    return null;
  }

  return (
    <div className="row">
      <article className="col">
        <span className="d-block">{order.customer.name}</span>
        <span>{order.customer.email}</span>
      </article>

      <article className="col">
        <address className="span">
          {order.customer.address.line1} {order.customer.address.line2} <br />
          {order.customer.address.city} <br />
          {order.customer.address.state} {order.customer.address.postal_code}
        </address>
      </article>

      <article className="row col">
        {order.items.map((item) => (
          <article className="col" key={`item-${item.game}`}>
            <span className="d-block">{item.game}</span>
            <img src={item.image} alt="" width={150} />
            <span className="d-block">{item.price * item.quantity}</span>
          </article>
        ))}
      </article>
    </div>
  );
};
