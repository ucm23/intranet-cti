import { headers, headers1, headers2 } from "../../libs/main";
import Fetcher from "../../libs/Petition";

export const indexDocuments = async ({ }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/documents`
        })

        console.log("🚀 ~ indexDocuments ~ fetch?.status:", fetch?.status)
        if (fetch?.status == 200 || fetch?.status == 201) {
            response = { data: fetch?.data?.data, status: true }
        }
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}

export const deleteDocuments = async ({ id }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'DELETE',
            url: `/documents/${id}`
        })

        console.log("🚀 ~ indexDocuments ~ fetch?.status:", fetch?.status)
        if (fetch?.status == 200) {
            response = { status: true }
        }
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}

export const indexDocumentsByID = async ({ id, blob }) => {
    let response = { status: false }
    try {
        let url = `/documents/${id}`
        if (blob) url += '?blob=true';
        const fetch = await Fetcher({
            method: 'GET',
            url,
            headers: headers1,
            responseType: blob && 'blob',
        })
        console.log("🚀 ~ indexDocumentsByID ~ fetch:", fetch)
        if (blob) response = fetch?.data;
        else response = { data: fetch?.data?.signedUrl, status: true }
        console.log("🚀 ~ indexDocumentsByID ~ response:", response)
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}


export const createDocs = async ({ data }) => {
    let fetch = { status: false };
    try {
        console.log("🚀 ~ createDocs ~ data:", data)
        let response = await Fetcher({
            url: `/documents`,
            method: 'POST',
            data,
            headers: headers2
        });
        //console.log(response?.status, response?.data)
        //if (response.status === 200 || response.status === 201) {
        fetch = { status: response?.status }
        //}

    } catch (error) {
        console.error("🚀 ~ createDocs ~ error:", error)
    } finally {
        return fetch;
    }
}

export const updateDoc = async ({ id, data }) => {
    let fetch = { status: false };
    try {
        console.log("🚀 ~ updateDocs ~ data:", data)
        let response = await Fetcher({
            url: `/documents/${id}`,
            method: 'PUT',
            data,
            headers: headers2
        });
        console.log(response?.status, response?.data)
        if (response.status === 200 || response.status === 201) {
            fetch = { status: response?.status, data: response?.data }
        }
    } catch (error) {
        console.error("🚀 ~ createDocs ~ error:", error)
    } finally {
        return fetch;
    }
}

export const indexDocsImgs = async ({ id }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/documents/${id}?blob=false`
        })
        response = { data: fetch?.data?.signedUrl, status: true }
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}