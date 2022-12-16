import React, { useContext } from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import StoreContext from '../../Store/Context';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  const { cliente } = useContext(StoreContext);

  const handleUpdateCartQty = (id, nova_quantidade, cliente, id_produto, nome_produto, valor_produto, foto_produto, tamanho_produto, tipo_produto) => onUpdateCartQty(id, nova_quantidade, cliente, id_produto, nome_produto, valor_produto, foto_produto, tamanho_produto, tipo_produto);

  const handleRemoveFromCart = (id, cliente) => onRemoveFromCart(id, cliente);

  return (
    <Card className="cart-item">
      <CardMedia image={item.foto_produto} alt={item.nome_produto} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.nome_produto}</Typography>
        <Typography variant="h5">{item.valor_produto} R$</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantidade - 1, cliente, item.id_produto, item.nome_produto, item.valor_produto, item.foto_produto, item.tamanho_produto, item.tipo_produto)}>-</Button>
          <Typography>&nbsp;{item.quantidade}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantidade + 1, cliente, item.id_produto, item.nome_produto, item.valor_produto, item.foto_produto, item.tamanho_produto, item.tipo_produto)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
