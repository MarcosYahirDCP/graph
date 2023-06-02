import axios from 'axios';

export async function verVendedores() {
    return new Promise((resolve, reject) => {
        axios.get('https://rest-production-5bba.up.railway.app/vendedores')
            .then((response) => {
                resolve(response.data)
            }).catch((e) => {
                reject("Error " + e);
            })
    })
}
export async function crearVendedor(name, password) {
    return new Promise((resolve, reject) => {
        axios.post('https://rest-production-5bba.up.railway.app/vendedores',
            {
                "name": name,
                "password": password
            })
            .then((response) => {
                resolve(response.data)
            }).catch((e) => {
                reject("Error " + e);
            })
    })
}

export async function verVendedor(id) {
    try {
      const { data } = await axios.get(`https://rest-production-5bba.up.railway.app/vendedores/${id}`);
      const { id: vendedorId, name } = data;
      return {
        id: vendedorId,
        name,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  export async function borrarVendedor(id) {
    try {
      const response = await axios.delete(`https://rest-production-5bba.up.railway.app/vendedores/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  export async function modificarVendedor(id, name, password) {
    return new Promise((resolve, reject) => {
      axios
        .put(`https://rest-production-5bba.up.railway.app/vendedores/${id}`, {
          name: name,
          password: password
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject("Error " + error);
        });
    });
  }