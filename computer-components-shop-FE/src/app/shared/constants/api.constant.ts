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

    //User

    USER: {
        PROFILE: '/v1/api/admin/profile',
        EDIT_PROFILE: 'api/edit-profile'
    },
    BRAND: {
        CREATE: '/v1/api/admin/brand/create',
        UPDATE: '/v1/api/admin/brand/update',
        UPDATE_STATUS: '/v1/api/admin/brand/update-status',
        SEARCH: '/v1/api/admin/brand/find-all-and-search',
        DELETE: '/v1/api/admin/brand/delete/',
        DETAIL: '/v1/api/admin/brand/get-detail/',
    }
};
