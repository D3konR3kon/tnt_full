module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            email: String,
            password: String,
            img: {
                type: String,
                default: "https://www.thesait.org.za/global_graphics/default-store-350x350.jpg"
            }
        }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Shop = mongoose.model("shops", schema)
    return Shop
}
