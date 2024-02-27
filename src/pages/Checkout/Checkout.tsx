import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useAppSelector } from "../../app/store";
import { ProductType } from "../../types";

const CheckoutPage: React.FC = () => {
  const products: ProductType[] = useAppSelector(
    (state) => state.basket.products
  );

  const getTotalPrice = (): number => {
    return products.reduce(
      (total, item) => total + item.price * item.amount!,
      0
    );
  };

  return (
    <Container className="checkout-container mt-5">
      <h1 className="mb-4">Checkout</h1>
      <Row>
        <Col xs={12} lg={8}>
          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.title} - ${product.price.toFixed(2)} x{" "}
                  {product.amount}
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className="order-total">
            <h2>Order Total</h2>
            <div>${getTotalPrice().toFixed(2)}</div>
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className="shipping-address">
            <h2>Shipping Address</h2>
            <Form>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter address" />
              </Form.Group>
              <div className="buttons">
                <Button variant="primary">Save Address</Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={12} lg={8}>
          <div className="payment-method">
            <h2>Payment Method</h2>
            <Form>
              <Form.Group controlId="formCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter card number" />
              </Form.Group>

              <div className="buttons">
                <Button variant="primary">Proceed to Payment</Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
