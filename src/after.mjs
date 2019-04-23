import path from "path";

export default function after({ dirname }) {
  return app => {
    app.get("/res/*", (req, res) => {
      res.sendFile(path.join(dirname, "src", req.originalUrl));
    });
    app.get("/bundle/*", (req, res) => {
      res.sendFile(path.join(dirname, req.originalUrl));
    });
  };
}
