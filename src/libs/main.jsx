import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';
import { FaFolder, FaFileImage, FaFilePowerpoint, FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";
import { AiOutlineFile } from "react-icons/ai";
import { FcFolder } from "react-icons/fc";
import color from '../color';

export const baseURL = "https://api-metrix.victum-re.online/intranet";

export const headers1 = {
    'Content-Type': 'application/pdf',
}

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

export const modules_ = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']  // Limpiar el formato
    ],
};

export const formats_ = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
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

/*const letras = '0123456789ABC';
export const colorRandom = () => {
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * letras.length)];
    }
    return color;
} */

const letras = '0123456789ABC';

export const colorRandom = () => `#${Array.from({ length: 6 }, () => letras[Math.floor(Math.random() * letras.length)]).join('')}`;

export const icons = {
    "image/png": <FaFileImage style={{ fontSize: 15 }} color="red" />,
    "image/jpeg": <FaFileImage style={{ fontSize: 15 }} color="red" />,
    "jpeg": <FaFileImage style={{ fontSize: 15 }} color="red" />,
    "image/jpg": <FaFileImage style={{ fontSize: 15 }} color="red" />,
    "image/svg+xml": <FaFileImage style={{ fontSize: 15 }} color="red" />,
    "application/pdf": <FaFilePdf style={{ fontSize: 15 }} color="red" />,
    "application/msword": <FaFileWord style={{ fontSize: 15 }} color={color.blueWord} />,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <FaFileWord style={{ fontSize: 15 }} color={color.blueWord} />,
    "application/vnd.ms-powerpoint": <FaFilePowerpoint style={{ fontSize: 15 }} color="orange" />,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": <FaFilePowerpoint style={{ fontSize: 15 }} color="orange" />,
    "application/vnd.ms-excel": <FaFileExcel style={{ fontSize: 15 }} color="green" />,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": <FaFileExcel style={{ fontSize: 15 }} color="green" />,
    "default": <AiOutlineFile style={{ fontSize: 15 }} color="gray" />,
    "folder_projs": <FcFolder style={{ fontSize: 15 }} color="gray" />,
    "folder_depts": <FaFolder style={{ fontSize: 15 }} color="gray" />
};

export const types = {
    "image/png": "Imagen",
    "image/jpeg": "Imagen",
    "jpeg": "Imagen",
    "image/jpg": "Imagen",
    "image/svg+xml": "Hojas de cálculo",
    "application/pdf": "Documento PDF",
    "application/msword": "Documento de texto",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Documento de texto",
    "application/vnd.ms-powerpoint": "Presentación de diapositivas",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "Presentación de diapositivas",
    "application/vnd.ms-excel": "Hojas de cálculo",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Hojas de cálculo",
    "default": "Archivo binario",
    "folder_project": "Proyecto",
    "folder_depts": "Departamento"
};
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