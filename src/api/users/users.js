import { headers2 } from "../../libs/main";
import Fetcher from "../../libs/Petition"

export const login = async ({ data }) => {
    let fetch = { status: false };
    try {
        console.log("🚀 ~ createNews ~ data:", data)
        let response = await Fetcher({
            url: `/signon`,
            method: 'POST',
            data,
            headers: headers2
        });

        console.log(response?.status, response?.data)

        if (response.status === 201) fetch = { status: true, data: response?.data }
        if (response.status === 401) fetch = { message: response?.data?.message }
    } catch (error) {
        console.log("Error: " + error)
    } finally {
        return fetch;
    }
}



export const indexUsers = async ({ }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/users`
        })
        if (fetch.status == 200) {
            let data = fetch?.data?.data.map((item) => {
                return {
                    ...item,
                    //label: `${item?.first_name} ${item?.last_name}`,
                    label: item?.first_name,
                    value: `${item?.id}`,
                    disabled: item?.role == 'administrador'
                }
            })
            response = { data: data || [], status: true };
        }
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}

export const dailtCheck = async ({ id }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/daily_checks/verify/${id}`
        })
        // https://api-metrix.victum-re.online/intranet/daily_checks/verify/1
        // https://api-metrix.victum-re.online/intranet/intranet/daily_checks/verify/1
        console.log("🚀 ~ dailtCheck ~ fetch:", fetch)
        if (fetch.status == 200) {
            response = { data: fetch?.data, status: true };
        }
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}

export const get_daily_checks = async ({ params }) => {
    let response = { status: false }
    try {
        let params = {
            user_id: params?.user_id || null,
            page: params?.page || null,
            pageSize: params?.pageSize || null,
        }
        const fetch = await Fetcher({
            method: 'GET',
            url: `/daily_checks`,
            params
        })
        
        console.log("🚀 ~ dailtCheck ~ fetch:", fetch)
        if (fetch.status == 200) {
            response = { data: fetch?.data?.data, status: true };
        }
    } catch (error) {
        console.error("🚀 ~ indeDocuments ~ error:", error)
    } finally {
        return response;
    }
}


