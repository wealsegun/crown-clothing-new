import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../product-card/product-card.component";
import './shop.styles.scss';

// import SHOP_DATA from "../../shop-data/shop-data.json";

const Shop = () => {
    const {products} = useContext(ProductsContext)

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id } product={product}></ProductCard>;
      })}
    </div>
  );
};

export default Shop;
