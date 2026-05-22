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

export const updateProjects = async ({ id, data }) => {
    let response = { status: false }
    try {
        
        const fetch = await Fetcher({
            method: 'PUT',
            url: `/projects/${id}`,
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

export const indexActivities = async ({ id }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/activities?project_id=${id}&orderBy=id%3Aasc`
        })
        if (fetch.status == 200) {
            response = { data: fetch?.data?.data, status: true }
        }
    } catch (error) {
        console.error("TCL: indexActivities -> error", error)
    } finally {
        return response;
    }
}

export const delProject = async ({ id }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'DELETE',
            url: `/projects/${id}`
        })

        console.log("🚀 ~ indexProject ~ fetch?.status:", fetch?.status)
        if (fetch?.status == 200) {
            response = { status: true }
        }
    } catch (error) {
        console.error("🚀 ~ indeProject ~ error:", error)
    } finally {
        return response;
    }
}