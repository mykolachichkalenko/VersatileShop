import api from "@/Configs/Api.tsx";

export default  function changeMyDepartment(department: string, city: string) {
    api.post("/api/change-department", {department, city});
}
