const db = require('../models')
const Shop = db.shop

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

    const shop = new Shop({
        name: req.body.name,
        img: req.body.img,
        email: req.body.email
    })

    shop
        .save(shop)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Some error"
            })
        })
}

exports.findAll = (req, res) => {
    const name = req.query.name
    let condition = name ? { name: { $regex: new RegExp(name), $options: 'i'} } : {}

    Shop.find(condition)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ msg: err.message || "Some error occurred while retrieving data" })
        })
}
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Shop.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Shop with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Shop with id=" + id });
      });
  };

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({ msg: "Date to update cannot be empty!" })
    }

    const id = req.params.id
    
    Shop.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    msg: `Cannot update Shope with id=${id}. Maybe it was not found`
                })
            } else res.status(201).send({ msg: "Shop was updated successfully." })
        })
        .catch(err => {
            res.status(500).send({ msg: `Error updating Shop with id=${id}`})
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Shop.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({ msg: `Cannot delete Shop with id=${id}. Maybe Shop was not found`})
            } else res.status(201).send({ msg: 'Shop was deleted successfully!' })
        })
        .catch( err => {
            res.status(500).send({ msg: `Could not delete Shop with id=${id}` })
        })
}