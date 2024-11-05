import Fetcher from "../../libs/Petition";

export const indexDepartments = async ({ }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/departments`
        })
        if (fetch.status == 200) {
            response = { data: fetch?.data?.data, status: true }
        }
    } catch (error) {
        console.error("TCL: indexDepartments -> error", error)
    } finally {
        return response;
    }
}

export const createDepartments = async ({ data }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'POST',
            url: `/departments`,
            data: JSON.stringify(data)
        })
        if (fetch.status == 200 || fetch.status == 201) {
            response = { data: fetch?.data, status: true }
        }
    } catch (error) {
        console.error("🚀 ~ createDepartments ~ error:", error)
    } finally {
        return response;
    }
}