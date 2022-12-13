import React from 'react';
import imagenPrincipal from "../../assets/imagen principal.png"
import Grid from '@material-ui/core/Grid';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  if (!products.length) return <p>Carregando...</p>;

  return (
    <main className={classes.content}>
      <img className='Img_principal' src={imagenPrincipal} alt="sneaker"></img>
      <Grid container justify="center" spacing={4}>

        {products.map((product) => (
          <Grid key={product.id_produto} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;

