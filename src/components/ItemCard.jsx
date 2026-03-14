import { db } from "../services/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";

function ItemCard({ product, onDelete }) {

    const deleteProduct = async () => {
        onDelete(product.id);

        try {
            await deleteDoc(doc(db, "productos", product.id));
        } catch (error) {
            console.error("Error deleting product from Firestore:", error);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontSize: '1.2rem', fontWeight: '600' }}>
                Producto Local
            </div>
            <div className="product-content">
                <h3 className="product-title">{product.title || product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                    {product.price && <span className="product-price">${product.price}</span>}
                    {product.status && (
                        <span className={`product-status ${product.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                            {product.status}
                        </span>
                    )}
                </div>
                <div className="product-actions">
                    <button onClick={deleteProduct} className="btn btn-danger">
                        <FaTrash /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
    }

export default ItemCard;
