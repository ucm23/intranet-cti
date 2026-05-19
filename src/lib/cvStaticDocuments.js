import cvsData from '../assets/cvs.json';

/** PDFs disponibles en public/CVs */
const PUBLIC_CV_FILES = [
    'CV_AGVM.pdf', 'CV_LRA.pdf', 'CV_NBV.pdf', 'CV_RCM.pdf', 'CV_UCM.pdf',
    'CV_CF_SAINZ.pdf', 'CV_PT.pdf', 'CV_JGA.pdf', 'CV_LMS.pdf', 'CV_VRM.pdf',
    'CV_GLA.pdf', 'CV_HA.pdf', 'CV_JLR.pdf', 'CV_GSG.pdf', 'CV_FJM.pdf',
    'CV_ESG.pdf', 'CV_LMA.pdf', 'CV_LMB.pdf', 'CV_MJCC.pdf', 'CV_ML.pdf',
    'CV_JCZ.pdf', 'CV_NB.pdf', 'CV_AHSLEY.pdf', 'CV_SCM.pdf', 'CV_HJRT.pdf',
    'CV_JMBV.pdf', 'CV_JLOC.pdf',
    'CV_CAH.pdf', 'CV_ORT.pdf',
];

const publicCvByLower = new Map(
    PUBLIC_CV_FILES.map((name) => [name.toLowerCase(), name])
);

/** Área del organigrama → palabras clave del nombre del departamento en el gestor */
const DEPARTMENT_ALIASES = {
    ciberseguridad: ['ciberseguridad', 'infraestructura'],
    mesa: ['mesa de ayuda', 'mesa', 'experiencia', 'cx'],
    desarrollo: ['desarrollo', 'cto', 'tecnolog'],
    its: ['its', 'telepeaje', 'peaje', 'área its', 'area its', 'operaciones'],
    rh: ['recursos humanos', 'rh', 'humanos'],
    administracion: ['administración', 'administracion', 'finanzas', 'contabilidad', 'cobranza', 'licitaciones'],
    sap: ['sap'],
    ia: ['ia', 'data', 'victum'],
    comercial: ['comercial'],
    pmo: ['pmo', 'calidad', 'supervisión', 'supervision', 'control y supervisión'],
    juridico: ['jurídica', 'juridica', 'jurídico', 'juridico'],
};

/** id de persona (cvs.json) → categoría de departamento */
const CV_PERSON_DEPARTMENT = {
    1: 'administracion',
    2: 'administracion',
    3: 'juridico',
    4: 'rh',
    5: 'pmo',
    6: 'administracion',
    7: 'administracion',
    8: 'sap',
    9: 'sap',
    10: 'desarrollo',
    12: 'desarrollo',
    13: 'desarrollo',
    15: 'ia',
    16: 'ia',
    17: 'ciberseguridad',
    18: 'its',
    19: 'its',
    20: 'its',
    21: 'desarrollo',
    22: 'desarrollo',
    23: 'mesa',
    24: 'mesa',
    25: 'mesa',
    26: 'administracion',
    27: 'comercial',
    28: 'comercial',
    29: 'mesa',
    30: 'its',
    31: 'pmo',
    32: 'pmo',
};

const URL_FILE_ALIASES = {
    'cv_ashley.pdf': 'CV_AHSLEY.pdf',
    'cv_jlo.pdf': 'CV_JLOC.pdf',
    'cv_ptlaxcoapan.pdf': 'CV_PT.pdf',
};

export const isCurriculosCtiProject = (project) =>
    /curricul/i.test(project?.name || '');

/** Carpeta PMO solo en CURRICULOS CTI (no requiere API) */
export const STATIC_PMO_DEPARTMENT_ID = 'static-dept-pmo';

const STATIC_ITEM_TIMESTAMP = '2025-04-22T15:07:00.000Z';

export const STATIC_PMO_DEPARTMENT = {
    id: STATIC_PMO_DEPARTMENT_ID,
    name: 'PMO',
    color: '#2E7D32',
    isStaticDepartment: true,
    staticCategory: 'pmo',
    created_at: STATIC_ITEM_TIMESTAMP,
    updated_at: STATIC_ITEM_TIMESTAMP,
};

const normalizeText = (value) =>
    (value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{M}/gu, '')
        .trim();

export const resolveCvFileName = (url) => {
    if (!url) return null;
    let base = String(url).replace(/^\//, '').trim();
    if (!base.toLowerCase().endsWith('.pdf')) base = `${base}.pdf`;
    const lower = base.toLowerCase();
    if (publicCvByLower.has(lower)) return publicCvByLower.get(lower);
    if (URL_FILE_ALIASES[lower]) return URL_FILE_ALIASES[lower];
    return null;
};

export const departmentMatchesCategory = (departmentName, category) => {
    const normalized = normalizeText(departmentName);
    const aliases = DEPARTMENT_ALIASES[category] || [];
    return aliases.some((alias) => normalized.includes(normalizeText(alias)));
};

const findDepartmentId = (departments, category) => {
    const dept = departments.find((d) => departmentMatchesCategory(d.name, category));
    return dept?.id ?? null;
};

export const buildStaticCvDocument = (person, departmentId = null) => {
    const fileName = resolveCvFileName(person.url);
    if (!fileName) return null;

    const staticUrl = `/CVs/${fileName}`;
    const displayName = `CV ${person.name}.pdf`;

    return {
        id: `cv-static-${person.id}`,
        isStaticCv: true,
        staticUrl,
        file_name: displayName,
        name: displayName,
        type: 'application/pdf',
        users_ids: [],
        project_id: null,
        department_id: departmentId,
        created_at: STATIC_ITEM_TIMESTAMP,
        updated_at: STATIC_ITEM_TIMESTAMP,
        personId: person.id,
        post: person.post,
    };
};

export const getAllStaticCvDocuments = (departments = []) =>
    cvsData
        .map((person) => {
            const category = CV_PERSON_DEPARTMENT[person.id];
            const departmentId = category ? findDepartmentId(departments, category) : null;
            return buildStaticCvDocument(person, departmentId);
        })
        .filter(Boolean);

const getCategoryForDepartment = (department) => {
    if (department?.isStaticDepartment && department.staticCategory) {
        return department.staticCategory;
    }
    const match = Object.keys(DEPARTMENT_ALIASES).find((category) =>
        departmentMatchesCategory(department.name, category)
    );
    return match || null;
};

export const getStaticCvDocumentsForDepartment = (departments, department) => {
    if (!department) return [];
    const category = getCategoryForDepartment(department);
    if (!category) return [];

    return cvsData
        .filter((person) => CV_PERSON_DEPARTMENT[person.id] === category)
        .map((person) => buildStaticCvDocument(person, department.id))
        .filter(Boolean);
};

export const countStaticCvDocumentsForDepartment = (departments, department) =>
    getStaticCvDocumentsForDepartment(departments, department).length;

/** PMO virtual si el proyecto no tiene ya un departamento PMO en API */
export const getVirtualCurriculosDepartments = (departments, selectedProject) => {
    const linked = departments.filter((d) => selectedProject?.departments_ids?.includes(d.id));
    const hasPmo = linked.some((d) => departmentMatchesCategory(d.name, 'pmo'));
    return hasPmo ? [] : [STATIC_PMO_DEPARTMENT];
};

export const getCurriculosDepartmentFolders = (departments, selectedProject) => {
    const linked = departments.filter((d) => selectedProject?.departments_ids?.includes(d.id));
    return [...getVirtualCurriculosDepartments(departments, selectedProject), ...linked];
};
