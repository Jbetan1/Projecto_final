import React from 'react';
import imagenPrincipal from "../../assets/imagen principal.png"
import destaque1 from "../../assets/Converse run.jpg"
import destaque2 from "../../assets/img6.webp"
import destaque3 from "../../assets/img4.jpg"
import destaque4 from "../../assets/imag10.jpg"
import redsocial from "../../assets/face.png"
import redsocial1 from "../../assets/IG.webp"
import redsocial2 from "../../assets/twiter.png"
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
        <Typography className='destaque' gutterBottom variant="h2" component="h2">
            Destaque
        </Typography>
        <div className='list_destaque'>
            <figure>
                <img className='img_destaque' src={destaque1} alt="destaque1" width="200" ></img> 
                <figcaption>Converse Run star</figcaption>
            </figure>
            <figure>
            <img className='img_destaque' src={destaque2} alt="destaque2" width="200" ></img> 
                <figcaption>Air jordan 1 Colores</figcaption>
            </figure>
            <figure>
            <img className='img_destaque' src={destaque3} alt="destaque3" width="200" ></img> 
                <figcaption>Nike SB Ben & Jerry's </figcaption>
            </figure>
            <figure>
            <img className='img_destaque' src={destaque4} alt="destaque4" width="200"></img> 
                <figcaption>Nike Dunk Blue Clear</figcaption>
            </figure>
        </div>
        <div className='padding_product'>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid key={product.id_produto} item xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </div>
        <footer id="contato" className="contato">
            <section className="contato-content">           
                <section className="texto-contato">
                    <h2 className="titulo-contato">Contato</h2>
                    <p>Quer entrar em contato con a loja ?</p>
                    <p>Você pode nos encontrar nas seguintes redes sociais:</p>
                    
                    <section className="social-media-content-1">
                        <section className="center-1">
                            <a href="https://www.facebook.com/smockjose" target="_blank" className="text-media">
                                <img className="social-media-4" src={redsocial} alt="logotipo de facebook"></img>
                                Facebook
                            </a>
                            <a href="https://www.instagram.com/jos3betancourt/" target="_blank" className="text-media">
                                <img className="social-media-4"  src={redsocial1} alt="logotipo de instagram"></img>
                                Instagram
                            </a>
                            <a href="https://twitter.com/Jose27273015" target="_blank" className="text-media">
                                <img className="social-media-4"  src={redsocial2} alt="logotipo de twitter"></img>
                                Twitter
                            </a>
                        </section>
                    </section>
                </section>
            </section>
        </footer>
    </main>
  );
};

export default Products;

