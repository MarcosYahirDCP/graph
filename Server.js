import { gql, ApolloServer } from "apollo-server";
import { VerRequest} from "./soap.js";
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
          const soapEnvelope = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            <Body>
                <AgregarVentaRequest xmlns="https://t4is.uv.mx/cafeteria">
                    <nombreV>${nombreV}</nombreV>
                    <productos>${productos}</productos>
                    <totalpago>${totalpago}</totalpago>
                </AgregarVentaRequest>
            </Body>
          </Envelope>`;
    
          try {
            const response = await fetch('http://localhost:8081/ws/cafeteria.wsdl', {
              method: 'POST',
              headers: {
                'Content-Type': 'text/xml',
              },
              body: soapEnvelope,
            });
    
            // Verificar si la solicitud fue exitosa
            if (response.ok) {
              // Aquí puedes realizar cualquier procesamiento adicional según la respuesta del servicio SOAP
              return true;
            } else {
              throw new Error(`Error en la solicitud SOAP: ${response.statusText}`);
            }
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
    cors: true
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server running at ${url}`);
});