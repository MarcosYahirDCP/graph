import { gql, ApolloServer } from "apollo-server";
import { VerRequest, AgregarVentaRequest} from "./soap.js";
import { verVendedores, crearVendedor, verVendedor,borrarVendedor, modificarVendedor } from "./Rest.js";

// Ver todas las definiciones

const definicionTipos = gql`
    type Venta {
        id: Int!
        nombreV: String!
        productos:String!
        totalpago:Int!
    }
    type Vendedor{
      id: Int!
      name: String!
      password: String!
    }
    type Vendedores{
      id: Int!
      name: String!
      password: String!
    }
    
    type Query {
        verVentas:[Venta]!
        verVendedores:[Vendedores]!
        verVendedor(id:Int!):Vendedor
    }
    input VendedorInput {
      name: String
      password: String
    }
    type Mutation {
        agregarVenta(nombreV: String!, productos: String!, totalpago: Int!): Boolean
        crearVendedor(name: String!,password:String!): Vendedor
        borrarVendedor(id: Int!): Boolean
        modificarVendedor(id: Int!, name: String!, password: String!): Vendedor
      }
      
    
`
const resolvers = {
    Query: {
      verVendedor: async (_, args) => {
        try {
          const {id} = args;
          const elemento = await verVendedor(id);
          return elemento;
        } catch (error) {
          throw new Error(error.message);
        }
      },
        verVentas: async () => {
            try {
                const response = await VerRequest();
                console.log(response)
                return (response.ventas)
            } catch (error) {
                throw new Error(error);
            }
        },
        verVendedores: async () => {
          try {
            const response = await verVendedores();
            console.log(response)
            return (response);
          } catch (error) {
            throw new Error(error);
          }
        },
        
        
    },
    Mutation: {
      modificarVendedor: async (_, { id, name, password }) => {
        try {
          const response = await modificarVendedor(id, name, password);
          return response;
        } catch (error) {
          throw new Error(error);
        }
      },

      borrarVendedor: async (_, { id }) => {
      try {
        await borrarVendedor(id);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },

      crearVendedor: async (parent, args) => {

        try {
          const response = await crearVendedor(
            args.name,
            args.password,
            )
            
            console.log(response)
            return (response);
        } catch (e){
          throw new Error(e);
        }
      },

      agregarVenta: async (_, { nombreV, productos, totalpago }) => {
      try {
        const response = await AgregarVentaRequest(nombreV, productos, totalpago);
        // Aquí puedes realizar cualquier procesamiento adicional según la respuesta del servicio SOAP
        return true;
      } catch (error) {
        console.error('Error al realizar la solicitud SOAP:', error);
        throw new Error('Error al realizar la solicitud SOAP');
      }
    },
  },

};

const server = new ApolloServer({
    typeDefs: definicionTipos,
    resolvers,
    cors: true,
    playground: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server running at ${url}`);
});
