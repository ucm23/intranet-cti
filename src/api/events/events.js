import Fetcher from "../../libs/Petition";

export const indexEvents = async ({ }) => {
    let response = { status: false }
    try {
        const fetch = await Fetcher({
            method: 'GET',
            url: `/events`
        })
        if (fetch.status == 200) {
            let data = fetch?.data?.data.map((event) => {
                let date = new Date(event.start_date);
                let date_ = new Date(event.end_date);
                return {
                    ...event,
                    start: new Date(date.getTime() - date.getTimezoneOffset() * 60000),
                    end: new Date(date_.getTime() - date_.getTimezoneOffset() * 60000), //new Date(event?.end_date),
                }
            })
            response = { data: data, status: true }
        }
    } catch (error) {
        console.error("TCL: indexEvents -> error", error)
    } finally {
        return response;
    }
}

export const createEvents = async ({ event }) => {
    let response = { status: false };
    try {
        const fetch = await Fetcher({
            method: 'POST',
            url: `/events`,
            data: JSON.stringify(event)
        });
        if (fetch.status === 201) {
            response = { data: fetch?.data, status: true };
        }
    } catch (error) {
        console.log("🚀 ~ createEvents ~ error:", error)
    } finally {
        return response;
    }
};

