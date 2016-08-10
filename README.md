# SKU Model

This application illustrates the use of SKUID to maintain details of products in a Catalog. It allows the users to create products given the SKUID, make and model.

### Requirements

• NodeJs >= 5.x
• mongodb

### Setup MongoDB

Download and Install MongoDB. Start the Server by having the mongod process running. By default, it will always use port 27017. Create a new Database ‘sku_db’ and add the Makes and Models. Refer the DBSchema.txt file for the sample schema definitions.

### Installation

```
$ git clone git://github.com/shrapar/SKUModel.git
$ npm install
```

then

```
$ npm start
```

Then visit http://localhost:3000/
