import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, Login, Cadastro, StoreProvider } from './components';

const App = () => {
  const cliente = localStorage.getItem("cliente");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [totalItems, setTotalItems] = useState(Number);
 
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/productos`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/cart?id_cliente=${cliente}`
      );

      setCart(res.data);
      setTotalItems(res.data.length)
    } catch (err) {
      console.log(err);
    }
    //console.log('2',listItem.data)

  };

  const handleAddToCart = async (productId, quantidade, id_cliente, nome_produto, valor_produto, foto_produto, tamanho_produto, tipo_produto) => {
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id_produto === productId) {
          handleUpdateCartQty(cart[i].id, cart[i].quantidade + 1 , cart[i].id_cliente, cart[i].id_produto, cart[i].nome_produto, cart[i].valor_produto, cart[i].foto_produto, cart[i].tamanho_produto, cart[i].tipo_produto);
          break;
        } 
        if (cart.length - 1 === i && cart[i].id_produto !== productId){
          try {
            await axios.post(
              `http://localhost:3000/cart`,
              {
                "id_produto": productId,
                "id_cliente": id_cliente,
                "quantidade": quantidade,
                "nome_produto": nome_produto,
                "valor_produto": valor_produto,
                "foto_produto": foto_produto,
                "tamanho_produto": tamanho_produto,
                "tipo_produto": tipo_produto,
              }
            );
            fetchCart()
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else {
      try {
        await axios.post(
          `http://localhost:3000/cart`,
          {
            "id_produto": productId,
            "id_cliente": id_cliente,
            "quantidade": quantidade,
            "nome_produto": nome_produto,
            "valor_produto": valor_produto,
            "foto_produto": foto_produto,
            "tamanho_produto": tamanho_produto,
            "tipo_produto": tipo_produto,
          }
        );
        fetchCart()
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdateCartQty = async (id, nova_quantidade, id_cliente, id_produto, nome_produto, valor_produto, foto_produto, tamanho_produto, tipo_produto) => {
    if (nova_quantidade <= 0) {
      handleRemoveFromCart(id)
    } else {
      try {
        const res = await axios.put(
          `http://localhost:3000/cart/${id}`,
          {
            "quantidade": nova_quantidade,
            "id_cliente": id_cliente,
            "id_produto": id_produto,
            "nome_produto": nome_produto,
            "valor_produto": valor_produto,
            "foto_produto": foto_produto,
            "tamanho_produto": tamanho_produto,
            "tipo_produto": tipo_produto
          }
        );
        if(res.status !== 200) {
          console.log(res)
        }
        fetchCart()
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/cart/${id}`
      );
      fetchCart()
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmptyCart = async (id_cliente) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/cart/`+id_cliente
      );
      if(res.status !== 200) {
        console.log(res)
      }
      fetchCart()
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <StoreProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar totalItems={totalItems} handleDrawerToggle={handleDrawerToggle} />
            <Switch>
              <Route exact path="/">
                <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
              </Route>
              <Route exact path="/cart">
                <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/cadastro" exact>
                <Cadastro />
              </Route>
            </Switch>
        </div>
      </Router>
    </StoreProvider>

  );
};

export default App;
