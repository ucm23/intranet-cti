import { headers2 } from "../../libs/main"
import Fetcher from "../../libs/Petition"

export const indexNews = async ({ }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/news`
        })
        response = { data: fetch?.data?.data, status: true }
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}

export const indexIMGByID = async ({ id, picture = 'body', thumbnail = false }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/news/${id}?blob=false&picture=${picture}&thumbnail=${thumbnail}`
        })
        response = { data: fetch?.data?.signedUrl, status: true }
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}

export const createNews = async ({ data }) => {
    let fetch = { status: false };
    try {
        console.log("🚀 ~ createNews ~ data:", data)
        let response = await Fetcher({
            url: `/news`,
            method: 'POST',
            data,
            headers: headers2
        });
        console.log(response?.status, response?.data)
        if (response.status === 200) {
            fetch = { status: true, data: response?.data }
        }
    } catch (error) {
        console.log("Error: " + error)
    } finally {
        return fetch;
    }
}

