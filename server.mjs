import jsonServer from "json-server";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router("./db.json");
const prefix = "";

server.use(`${prefix}/api/update`, async (req, res, next) => {
  const { value, collection } = req.body;
  try {
    const response = await router.db.set(collection, value);
    router.db.write();
    res.json({ success: true, data: response });
  } catch (err) {
    console.log(err);
    res.json({ success: false, data: null, error: err });
  }
});

server.use(jsonServer.bodyParser);
server.use(`${prefix}/api`, middlewares);
server.use(`${prefix}/api`, router);

server.listen(process.env.PORT || 8080, () => {
  console.log("JSON Server is running");
});

export default server;
