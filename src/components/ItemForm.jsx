import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

function ItemForm({ onAdd }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el nuevo producto
        const newProduct = {
            name,
            description,
            price: parseFloat(price) || 0,
            status
        };

        // Agregar localmente primero para respuesta inmediata
        const tempProduct = {
            ...newProduct,
            id: `temp-${Date.now()}` // ID temporal hasta que se guarde en Firestore
        };
        onAdd(tempProduct);

        // Limpiar formulario inmediatamente
        setName("");
        setDescription("");
        setPrice("");
        setStatus("");

        // Guardar en Firestore en segundo plano
        try {
            await addDoc(collection(db, "productos"), newProduct);
        } catch (error) {
            console.error("Error adding product:", error);
            // Si falla, podriamos mostrar un mensaje de errory quitar el producto temporal de la lista
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Agregar Nuevo Producto</h2>

            <div className="form-group">
                <label htmlFor="name">Nombre del Producto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Ej: iPhone 15 Pro"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                    id="description"
                    type="text"
                    placeholder="Descripción del producto"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Precio</label>
                <input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                />
            </div>

            <div className="form-group">
                <label htmlFor="status">Estado</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Seleccionar estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Sin STOCK">Sin STOCK</option>
                    <option value="Proximamente">Proximamente</option>
                </select>
            </div>

            <button type="submit" className="submit-btn">
                Agregar Producto
            </button>
        </form>
    );
}

export default ItemForm;
