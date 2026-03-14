import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

function ItemList({ products, onDelete, onAdd }) {

    const [apiProducts, setApiProducts] = useState([]);
    const [originalApiProducts, setOriginalApiProducts] = useState([]);
    const [editedProducts, setEditedProducts] = useState(() => {
        const saved = localStorage.getItem('apiEditedProducts');
        return saved ? JSON.parse(saved) : {};
    });
    const [deletedProductIds, setDeletedProductIds] = useState(() => {
        const saved = localStorage.getItem('apiDeletedProducts');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const fetchApiProducts = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=10');
            const data = await response.json();

            if (originalApiProducts.length === 0) {
                setOriginalApiProducts(data);
            }
            let processedData = data.map(product => {
                if (editedProducts[product.id]) {
                    return { ...product, ...editedProducts[product.id] };
                }
                return product;
            });
            
            processedData = processedData.filter(product => !deletedProductIds.has(product.id));
            
            setApiProducts(processedData);
        } catch (error) {
            console.error('Error fetching API products:', error);
        }
    };

    const editApiProduct = (index) => {
        const product = apiProducts[index];
        const newTitle = prompt("Nuevo título", product.title);
        const newDescription = prompt("Nueva descripción", product.description);
        const newPrice = prompt("Nuevo precio", product.price);

        if (newTitle || newDescription || newPrice) {
            const updates = {};
            if (newTitle) updates.title = newTitle;
            if (newDescription) updates.description = newDescription;
            if (newPrice) updates.price = parseFloat(newPrice);
            
            // Guardar cambios en estado local
            setEditedProducts(prev => {
                const newEdited = { ...prev, [product.id]: { ...prev[product.id], ...updates } };
                localStorage.setItem('apiEditedProducts', JSON.stringify(newEdited));
                return newEdited;
            });
            
            // Actualizar producto en la lista
            setApiProducts(prev => prev.map((p, i) => i === index ? { ...p, ...updates } : p));
        }
    };

    const deleteApiProduct = (index) => {
        const product = apiProducts[index];
        
        // Agregar a productos eliminados
        setDeletedProductIds(prev => {
            const newDeleted = new Set(prev);
            newDeleted.add(product.id);
            localStorage.setItem('apiDeletedProducts', JSON.stringify([...newDeleted]));
            return newDeleted;
        });
        
        // Remover de la lista actual
        setApiProducts(prev => prev.filter((_, i) => i !== index));
    };

    const resetApiChanges = () => {
        setEditedProducts({});
        setDeletedProductIds(new Set());
        localStorage.removeItem('apiEditedProducts');
        localStorage.removeItem('apiDeletedProducts');
        // Usar productos originales guardados en lugar de hacer nueva petición
        setApiProducts(originalApiProducts);
    };

    const addApiProduct = async (product) => {
        // Agregar localmente primero para respuesta inmediata
        const newProduct = {
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category?.name || 'Sin categoría'
        };
        onAdd(newProduct);

        // Guardar en Firestore en segundo plano (sin bloquear la UI)
        try {
            const { collection, addDoc } = await import("firebase/firestore");
            const { db } = await import("../services/firebase");
            await addDoc(collection(db, "productos"), newProduct);
        } catch (error) {
            console.error("Error saving to Firestore:", error);
            // Si falla, podríamos mostrar un mensaje de error o revertir el cambio local
        }
    };

    useEffect(() => {
        const loadApiProducts = async () => {
            await fetchApiProducts();
        };
        loadApiProducts();
    }, []);

    return (
        <div>

        <section className="products-section">
            <h2 className="section-title">Lista de los productos que quiero </h2>
            <div className="products-grid">
                {products.map(product => (
                    <ItemCard
                    key={product.id}
                    product={product}
                    onDelete={onDelete}
                    />
                ))}
            </div>
        </section>

        <section className="products-section">
            <h2 className="section-title">Productos </h2>
            <button onClick={resetApiChanges} className="reset-btn">
                Resetear Cambios Locales
            </button>

            <div className="products-grid">
                {apiProducts.map((product, index) => (
                    <div key={product.id} className="product-card">
                        {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.title} className="product-image" />
                        ) : (
                            <div className="product-image">Sin imagen</div>
                        )}
                        <div className="product-content">
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-description">{product.description}</p>
                            <div className="product-meta">
                                <span className="product-price">${product.price}</span>
                                <span className="product-category">{product.category?.name}</span>
                            </div>
                            <div className="product-actions">
                                <button onClick={() => addApiProduct(product)} className="btn btn-success">
                                    Agregar a mis productos
                                </button>
                                <button onClick={() => editApiProduct(index)} className="btn btn-warning">
                                    Editar
                                </button>
                                <button onClick={() => deleteApiProduct(index)} className="btn btn-danger">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        </div>
    );
    }

export default ItemList;
