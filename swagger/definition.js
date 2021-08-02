const { version } = require('../package.json');


const options =  {  
        definition: {
          openapi: '3.0.3',
          info: {
              title: 'Proyecto ONG Alkemy',
              version,
              description: 'API en Node.js para fundación "Zonas Grises" '
          },
           servers: [
		      	  {
			      	  url: "http://localhost:3000", /* <--- must find a way to not hardcode this */
			        }
		       ],
         },
         apis: ['./swagger/documentations/*.yaml']
}

module.exports = options