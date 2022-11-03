module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            img: String,
            price: Number,
            shopId: String,
            qty:{
                type:Number,
                default:1
            },
            dec:String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object
    })

    const Product = mongoose.model("products", schema)
    return Product
}

