import { app, Datastore } from "codehooks-js";
import { crudlify } from "codehooks-crudlify";
import { date, object, string, boolean } from "yup";
import jwtDecode from "jwt-decode";

/*
 * Kluver Code from: https://github.com/csci5117s23/Tech-Stack-2-Kluver-Demo/blob/main/backend/index.js
 */
const userAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const token = authorization.replace("Bearer ", "");
            const token_parsed = jwtDecode(token);
            req.user_token = token_parsed;
        }
        next();
    } catch (error) {
        next(error);
    }
};
app.use(userAuth);
/*
 * End of Kluver Code
 */

const todosSchema = object({
    title: string().required(),
    description: string().required(),
    dueDate: date().required(),
    completed: boolean().default(() => false),
    priority: string().oneOf(["High", "Medium", "Low"]).required(),
    category: string().required(),
    userId: string().required(),
    createdOn: date().default(() => new Date()),
});

const categorySchema = object({
    title: string().required(),
    userId: string().required(),
});

function getPostHelper(req, res) {
    if (req.method === "POST") {
        console.log("POST request: " + JSON.stringify(req.body));
        req.body.userId = req.user_token.sub;
    } else if (req.method === "GET") {
        req.query.userId = req.user_token.sub;
    }
}

// GET and POST requests, add the user id to the request
app.use("/todos", (req, res, next) => {
    getPostHelper(req, res);
    next();
});

app.use("/category", (req, res, next) => {
    getPostHelper(req, res);
    next();
});

app.use("/todos/:id", async (req, res, next) => {
    const id = req.params.ID;
    const userId = req.user_token.sub;

    if (req.method === "PUT") {
        console.log("PUT request");
        req.body.userId = userId;
        req.body._id = id;
    }

    const conn = await Datastore.open();
    try {
        console.log("Changing todo: " + id);
        console.log("Request: " + JSON.stringify(req.body));
        const doc = await conn.getOne("todos", id);
        if (doc.userId != userId) {
            res.status(403).end();
            return;
        }
    } catch (e) {
        console.log(e);

        res.status(404).end(e);
        return;
    }

    next();
});

app.use("/category/:id", async (req, res, next) => {
    const id = req.params.ID;
    const userId = req.user_token.sub;

    const conn = await Datastore.open();
    try {
        const doc = await conn.getOne("category", id);
        if (doc.userId != userId) {
            res.status(403).end();
            return;
        }
    } catch (e) {
        console.log("404 Error: " + e);
        res.status(404).end(e);
        return;
    }

    next();
});

crudlify(app, { todos: todosSchema, category: categorySchema });

// bind to serverless runtime
export default app.init();
