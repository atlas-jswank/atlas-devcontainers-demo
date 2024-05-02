const { MongoClient } = require("mongodb");

(async () => {
    const url = "mongodb://mongo:27017";
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("sales-db");

    await db.collection("sales").deleteMany();
    await db.collection("sales").insertMany([
        {
            item: "abc",
            price: 10,
            quantity: 2,
            date: new Date("2014-04-04T08:00:00Z"),
        },
        {
            item: "jkl",
            price: 20,
            quantity: 1,
            date: new Date("2014-04-02T09:00:00Z"),
        },
    ]);

    const salesOnApril4th = await db.collection("sales").countDocuments({
        date: { $gte: new Date("2014-04-04"), $lt: new Date("2014-04-05") },
    });

    console.log(`${salesOnApril4th} sales occurred in 2014.`);

    client.close();
})().catch(console.error);