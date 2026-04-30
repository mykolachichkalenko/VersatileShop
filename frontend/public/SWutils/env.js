function getEnv(url){
    return `http://localhost:8080${url}`;
}

self.getEnv = getEnv;