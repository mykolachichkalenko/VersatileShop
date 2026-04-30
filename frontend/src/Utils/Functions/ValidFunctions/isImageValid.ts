export default function isImageValid(file: File){
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

    if (!file.type.startsWith("image/")) return false;
    if (file.size > MAX_IMAGE_SIZE) return false;

    const ext = file.name.split(".").pop()?.toLowerCase();
    return !!ext && allowedExtensions.includes(ext);
}