importScripts('/SWutils/env.js');
importScripts('SWutils/setCookie.js');

function createProduct(product) {
    const fd = new FormData();

    fd.append("title", product.title);
    fd.append("description", product.description);
    fd.append("price", String(product.price).trim());
    fd.append("condition", product.condition);
    fd.append("firstPhoto", product.photoFirst);

    if (product.photoSecond) {
        fd.append("secondPhoto", product.photoSecond);
    }
    if (product.photoThird) {
        fd.append("thirdPhoto", product.photoThird);
    }

    fetch(`${getEnv("/api/product/create")}`, {
        method: "POST",
        body: fd,
        credentials: "include"
    }).then(res => res.text())
        .then(text => setCookie("status", text, 86400, "/", "Lax"));
}

self.createProduct = createProduct;

