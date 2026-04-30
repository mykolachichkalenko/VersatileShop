importScripts('/SWutils/env.js');
importScripts('SWutils/setCookie.js');

function editProduct(editedProduct) {
    const fd = new FormData();

    fd.append("id", editedProduct.id);

    if (editedProduct.title) {
        fd.append("title", editedProduct.title);
    }
    if (editedProduct.description) {
        fd.append("description", editedProduct.description);
    }
    if (editedProduct.price) {
        fd.append("price", editedProduct.price);
    }
    if (editedProduct.condition) {
        fd.append("condition", editedProduct.condition);
    }
    if (editedProduct.photoFirst) {
        fd.append("firstFile", editedProduct.photoFirst);
    }
    if (editedProduct.photoSecond) {
        fd.append("secondFile", editedProduct.photoSecond);
    }
    if (editedProduct.photoThird) {
        fd.append("thirdFile", editedProduct.photoThird);
    }

    fetch(`${getEnv("/api/product/edit")}`,{
        method:"POST",
        body:fd,
        credentials:"include"
    }).then(res => res.text())
        .then(text => setCookie("status", text, 86400, "/", "Lax"));
}

self.editProduct = editProduct;