import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import './OrderSummary.css';

const OrderSummary = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderRef = doc(fireDB, 'order', id);
                const snap = await getDoc(orderRef);
                if (snap.exists()) {
                    setOrder({ id: snap.id, ...snap.data() });
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const calcTotals = () => {
        if (!order) return { items: 0, total: 0 };
        const items = order.cartItems?.reduce((a, b) => a + (b.quantity || 1), 0) || 0;
        const total = order.cartItems?.reduce((a, b) => a + (parseInt(b.price) * (b.quantity || 1)), 0) || 0;
        return { items, total };
    };

    const { items, total } = calcTotals();

    return (
        <Layout>
            <div className="order-wrapper">
                {loading ? (
                    <div className="order-loading">Loading Order…</div>
                ) : !order ? (
                    <div className="order-empty">Order not found.</div>
                ) : (
                    <div className="order-card">
                        <div className="order-header">
                            <h1 className="order-title">Order Confirmation</h1>
                            <p className="order-subtitle">Order ID: {order.id}</p>
                        </div>

                        <div className="order-section">
                            <h2 className="section-title">Items ({items})</h2>
                            <ul className="items-list">
                                {order.cartItems?.map((it) => (
                                    <li key={it.id} className="item-row">
                                        <img className="item-image" src={it.productImageUrl} alt={it.title} />
                                        <div className="item-info">
                                            <div className="item-title">{it.title}</div>
                                            <div className="item-meta">Qty: {it.quantity || 1}</div>
                                        </div>
                                        <div className="item-price">₹{parseInt(it.price) * (it.quantity || 1)}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-grid">
                            <div className="order-section">
                                <h2 className="section-title">Shipping</h2>
                                <div className="address">
                                    <div className="addr-line">{order.addressInfo?.name}</div>
                                    <div className="addr-line">{order.addressInfo?.address}</div>
                                    <div className="addr-line">Pincode: {order.addressInfo?.pincode}</div>
                                    <div className="addr-line">Mobile: {order.addressInfo?.mobileNumber}</div>
                                </div>
                            </div>

                            <div className="order-section">
                                <h2 className="section-title">Payment</h2>
                                <div className="payment-line">Method: {order.paymentMethod || 'N/A'}</div>
                                <div className="payment-line">Status: Confirmed</div>
                            </div>
                        </div>

                        <div className="order-section order-total">
                            <div className="total-row">
                                <span>Total Amount</span>
                                <strong>₹{total}</strong>
                            </div>
                        </div>

                        <div className="order-actions">
                            <Link to='/' className="btn btn-primary">Continue Shopping</Link>
                            <Link to='/user-profile' className="btn">Go to Profile</Link>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default OrderSummary;



