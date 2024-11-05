import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';

export const baseURL = "https://api-metrix.victum-re.online/intranet";

export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8; multipart/form-data"
};

export const headers2 = {
    "Accept": "application/json",
    "Content-Type": "multipart/form-data"
};

export const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        ['link', 'video'],
    ]
};

export const formats = [
    'bold', 'italic', 'underline', 'blockquote',
    'link', 'video'
];

export const locales = {
    es: es
};

export const formatDate = (date) => date.toISOString().split('T')[0];

export const localizer = dateFnsLocalizer({
    format: (date, formatString) => format(date, formatString, { locale: es }),
    parse: (dateString, formatString) => parse(dateString, formatString, new Date(), { locale: es }),
    startOfWeek: () => startOfWeek(new Date(), { locale: es }),
    getDay: (date) => getDay(date),
    locales,
});

//export type NotificationType = 'info' | 'warning' | 'error' | 'success';

const titleError = 'Error'
const messageError = 'Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo.'
const messageWarning = 'Advertencia'
const success = 'éxitoso'

export const messagesNotification = {
    success: {
        message: `Registro ${success}`,
    },
    error: {
        message: titleError,
        description: messageError,
    },
    warning: {
        message: messageWarning
    },
    info: {
        message: "Recuerda revisar todos los campos antes de continuar"
    }
}

export const messagesNotificationLogin = {
    success: {
        message: `Inicio ${success}`,
    },
    error: {
        message: titleError,
        description: messageError
    },
    warning: {
        message: messageWarning
    }
}

export const openNotificationWithIcon = (api, type, description) => {
    api[type]({
        message: messagesNotification[type].message,
        description: description || messagesNotification[type].description,
    });
};

export const openNotificationForLogin = (api, type, description) => {
    api[type]({
        message: messagesNotificationLogin[type].message,
        description: description || messagesNotificationLogin[type].description,
    });
};