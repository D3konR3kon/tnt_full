const db = require('../models')
const Product = db.product
const Shop = db.shop

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Product.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found product with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Product with id=" + id });
      });
  };

exports.create = (req, res) => {
    const id = req.params.id;
  
    Shop.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Product with id " + id });
        else {
            if (!req.body) {
                res.status(400).send({ message: "Content can not be empty!" });
                return;
            }
    
            const product = new Product({
                name: req.body.name,
                img: req.body.img,
                price: req.body.price,
                shopId: data.id,
                qty:req.body.qty,
                dec:req.body.dec
            })
    
            product.save(product)
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        msg: err.message || "Some error"
                    })
                })
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Shop with id=" + id });
      });
      
        
    
    
}

exports.menu = (req, res) => {

    Product.find({ shopId: req.params.id })
        .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({ msg: err.message || "Some error occurred while retrieving data" })
    })
}

exports.findAll = (req, res) => {
    const name = req.query.name
    let condition = name ? { name: { $regex: new RegExp(name), $options: 'i'} } : {}

    Product.find(condition,)
        .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({ msg: err.message || "Some error occurred while retrieving data" })
    })
}
   

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({ msg: "Date to update cannot be empty!" })
    }

    const id = req.params.id
    
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    msg: `Cannot update Product with id=${id}. Maybe it was not found`
                })
            } else res.status(201).send({ msg: "Product was updated successfully." })
        })
        .catch(err => {
            res.status(500).send({ msg: `Error updating Product with id=${id}`})
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Product.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({ msg: `Cannot delete Product with id=${id}. Maybe Shop was not found`})
            } else res.status(201).send({ msg: 'Product was deleted successfully!' })
        })
        .catch( err => {
            res.status(500).send({ msg: `Could not delete Product with id=${id}` })
        })
}


exports.deleteAll = (req, res) => {
    
    Product.deleteMany({shopId:req.params.id})
        .then(data => {
            res.status(404).send({ 
                message: `$(data.deletedCount} Products were deleted successfully!` 
            });
           
        })
        .catch(err => {
            res.status(500).send({
               message:
                err.message || "Some error occured while removing all Products."
            });
        });
}