export const API_ROUTER = {
    BASE: {
        UPLOAD_ADD: 'base/attachment/add',
        GET_CONTRACT_LIST: 'base/contracts',
        CONTRACT_DETAIL: 'base/contract/detail',
        CONTRACT_INIT: 'base/contract-initial',
        UNIT_ADD: 'base/unit/add',
        GET_UNIT_LIST: 'base/units',
        GET_UNIT_DETAIL: 'base/unit/detail/',
        UNIT_UPDATE: 'base/unit/update/',
        UNIT_DELETE: 'base/unit/delete/',
        GET_PACKAGE_LIST: 'base/packages',
        GET_PACKAGE_DETAIL: 'base/package/detail/',
        PACKAGE_ADD: 'base/package/add',
        PACKAGE_UPDATE: 'base/package/update/',
        PACKAGE_DELETE: 'base/package/delete/',
        GET_CODE_TYPE_LIST: 'base/code-types',
        GET_CODE_TYPE_DETAIL: 'base/code-type/detail/',
        GET_DYNAMIC_CATEOGRIES: 'base/dynamic-categories',
        GET_DYNAMIC_CATEOGRIES_FIELD: 'base/dynamic-categories-field/',
        GET_DYNAMIC_CATEOGRIES_DATA: 'base/dynamic-categories-data/category/',
        DYNAMIC_CATEGORY_DATA_ADD: 'base/dynamic-category-data/add',
        DYNAMIC_CATEGORY_DATA_UPDATE:'base/dynamic-category-datau/pdate/',

        DYNAMIC_CATEGORY_DATA_DELETE:'base/dynamic-categories-data/delete/',
        ADD_CODE_TYPE: 'base/code-type/add',
        UPDATE_CODE_TYPE: 'base/code-type/update/',
        DELETE_CODE_TYPE: 'base/code-type/delete/',

        GET_SETTING: 'base/settings',
        ADD_SETTING: 'base/setting/add',
        UPDATE_SETTING: 'base/setting/update',

        GET_DYNAMIC_CATEGORIES: 'base/dynamic-categories',
        GET_DYNAMIC_CATEGORIES_LIST: 'base/dynamic-categories',
        GET_DYNAMIC_CATEGORIES_DETAIL: 'base/dynamic-category/detail/',
        DYNAMIC_CATEGORIES_UPDATE: 'base/dynamic-category/update/',
        DYNAMIC_CATEGORIES_DELETE: 'base/dynamic-category/delete/',
        DYNAMIC_CATEGORIES_ADD: 'base/dynamic-category/add',
        GET_DYNAMIC_CATEGORIES_FIELD: 'base/dynamic-categories-field/detail/',
        DYNAMIC_CATEGORIES_FIELD_DELETE:
            'base/dynamic-categories-field/delete/',
        GET_DYNAMIC_CATEGORIES_DATA: 'base/dynamic-categories-data/category/',
        GET_DYNAMIC_CATEGORIES_BATCH_DATA: 'base/dynamic-categories-data/detail/',
        DYNAMIC_CATEGORIES_DATA_DELETE:'base/dynamic-categories-data/delete/',
        DYNAMIC_CATEGORIES_DATA_UPDATE: 'base/dynamic-category-data/update',
        DYNAMIC_CATEGORIES_DATA_ADD: 'base/dynamic-categories-data/category/add/',
        // GET_DYNAMIC_CATEGORIES_FIELD: 'base/dynamic-categories-field/',

        //GET_DYNAMIC_CATEGORIES_BATCH_DATA:'base/dynamic-categories-data/detail/',
        //DYNAMIC_CATEGORIES_DATA_DELETE: 'base/dynamic-categories-data/delete/',
        // GET_DYNAMIC_CATEGORIES_FIELD: 'base/dynamic-categories-field/',

        //DYNAMIC_CATEGORIES_DATA_ADD:'base/dynamic-categories-data/category/add/',
    },
    CONTRACT:
    {
        INITAL_ADD: 'base/contract-initial',
    },
    ACCOUNT: {
        GET_GROUP_LIST: 'account/auth/groups',
        GROUP_ADD: 'account/auth/group/add',
        GROUP_UPDATE: 'account/auth/group/update/',
        GROUP_DETAIL: 'account/auth/group/detail/',
        DELETE_GROUP: 'account/auth/group/delete/',
        GET_PERMISSION_LIST: 'account/auth/permissions',
        LOGIN: '/auth/login',
        GET_USER_LIST: 'account/users',
        GET_USER_DETAIL: 'account/user/detail/',
        USER_ADD: 'account/user/add/',
        USER_UPDATE: 'account/user/update/',
        USER_DELETE: 'account/user/delete/',
        USER_ACTIVE: 'account/user/active/',
        USER_DEACTIVE: 'account/user/deactive/',
        HISTORY_USER: 'account/users/history',
        GET_USER_INFO: 'account/user/info',
        GET_GROUP_PERMISSION_LIST: 'account/auth/group-permissions',
        LOGIN_SSO: 'account/auth/login-sso',

        USER_MENU: 'account/auth/user-menu',
        REFRESH_TOKEN:'auth/refresh-token'
    },
    REGISTER:{
        REGISTER_FORM: 'auth/register',
        SEND_OTP:'auth/otp',
        VERIFY:'auth/verify'

    },
    PASSWORD:{
        OTP_FORGOT_PASSWORD:'auth/otp-forgot-password',
        FORGOT_PASSWORD:'auth/forgot-password',
        CHANGE_PASSWORD:'auth/change-password',
    },
    ENTERPIRSE: {},
    BUSINESS: {
        GET_CUSTOMER_LIST: 'enterprise/customers',
        GET_CUSTOMER_DETAIL: 'enterprise/customer/detail/',
        CUSTOMER_ADD: 'enterprise/customer/add',
        CUSTOMER_UPDATE: 'enterprise/customer/update/',
        CUSTOMER_DELETE: 'enterprise/customer/delete/',
        GET_CUSTOMER_INFO: 'enterprise/customer/info',
        DASHBOARD_COUNT: 'enterprise/customer/report-counter',
    },

    PRODUCTION: {
        GET_PRODUCT_LIST: 'production/products',
        GET_PRODUCT_DETAIL: 'production/product/detail/',
        PRODUCT_ADD: 'production/product/add',
        PRODUCT_UPDATE: 'production/product/update/',
        PRODUCT_DELETE: 'production/product/delete/',
        PRODUCT_CODE_VALIDATE: 'production/product/product-code-validate/',
        GET_PRODUCT_CATEGORIES: 'production/categories',
        GET_PRODUCT_CATEGORIES_DETAIL: 'production/category/detail/',
        GET_PRODUCT_SYNC: 'production/product/sync',
        UPLOAD: 'production/product/update/',
    },
    QRCODE: {
        GET_SERIAL_RANGE: 'qrcode/code/code-serial-range-generate',
        CODE_SCAN: 'qrcode/code/scan/',
        GET_LIST_CODE_TYPES: 'base/code-types',
        CODE_VALIDATE: 'qrcode/code/series-code-validate',
        CODE_GENERATE: 'qrcode/code/generate',
        CODE_DETAIL: 'qrcode/code/detail/',
        GET_CODE_LIST: 'qrcode/codes',
        CODE_UPDATE: 'qrcode/code/update/',
        CODE_APPROVE: 'qrcode/code/approve/',
        CODE_DELETE: 'qrcode/code/delete/',
        CODE_EXCEL: 'qrcode/code/export/excel/',
        CODE_REPORT: 'qrcode/code/report/list-codes',
        GET_CODE_ACTIVATEDS: 'qrcode/code/activateds',
        CODE_ACTIVATEDS_UPDATE: 'qrcode/code/activate/update/',
        // CODE_ACTIVATEDS_DELETE: 'qrcode/code/activate/delete/',
        CODE_ACTIVATEDS_DELETE: 'qrcode/code/delete-activate/',
        GET_CODE_ACTIVATEDS_DETAIL: 'qrcode/code/activate/detail',

        CODE_ACTIVATEDS_APPROVE: 'qrcode/code/activate/approve/',
        //CODE_ACTIVATEDS_APPROVE: 'qrcode/code/activate/delete-activate/',

        GET_LIST_CODE_ACTIVATE: 'qrcode/activate-codes',
        SPLIT_CODE: 'qrcode/code/split',
        REPORT_PRODUCT_BATCH: 'qrcode/code/product-batch/report/list'
    },
    // Process

    PROCESS: {
        GET_PROCESS_LIST: 'procedure/procedures',
        ADD_PROCESS: 'procedure/procedure/add',
        GET_PROCESS_DETAIL: 'procedure/procedure/detail/',
        UPDATE_PROCESS: 'procedure/procedure/update/',
        DELETE_PROCESS: 'procedure/procedure/delete/',
        WORK_HISTORY: 'procedure/work-form/work-data-history',
        WORK_HISTORY_STATUS: 'procedure/work-form/data/update/',
        WORK_HISTORY_DELETE: 'procedure/work-form/data/delete/',
        WORK_UPDATE_FORM:  'procedure/work-form/update/'
    },

    // Step

    STEP: {
        GET_STEP_LIST: 'procedure/steps',
        ADD_STEP: 'procedure/step/add',
        GET_STEP_DETAIL: 'procedure/step/detail/',
        UPDATE_STEP: 'procedure/step/update/',
        DELETE_STEP: 'procedure/step/delete/',
    },

    // Work

    WORK: {
        GET_WORK_LIST: 'procedure/works',
        ADD_WORK: 'procedure/work/add',
        GET_WORK_DETAIL: 'procedure/work/detail/',
        UPDATE_WORK: 'procedure/work/update/',
        DELETE_WORK: 'procedure/work/delete/',
        ADD_FORM: 'procedure/work-form/add',
        UPDATE_FORM: 'procedure/work-form/update',
    },

    // Form

    FORM: {
        GET_DETAIL_FORM: 'procedure/work-form/detail/',
        ADD_DATA_FORM: 'procedure/work-form/data/add',
        GET_DATA_FORM_BY_WORK_ID: 'procedure/work-form/work-data/',
    },

    TASK: {
        GET_TASK_LIST: 'procedure/tasks',
        ADD_TASK: 'procedure/task/add',
        GET_TASK_DETAIL: 'procedure/task/detail/',
        UPDATE_TASK: 'procedure/task/update/',
        DELETE_TASK: 'procedure/task/delete/',
        GET_CROPS_LIST: 'procedure/crops',
        ADD_CROPS: 'procedure/crop/add',
        GET_DETAIL_CROP: 'procedure/crop/detail/',
        UPDATE_CROPS: 'procedure/crop/update/',
        DELETE_CROPS: 'procedure/crop/delete/',


    },
    // Crops

    LOCATION: {
        PROVINCES: 'base/provinces',
        DISTRICTS_BY_PID: 'base/districts',
        WARDS_BY_DID:'base/wards'
    },

    //User

    USER: {
        PROFILE: '/v1/api/admin/profile',
        EDIT_PROFILE: 'api/edit-profile'
    },
    DROP_DOWN_OPTION: {
        PLAN: '/v1/api/admin/drop-down/plant',
        MATERIAL: '/v1/api/admin/drop-down/material',
        MATERIAL_GROUP: '/v1/api/admin/drop-down/material-group',
        CONTRACT: '/v1/api/admin/drop-down/contract-template',
        QUOTE:'/v1/api/admin/drop-down/quote-template'
    },
    PR_EBAN_CONTROLLER: {
        SEARCH: '/v1/api/admin/pr_eban/search-pr-eban',
        DETAIL: '/v1/api/admin/pr_eban/get-detail',
        LIST_VENDOR: '/v1/api/admin/vendor/get-vendor',
        SEND_MAIL_VENDOR_CONTRACT: '/v1/api/mail/send-vendor-contracts',
        SEND_MAIL_VENDOR_PR:'/v1/api/mail/send-vendor-pr',
        GET_QUOTES: '/v1/api/admin/vendor/get-quotes',
        COUNT: '/v1/api/admin/pr_eban/count'

    },
    CONTRACT_ADDENDUM_TEMPLATE: {
        FIND_ALL_AND_SEARCH: '/v1/api/admin/contract-template/find-all-and-search',
        CREATE: '/v1/api/admin/contract-template/create'
    },
    QUOTE_TEMPLATE: {
        FIND_ALL_AND_SEARCH: '/v1/api/admin/quote-template/find-all-and-search',
        CREATE: '/v1/api/admin/quote-template/create'
    },
    CHAT:{
        GET_LIST_CHAT: '/v1/api/chat/get-list-chat',
        GET_DETAIL_CHAT:'/v1/api/chat/get-detail-chat'
    }
};
