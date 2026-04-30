function setCookie(name, value, maxAgeSec = 86400, path = "/", sameSite = "Lax") {
    self.clients.matchAll({ type: "window", includeUncontrolled: true })
        .then((clients) => {
            clients.forEach((client) => {
                client.postMessage({
                    type: "SET_COOKIE",
                    name,
                    value,
                    maxAgeSec,
                    path,
                    sameSite,
                });
            });
        });
}

self.setCookie = setCookie;
