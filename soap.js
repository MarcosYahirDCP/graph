import soap from 'soap'

export async function VerRequest() {
    var xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <VerRequest xmlns="https://t4is.uv.mx/cafeteria">[any]</VerRequest>
    </Body>
    </Envelope>
    `
    var url = "http://ip172-18-0-10-chtqk9ogftqg00cmu54g-8081.direct.labs.play-with-docker.com/ws/cafeteria.wsdl"
    return new Promise((resolve, reject) => {
        soap.createClient(url, function (error, client) {
            if (error) {
                reject("error " + error)
            } else {
                client.Ver(xml, function (error, response) {
                    if (error) {
                        reject("error " + error)
                    } else {
                        resolve(response)
                    }
                })
            }
        });
    });
}

export async function AgregarVentaRequest(nombreV, productos, totalpago){
    var xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <AgregarVentaRequest xmlns="https://t4is.uv.mx/cafeteria">
            <nombreV>${nombreV}</nombreV>
            <productos>${productos}</productos>
            <totalpago>${totalpago}</totalpago>
        </AgregarVentaRequest>
    </Body>
</Envelope>
    `
    var url = "http://ip172-18-0-10-chtqk9ogftqg00cmu54g-8081.direct.labs.play-with-docker.com/ws/cafeteria.wsdl"
    return new Promise((resolve, reject) => {
        soap.createClient(url, function (error, client) {
            if (error) {
                reject("error " + error)
            } else {
                client.AgregarVenta(xml, function (error, response) {
                    if (error) {
                        reject("error " + error)
                    } else {
                        resolve(response)
                    }
                })
            }
        });
    });

    
}
