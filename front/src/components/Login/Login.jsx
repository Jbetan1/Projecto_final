import React, { useState, useContext } from 'react';
import axios from 'axios';
import StoreContext from '../Store/Context';

import { Typography } from '@material-ui/core';
import useStyles from './styles';

import { Link, useHistory } from 'react-router-dom';

export default function Login() {

  const classes = useStyles();
  const history = useHistory();
  const { setCliente } = useContext(StoreContext);

  const [data, setData] = useState ({email: "", senha: ""})

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data.email !== 'admin' || data.senha !== 'admin') {
      await axios.get(`http://localhost:3000/cliente?email=${data.email}`)
      .then((response) => {
        if(data.senha === response.data[0].senha) {
          setCliente(response.data[0].id);
          history.push("/");
        }
      }, (error) => {
        console.log(error);
      });
    }else {
      setCliente(99);
      history.push("/");
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.containerForm}>
            <form onSubmit={handleSubmit}>
              <label><h3>E-mail:
                  <input
                    type="text"
                    name="email"
                    placeholder="E-Mail"
                    defaultValue={data.email}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <label><h3>Senha:
                  <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    defaultValue={data.senha}
                    onChange={handleChange}
                    required
                  /></h3>
              </label>
              <div className="button">                
                <button className="salvar" type="submit">Accese</button>
              </div>
            </form>            
              <div className="buttonNew">
              <Typography component={Link} to="/cadastro" variant="button" className={classes.button} color="inherit">
                Cadastrese aqui
              </Typography>
              </div>
      </div>
    </div>
  );
}
