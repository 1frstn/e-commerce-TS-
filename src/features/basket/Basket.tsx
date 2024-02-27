import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { ButtonGroup, ListGroup } from "react-bootstrap";
import {
  clearBasket,
  decrementItem,
  incrementItem,
  removeFromBasket,
} from "./basketSlice";
import { ProductType } from "../../types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Basket() {
  const [shoppingCompleted, setShoppingCompleted] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.basket.products);

  const totalAmount: number = products.reduce(
    (total, item) => total + item.amount!,
    0
  );

  const getTotalPrice = (): string => {
    return products
      .reduce((total, item) => total + item.price * item.amount!, 0)
      .toFixed(2);
  };

  const handleRemoveFromBasket = (product: ProductType) => {
    dispatch(removeFromBasket(product));
    toast.error(`${product.title} removed from the basket.`);
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
    handleClose();
    toast.warn("Removed all items from the basket.");
  };

  const handleConfirm = () => {
    handleClose();
    setShoppingCompleted(true);
    toast.info("Shopping completed!");
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementItem(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementItem(id));

    const deleted = products.find((product) => product.id === id);
    if (deleted && deleted.amount === 1) {
      handleRemoveFromBasket(deleted);
    }
  };

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="buttons" onClick={handleShow}>
        <span className="cart-text">Cart</span>
        {totalAmount > 0 && (
          <span className="item-number rounded">{totalAmount}</span>
        )}
      </Button>
      {!shoppingCompleted && totalAmount > 0 && (
        <Link to={"/checkout"}>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="complete-shopping-btn"
          >
            Complete Shopping
          </Button>
        </Link>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products.length === 0 && (
            <div className="text-black">Cart is empty.</div>
          )}
          <ListGroup>
            {products.map((product) => (
              <ListGroup.Item
                key={product.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-2">
                  <img
                    height={32}
                    width={40}
                    src={product.images[0]}
                    alt="Product image"
                  />
                  {product.title} - Pieces: {product.amount}
                </div>
                <ButtonGroup>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleIncrement(product.id)}
                  >
                    +
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleDecrement(product.id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFromBasket(product)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {products.length > 0 && (
            <div>
              <span className="fs-5 bg-transparent text-black d-flex justify-content-center mt-3">
                Total: ${getTotalPrice()}
              </span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClearBasket}
            disabled={products.length === 0}
          >
            Empty Cart
          </Button>
          <Link to={"/checkout"}>
            <Button
              variant="primary"
              disabled={products.length === 0}
              onClick={handleConfirm}
            >
              Complete Shopping
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Basket;
