export function changeLanguage(key : string){
    localStorage.setItem("lang", key);
    window.location.reload();
}