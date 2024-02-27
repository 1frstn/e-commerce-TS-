import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Spinner, Button } from "react-bootstrap";
import { useAppDispatch } from "../../app/store";
import { addToBasket } from "../../features/basket/basketSlice";
import { toast } from "react-toastify";
import { ProductType } from "../../types";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching product details");
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToBasket = (product: ProductType) => {
    dispatch(addToBasket(product));
    toast.success(`${product.title} Added to the basket.`, {
      position: "top-right",
    });
  };

  if (isLoading) {
    return (
      <div className="spinner fs-5">
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="spinner">{error}</div>;
  }

  if (!product) {
    return <div className="spinner">Product not found</div>;
  }

  return (
    <Container className="product-container">
      <Row>
        <Col xs={12} md={6} className="image-col">
          <img
            src={product.images[0]}
            alt={product.title}
            className="product-image"
          />
        </Col>
        <Col xs={12} md={6} className="details-col">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <Button variant="primary" onClick={() => handleAddToBasket(product)}>
            Add to Basket
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
