importScripts('/SWutils/createProduct.js');
importScripts('/SWutils/editProduct.js');

self.addEventListener('install', (event) => {
    console.log('[SW] installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] activated');
    event.waitUntil(self.clients.claim());
});


self.addEventListener('message', (event) => {
    const data = event.data;

    const {type, payload} = data;

    if (type === "CREATE_PRODUCT") {
        createProduct(payload);
    }else if(type ==="EDIT_PRODUCT"){
        editProduct(payload);
    }
});