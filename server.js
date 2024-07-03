import { createServer, Model } from 'miragejs';

createServer({
  models: {
    vans: Model,
  },

  seeds(server) {
    server.create('pizza', {
      id: '1',
      name: 'Focaccia',
      price: 6,
      description: 'Bread with italian olive oil and rosemary',
      imageUrl:
        'https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png',
      soldOut: false,
    });
    server.create('pizza', {
      id: '2',
      name: 'Pizza Margherita',
      price: 10,
      description: 'Tomato, mozarella, spinach and ricotta cheese',
      imageUrl:
        'https://assets.scrimba.com/advanced-react/react-router/beach-bum.png',
      soldOut: false,
    });
    server.create('pizza', {
      id: '3',
      name: 'Pizza Spinacci',
      price: 12,
      description: 'Delicious',
      imageUrl:
        'https://assets.scrimba.com/advanced-react/react-router/reliable-red.png',
      soldOut: true,
    });
    server.create('pizza', {
      id: '4',
      name: 'Pizza Funghi',
      price: 12,
      description: 'Delicious',
      imageUrl:
        'https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png',
      soldOut: false,
    });
    server.create('pizza', {
      id: '5',
      name: 'Pizza Salamino',
      price: 17,
      description: 'Delicious',
      imageUrl:
        'https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png',
      soldOut: false,
    });
    server.create('pizza', {
      id: '6',
      name: 'Pizza  Prosciutto',
      price: 18,
      description: 'Delicious',
      imageUrl:
        'https://assets.scrimba.com/advanced-react/react-router/green-wonder.png',
      soldOut: false,
    });
  },

  routes() {
    this.namespace = 'api';
    this.logging = false;
    // this.timing = 2000

    this.get('/pizzas', (schema, request) => {
      // return new Response(400, {}, {error: "Error fetching data"})
      return schema.pizzas.all();
    });

    this.get('/pizzas/:id', (schema, request) => {
      const id = request.params.id;
      return schema.pizzas.find(id);
    });
  },
});
