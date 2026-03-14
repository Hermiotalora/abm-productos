import { useState, useEffect } from "react";
import { db } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(data);
  };

  const addProductLocally = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProductLocally = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  useEffect(() => {
    const loadProducts = async () => {
      await getProducts();
    };
    loadProducts();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Productos-H</h1>
      </header>
      <ItemForm onAdd={addProductLocally} />
      <ItemList products={products} onDelete={deleteProductLocally} onAdd={addProductLocally} />
    </div>
  );
}

export default App;
