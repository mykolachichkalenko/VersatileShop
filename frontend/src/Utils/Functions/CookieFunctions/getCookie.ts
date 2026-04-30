export default function getCookie(name: string){
    const target = name + "=";
    const parts = document.cookie.split(";");

    for (let p of parts) {
        p = p.trim();
        if (p.startsWith(target)) {
            return decodeURIComponent(p.slice(target.length));
        }
    }
    return null;
}