import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useGetProductsQuery } from "../../features/products/productApi";
import { useAppDispatch } from "../../app/store";
import { addToBasket } from "../../features/basket/basketSlice";
import { toast } from "react-toastify";
import { ProductType } from "../../types";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="spinner fs-5">
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="spinner">Error please reload page.</div>;
  }

  //sepete ekleme
  const handleAddToBasket = (product: ProductType) => {
    console.log("dasd", product);

    dispatch(addToBasket(product));
    toast.success(`${product.title} Added to the basket.`, {
      position: "top-right",
    });
  };

  return (
    <div className="page-container">
      <h1 className="main-title">Welcome to our Store</h1>{" "}
      {/* Add a wrapper div with page-container class */}
      <Container className="my-4">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {data?.products.map((product: ProductType) => (
            <Col key={product.id}>
              <Card className="h-100 product-card">
                <Link
                  to={`/products/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card.Img
                    variant="top"
                    src={product.images[0]}
                    className="card-img-top"
                  />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text className="text-success fw-bold">
                      ${product.price}
                    </Card.Text>
                  </Card.Body>
                </Link>
                <div className="button-container">
                  <Button
                    variant="primary"
                    onClick={() => handleAddToBasket(product)}
                    className="add-to-basket-button"
                  >
                    Add to Basket
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;
