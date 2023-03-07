import { createContext, useState } from "react";
import PRODUCT from '../shop-data/shop-data.json';

export const ProductsContext = createContext({
    products: [],
    setProducts: ()=> [],
});

export const ProductsProvider =({children})=> {
    const [products, setProducts] = useState(PRODUCT);
    const value = {products, setProducts};
    console.log(children);
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )

}

// useEffect(() => {
//     const unsubscribe =
//     return () => {
//         effect
//     };
// }, [input])