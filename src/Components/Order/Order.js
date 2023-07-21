import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './order.css'
function Order() {
    const [order, setOrder] = useState([])
    const [token, setToken] = useState("")
    const [status, setStatus] = useState([])
    // const status = []
    const userId = localStorage.getItem('id')
    useEffect(() => {
        axios.get(`https://gkdback.onrender.com/backend/user/user-order-find/${userId}`).then((res) => {
            setOrder(res.data)
           
            axios.get("https://gkdback.onrender.com/backend/payment/ship-verified").then((res) => {
                setToken(res.data.token);

            }).catch((err) => {
                console.log("err from sign", err)
            });
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    useEffect(() => {
        if (token !== "") {
            const fetchOrderStatus = async () => {
                const promises = [...order].reverse().map((item) => {
                  const id = item.orderId
                  const verifyToken = token;
                    return axios.post(
                        "https://gkdback.onrender.com/backend/payment/ship-order-status",{id,verifyToken}
                    );
                });

                try {
                    const responses = await Promise.all(promises);
                    const statuses = responses.map((res) => res.data.data.status);
                    setStatus(statuses);
                } catch (err) {
                    console.log("error while adding", err);
                }
            };

            fetchOrderStatus();
        }
    }, [token]);


    console.log(status)
    return (
        <>
          <div className="corder-container">
  {order && order.length === 0 ? (
    <p>No product found</p>
  ) : (
    <>
      {order &&
        [...order]
          .reverse()
          .map((item, index) => {
            const msg = status[index];
            return (
              <div className="order" key={item.orderId}>
                {item.image && (
                  <img
                    className="order-image"
                    src={`https://giftkidukaan.s3.ap-south-1.amazonaws.com/${item.image}`}
                    alt="Product"
                  />
                )}
                <div className="order-list">
                  <p className="time">{item.timestamp}</p>
                  <p className="order-title">{item.title}</p>
                </div>
                <div className="order-rate">
                  <p className="order-amount">₹{item.rate}</p>
                </div>
                <div className="order-status">
                  <p className="order-status-title">Status:&nbsp; {status[index]}</p>
                </div>
              </div>
            );
          })}
    </>
  )}
</div>
        </>
    )
}

export default Order