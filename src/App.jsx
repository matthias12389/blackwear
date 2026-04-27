import { useState, useEffect } from "react";
import "./styles/main.css";

import camisa from "./assets/camisa_principal.jpg";
import pantalon from "./assets/pantalon_principal.jpg";
import buzo from "./assets/buzo_principal.jpg";
import accesorios from "./assets/accesorios_principales.jpg";

import camisa1 from "./assets/camisa1.jpg";
import camisa2 from "./assets/camisa2.jpg";
import camisa3 from "./assets/camisa3.jpg";
import camisa4 from "./assets/camisa4.jpg";

import pantalon1 from "./assets/pantalon1.jpg";
import pantalon2 from "./assets/pantalon2.jpg";
import pantalon3 from "./assets/pantalon3.jpg";
import pantalon4 from "./assets/pantalon4.jpg";

import buzo1 from "./assets/buzo1.jpg";
import buzo2 from "./assets/buzo2.jpg";
import buzo3 from "./assets/buzo3.jpg";
import buzo4 from "./assets/buzo4.jpg";

import acc1 from "./assets/accesorio1.jpg";
import acc2 from "./assets/accesorio2.jpg";
import acc3 from "./assets/accesorio3.jpg";
import acc4 from "./assets/accesorio4.jpg";

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("carrito");
    if (data) setCarrito(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.nombre === producto.nombre);

    if (existe) {
      const nuevo = carrito.map((item) =>
        item.nombre === producto.nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevo);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarProducto = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce((acc, item) => {
    const numero = item.precio.replace("$", "").replace(/\./g, "");
    return acc + parseInt(numero) * item.cantidad;
  }, 0);

  const productos = {
    camisetas: [
      { img: camisa1, nombre: "Camiseta 1", precio: "$120.000" },
      { img: camisa2, nombre: "Camiseta 2", precio: "$130.000" },
      { img: camisa3, nombre: "Camiseta 3", precio: "$110.000" },
      { img: camisa4, nombre: "Camiseta 4", precio: "$150.000" },
    ],
    pantalones: [
      { img: pantalon1, nombre: "Pantalón 1", precio: "$180.000" },
      { img: pantalon2, nombre: "Pantalón 2", precio: "$200.000" },
      { img: pantalon3, nombre: "Pantalón 3", precio: "$170.000" },
      { img: pantalon4, nombre: "Pantalón 4", precio: "$190.000" },
    ],
    hoodies: [
      { img: buzo1, nombre: "Hoodie 1", precio: "$200.000" },
      { img: buzo2, nombre: "Hoodie 2", precio: "$220.000" },
      { img: buzo3, nombre: "Hoodie 3", precio: "$210.000" },
      { img: buzo4, nombre: "Hoodie 4", precio: "$230.000" },
    ],
    accesorios: [
      { img: acc1, nombre: "Accesorio 1", precio: "$50.000" },
      { img: acc2, nombre: "Accesorio 2", precio: "$60.000" },
      { img: acc3, nombre: "Accesorio 3", precio: "$55.000" },
      { img: acc4, nombre: "Accesorio 4", precio: "$70.000" },
    ],
  };

  return (
    <div>
      <div className="navbar">
        <h2>BLACKWEAR</h2>
        <div className="cart">🛒 {carrito.length}</div>
      </div>

      {carrito.length > 0 && (
        <div className="carrito-info">
          <p>Productos: {carrito.length}</p>
          <p>Total: ${total.toLocaleString()}</p>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </div>
      )}

      {carrito.length > 0 && (
        <div className="carrito-lista">
          {carrito.map((item, i) => (
            <div key={i} className="carrito-item">
              <img src={item.img} />
              <div>
                <p>{item.nombre}</p>
                <span>{item.precio} x{item.cantidad}</span>
              </div>
              <button onClick={() => eliminarProducto(item.nombre)}>X</button>
            </div>
          ))}
        </div>
      )}

      {!categoriaActiva && (
        <>
          <div className="hero"></div>

          <div className="categories">
            <div className="category" onClick={() => setCategoriaActiva("camisetas")}>
              <img src={camisa} />
              <span>Camisetas</span>
            </div>

            <div className="category" onClick={() => setCategoriaActiva("pantalones")}>
              <img src={pantalon} />
              <span>Pantalones</span>
            </div>

            <div className="category" onClick={() => setCategoriaActiva("hoodies")}>
              <img src={buzo} />
              <span>Hoodies</span>
            </div>

            <div className="category" onClick={() => setCategoriaActiva("accesorios")}>
              <img src={accesorios} />
              <span>Accesorios</span>
            </div>
          </div>
        </>
      )}

      {categoriaActiva && (
        <div className="productos">
          <button onClick={() => setCategoriaActiva(null)} className="volver">
            ← Volver
          </button>

          <h2>{categoriaActiva.toUpperCase()}</h2>

          <div className="grid">
            {productos[categoriaActiva].map((p, i) => (
              <div key={i} className="card">
                <img src={p.img} />
                <h3>{p.nombre}</h3>
                <p>{p.precio}</p>
                <button onClick={() => agregarAlCarrito(p)}>Agregar</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;