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
  const [favoritos, setFavoritos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("");
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataCarrito = localStorage.getItem("carrito");
    const dataFavoritos = localStorage.getItem("favoritos");

    if (dataCarrito) setCarrito(JSON.parse(dataCarrito));
    if (dataFavoritos) setFavoritos(JSON.parse(dataFavoritos));

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const productos = {
    camisetas: [
      { img: camisa1, nombre: "Camiseta Oversize Black", precio: "$120.000", stock: 5 },
      { img: camisa2, nombre: "Camiseta Urban White", precio: "$130.000", stock: 4 },
      { img: camisa3, nombre: "Camiseta Street Classic", precio: "$110.000", stock: 6 },
      { img: camisa4, nombre: "Camiseta Premium Edition", precio: "$150.000", stock: 3 },
    ],
    pantalones: [
      { img: pantalon1, nombre: "Pantalón Cargo Negro", precio: "$180.000", stock: 4 },
      { img: pantalon2, nombre: "Jogger Streetwear", precio: "$200.000", stock: 3 },
      { img: pantalon3, nombre: "Pantalón Urban Fit", precio: "$170.000", stock: 6 },
      { img: pantalon4, nombre: "Cargo Premium", precio: "$190.000", stock: 2 },
    ],
    hoodies: [
      { img: buzo1, nombre: "Hoodie Black Premium", precio: "$200.000", stock: 5 },
      { img: buzo2, nombre: "Hoodie Oversize", precio: "$220.000", stock: 4 },
      { img: buzo3, nombre: "Hoodie Urban Gray", precio: "$210.000", stock: 3 },
      { img: buzo4, nombre: "Hoodie Limited", precio: "$230.000", stock: 2 },
    ],
    accesorios: [
      { img: acc1, nombre: "Gorra Blackwear", precio: "$50.000", stock: 8 },
      { img: acc2, nombre: "Cadena Silver", precio: "$60.000", stock: 7 },
      { img: acc3, nombre: "Bolso Urban", precio: "$55.000", stock: 5 },
      { img: acc4, nombre: "Gafas Street", precio: "$70.000", stock: 4 },
    ],
  };

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 2200);
  };

  const convertirPrecio = (precio) => {
    return parseInt(precio.replace("$", "").replace(/\./g, ""));
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.nombre === producto.nombre);
    const cantidadActual = existe ? existe.cantidad : 0;

    if (cantidadActual >= producto.stock) {
      mostrarMensaje("Producto agotado");
      return;
    }

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    mostrarMensaje("Producto agregado al carrito");
  };

  const toggleFavorito = (producto) => {
    const existe = favoritos.find((item) => item.nombre === producto.nombre);

    if (existe) {
      setFavoritos(favoritos.filter((item) => item.nombre !== producto.nombre));
      mostrarMensaje("Producto eliminado de favoritos");
    } else {
      setFavoritos([...favoritos, producto]);
      mostrarMensaje("Producto agregado a favoritos");
    }
  };

  const aumentarCantidad = (nombre) => {
    setCarrito(
      carrito.map((item) =>
        item.nombre === nombre && item.cantidad < item.stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const disminuirCantidad = (nombre) => {
    setCarrito(
      carrito.map((item) =>
        item.nombre === nombre && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const eliminarProducto = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
    mostrarMensaje("Producto eliminado");
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    mostrarMensaje("Carrito vacío");
  };

  const aplicarCupon = () => {
    if (cupon.toUpperCase() === "BLACK10") {
      setDescuento(10);
      mostrarMensaje("Cupón aplicado: 10% de descuento");
    } else {
      setDescuento(0);
      mostrarMensaje("Cupón no válido");
    }
  };

  const subtotal = carrito.reduce(
    (acc, item) => acc + convertirPrecio(item.precio) * item.cantidad,
    0
  );

  const valorDescuento = subtotal * (descuento / 100);
  const total = subtotal - valorDescuento;

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  let productosFiltrados = categoriaActiva
    ? productos[categoriaActiva].filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  if (orden === "menor") {
    productosFiltrados.sort((a, b) => convertirPrecio(a.precio) - convertirPrecio(b.precio));
  }

  if (orden === "mayor") {
    productosFiltrados.sort((a, b) => convertirPrecio(b.precio) - convertirPrecio(a.precio));
  }

  if (orden === "az") {
    productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  const finalizarCompra = () => {
    if (!metodoPago) {
      mostrarMensaje("Selecciona un método de pago");
      return;
    }

    alert(`Compra simulada exitosa con ${metodoPago}. Gracias por comprar en BLACKWEAR.`);
    setCarrito([]);
    setCupon("");
    setDescuento(0);
    setMetodoPago("");
  };

  if (loading) {
    return (
      <div className="loading">
        <h1>BLACKWEAR</h1>
        <p>Cargando tienda...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {mensaje && <div className="toast">{mensaje}</div>}

      <header className="navbar">
        <div className="logo">BLACKWEAR</div>

        <nav>
          <button onClick={() => setCategoriaActiva(null)}>Inicio</button>
          <button onClick={() => setCategoriaActiva("camisetas")}>Tienda</button>
          <button onClick={() => alert("BLACKWEAR es una marca urbana de moda streetwear premium.")}>
            Nosotros
          </button>
        </nav>

        <div className="nav-icons">
          <span>❤️ {favoritos.length}</span>
          <span>🛒 {cantidadTotal}</span>
        </div>
      </header>

      {!categoriaActiva && (
        <>
          <section className="hero">
            <div className="hero-content">
              <p className="tag">Nueva colección 2026</p>
              <h1>BLACKWEAR</h1>
              <h2>Streetwear premium para crear tendencia</h2>
              <button onClick={() => setCategoriaActiva("camisetas")}>
                Comprar ahora
              </button>
            </div>
          </section>

          <section className="section">
            <h2>Categorías</h2>
            <p>Explora nuestra colección urbana.</p>

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
          </section>
        </>
      )}

      {categoriaActiva && (
        <section className="productos">
          <button onClick={() => setCategoriaActiva(null)} className="volver">
            ← Volver al inicio
          </button>

          <h2>{categoriaActiva.toUpperCase()}</h2>

          <div className="controles">
            <input
              className="buscador"
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <select className="ordenar" value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="">Ordenar por</option>
              <option value="menor">Precio menor</option>
              <option value="mayor">Precio mayor</option>
              <option value="az">Nombre A-Z</option>
            </select>
          </div>

          <div className="grid">
            {productosFiltrados.map((p, i) => {
              const esFavorito = favoritos.some((item) => item.nombre === p.nombre);

              return (
                <div key={i} className="card">
                  <button className="favorito" onClick={() => toggleFavorito(p)}>
                    {esFavorito ? "❤️" : "♡"}
                  </button>

                  <img src={p.img} />

                  <div className="card-body">
                    <h3>{p.nombre}</h3>
                    <p>{p.precio}</p>
                    <span className="stock">Stock: {p.stock} unidades</span>

                    <select>
                      <option>Talla S</option>
                      <option>Talla M</option>
                      <option>Talla L</option>
                      <option>Talla XL</option>
                    </select>

                    <button onClick={() => agregarAlCarrito(p)}>
                      Agregar al carrito
                    </button>

                    <button className="detalle-btn" onClick={() => setProductoDetalle(p)}>
                      Ver detalle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {productoDetalle && (
        <div className="modal-fondo">
          <div className="modal">
            <button className="cerrar" onClick={() => setProductoDetalle(null)}>
              ✕
            </button>

            <img src={productoDetalle.img} />

            <div>
              <h2>{productoDetalle.nombre}</h2>
              <p className="stars">★★★★★ 4.9</p>
              <p className="descripcion">
                Producto premium de estilo urbano, cómodo, moderno y perfecto para outfits streetwear.
              </p>
              <h3>{productoDetalle.precio}</h3>
              <p>Stock disponible: {productoDetalle.stock}</p>

              <button onClick={() => agregarAlCarrito(productoDetalle)}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {carrito.length > 0 && (
        <aside className="carrito-panel">
          <h2>Carrito</h2>

          {carrito.map((item, i) => (
            <div key={i} className="carrito-item">
              <img src={item.img} />

              <div>
                <h4>{item.nombre}</h4>
                <p>{item.precio}</p>

                <div className="cantidad">
                  <button onClick={() => disminuirCantidad(item.nombre)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => aumentarCantidad(item.nombre)}>+</button>
                </div>
              </div>

              <button className="eliminar" onClick={() => eliminarProducto(item.nombre)}>
                ✕
              </button>
            </div>
          ))}

          <div className="cupon">
            <input
              type="text"
              placeholder="Código cupón"
              value={cupon}
              onChange={(e) => setCupon(e.target.value)}
            />
            <button onClick={aplicarCupon}>Aplicar</button>
          </div>

          <div className="metodos">
            <p>Método de pago:</p>

            <label>
              <input
                type="radio"
                name="pago"
                value="Tarjeta"
                checked={metodoPago === "Tarjeta"}
                onChange={(e) => setMetodoPago(e.target.value)}
              />
              Tarjeta
            </label>

            <label>
              <input
                type="radio"
                name="pago"
                value="PSE"
                checked={metodoPago === "PSE"}
                onChange={(e) => setMetodoPago(e.target.value)}
              />
              PSE
            </label>

            <label>
              <input
                type="radio"
                name="pago"
                value="Nequi"
                checked={metodoPago === "Nequi"}
                onChange={(e) => setMetodoPago(e.target.value)}
              />
              Nequi
            </label>
          </div>

          <div className="total">
            <span>Subtotal:</span>
            <strong>${subtotal.toLocaleString()}</strong>
          </div>

          {descuento > 0 && (
            <div className="total descuento">
              <span>Descuento:</span>
              <strong>-${valorDescuento.toLocaleString()}</strong>
            </div>
          )}

          <div className="total">
            <span>Total:</span>
            <strong>${total.toLocaleString()}</strong>
          </div>

          <button className="checkout" onClick={finalizarCompra}>
            Finalizar compra
          </button>

          <button className="vaciar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </aside>
      )}

      <footer>
        <h3>BLACKWEAR</h3>
        <p>Moda urbana | Streetwear | Colombia</p>
        <p>Instagram · TikTok · WhatsApp</p>
      </footer>
    </div>
  );
}

export default App;