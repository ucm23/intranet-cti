import Fetcher from "../../libs/Petition";

export const indexProjects = async ({ }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/projects`
        })
        if (fetch.status == 200) {
            response = { data: fetch?.data?.data, status: true }
        }
    } catch (error) {
        console.error("TCL: indexProjects -> error", error)
    } finally {
        return response;
    }
}

export const createProjects = async ({ data }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'POST',
            url: `/projects`,
            data: JSON.stringify(data)
        })
        if (fetch.status == 200 || fetch.status == 201) {
            response = { data: fetch?.data, status: true }
        }
    } catch (error) {
        console.error("TCL: indexProjects -> error", error)
    } finally {
        return response;
    }
}