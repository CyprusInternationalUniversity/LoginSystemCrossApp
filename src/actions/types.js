// Foodish types
// whatever
export const GET_SESSION_ID = "get_session_id";
// session
export const SESSION_CHECK_START = "session_check_started";
export const SESSION_IS_VALID = "session_is_valid";
export const SESSION_EXPIRED = "session_expired";
export const SESSION_EXPIRED_RESET_STORE = "session_expired_reset_store";

/*
 * ##############################
 *  AUTH
 * ##############################
 */
// Registration
export const REGISTRATION_SUBMIT = "registration_submit";
export const REGISTRATION_SUCCESS = "registration_success";
export const REGISTRATION_FAIL = "registration_fail";
// login
export const LOGIN_USER_SUBMIT = "login_user_submit";
export const LOGIN_USER_SUCCESS = "login_user_success";
export const LOGIN_USER_FAIL = "login_user_fail";
/*
 * ##############################
 *  Customers
 * ##############################
 */
// Get Customers
// export const GET_CUSTOMERS = "get_customers";
// export const GET_CUSTOMERS_SUCCESS = "get_customers_success";
// export const GET_CUSTOMERS_FAIL = "get_customers_fail";

export const CHANGE_CUSTOMER_PASSWORD = "change_customer_password";
export const CHANGE_CUSTOMER_PASSWORD_SUCCESS = "change_customer_password_success";
export const CHANGE_CUSTOMER_PASSWORD_FAIL = "change_customer_password_fail";

export const GET_CUSTOMERS_ADDRESSES = "get_customers_addresses";
export const GET_CUSTOMERS_ADDRESSES_SUCCESS = "get_customers_addresses_success";
export const GET_CUSTOMERS_ADDRESSES_FAIL = "get_customers_addresses_fail";
export const POST_CUSTOMERS_ADDRESS = "post_customers_address";
export const POST_CUSTOMERS_ADDRESS_SUCCESS = "post_customers_address_success";
export const POST_CUSTOMERS_ADDRESS_FAIL = "post_customers_address_fail";

/*
 * ##############################
 *  Categories
 * ##############################
 */
// Get Categories
export const GET_CATEGORIES = "get_categories";
export const GET_CATEGORIES_SUCCESS = "get_categories_success";
export const GET_CATEGORIES_FAIL = "get_categories_fail";
// get Single category
export const GET_SINGLE_CATEGORY = "get_single_category";
export const GET_SINGLE_CATEGORY_SUCCESS = "get_single_category_success";
export const GET_SINGLE_CATEGORY_FAIL = "get_single_category_fail";
/*
 * ##############################
 *  Cities
 * ##############################
 */
// Get Cities
export const GET_CITIES = "get_cities";
export const GET_CITIES_SUCCESS = "get_cities_success";
export const GET_CITIES_FAIL = "get_cities_fail";
// Get Cities Regions
export const GET_CITIES_REGIONS = "get_city_regions";
export const GET_CITIES_REGIONS_SUCCESS = "get_city_regions_success";
export const GET_CITIES_REGIONS_FAIL = "get_city_regions_fail";
/*
 * ##############################
 *  Regions
 * ##############################
 */
// Get Regions
export const GET_REGIONS = "get_regions";
export const GET_REGIONS_SUCCESS = "get_regions_success";
export const GET_REGIONS_FAIL = "get_regions_fail";
// get Single Region
export const GET_SINGLE_REGIONS = "get_single_REGIONS";
export const GET_SINGLE_REGIONS_SUCCESS = "get_single_REGIONS_success";
export const GET_SINGLE_REGIONS_FAIL = "get_single_REGIONS_fail";

/*
 * ##############################
 *  Restaurant
 * ##############################
 */
// Get Categories
export const GET_RESTAURANTS_BY_CATEGORY = "get_restaurants_by_category";
export const GET_RESTAURANTS_BY_CATEGORY_SUCCESS = "get_restaurants_by_category_success";
export const GET_RESTAURANTS_BY_CATEGORY_FAIL = "get_restaurants_by_category_fail";
// get Single category
export const GET_SINGLE_RESTAURANT = "get_single_restarant";
export const GET_SINGLE_RESTAURANT_SUCCESS = "get_single_restarant_success";
export const GET_SINGLE_RESTAURANT_FAIL = "get_single_restarant_fail";

// init app

// language
export const APP_DEVICE_LANG_DETECT = "app_device_lang_detect";
export const APP_DEVICE_LANG_DETECT_SUCCESS = "app_device_lang_detect_success";
export const APP_DEVICE_LANG_DETECT_FAIL = "app_device_lang_detect_fail";
export const APP_DEVICE_LANG_DETECT_FINISHED = "app_device_lang_detect_finished";
export const APP_SET_LANGUAGE = "app_set_language";

// Step 1
export const APP_INIT_VALIDATOR_STARTED = "app_INIT_validator_started";
export const APP_INIT_VALIDATOR_FINISHED = "app_INIT_validator_finished";
export const APP_IS_NOT_RUNNING_FIRST_TIME = "app_is_not_running_first_time";
export const APP_IS_RUNNING_FIRST_TIME = "app_is_running_first_time";
// setting app first time
export const SET_APP_FIRST_TIME_START = "set_app_first_time_started";
export const SET_APP_FIRST_TIME_SUCCESS = "set_app_first_time_success";
export const SET_APP_FIRST_TIME_FAIL = "set_app_first_time_fail";
export const SET_APP_FIRST_TIME_FINISHED = "set_app_first_time_finished";

// not using skip anymore
export const APP_CHECKING_INTRO_SKIP_TRUE = "app_check_intro_skip_true";
export const APP_CHECKING_INTRO_SKIP_FALSE = "app_check_intro_skip_false";
// Step 2
export const APP_SESSION_VALIDATOR_STARTED = "APP_SESSION_VALIDATOR_STARTED";
export const APP_SESSION_VALIDATOR_FINISHED = "APP_SESSION_VALIDATOR_FINISHED";
export const APP_SESSION_VALIDATOR_FINISHED_WITH_ERROR = "APP_SESSION_VALIDATOR_finished_WITH_ERROR";
export const APP_SESSION_VALIDATOR_LOADER_RESET = "APP_SESSION_VALIDATOR_loader_reset";

export const APP_SESSION_VALIDATOR_SUCCESS = "app_session_validator_success";
export const APP_SESSION_VALIDATOR_FAILED = "app_session_validator_failed";

export const APP_DOES_NOT_HAS_LOGIN_CREDENTIALS = "app_does_not_has_login_credentials";
export const APP_HAS_LOGIN_CREDENTIALS = "app_has_login_credentials";
export const APP_LOADING = "app_loading";
export const REFRESHING_SESSION_ID = "REFRESHING_SESSION_ID";
export const REFRESHING_SESSION_ID_STARTED = "refreshing_session_id_started";
export const REFRESHING_SESSION_ID_SUCCESS = "refreshing_session_id_success";
export const REFRESHING_SESSION_ID_FAILED = "refreshing_session_id_failed";
export const REFRESHING_SESSION_ID_COMPLETED = "refreshing_session_id_completed";

// export const APP_
// introLoading: true,
// skipStatus: false,
// hasToken: false,
// loginLoading: false,
// refreshingSessionStatus: false

// export const REFRESHING_SESSION_ID = "refreshing_session_id";
// export const REFRESHING_SESSION_ID_COMPLETED =
// 	"refreshing_session_id_completed";
export const GET_SESSION_ID_BY_KEYCHAIN = "get_session_id_by_keychain";
// Session Check
export const REMOTE_VERIFY_SESSION_START = "remote_verify_session_start";
export const REMOTE_VERIFY_SESSION_STRING_DOES_NOT_EXISTS = "remote_verify_session_string_does_not_exists";
export const REMOTE_VERIFY_SESSION_STRING_EXISTS = "remote_verify_session_string_exists";
export const REMOTE_VERIFY_SESSION_SUCCESS = "remote_verify_session_success";
export const REMOTE_VERIFY_SESSION_FAIL = "remote_verify_session_fail";
export const REMOTE_VERIFY_SESSION_FINISHED = "remote_verify_session_finished";

// userAction
export const PROFILE = "profile_started";
export const PROFILE_SUCCESS = "profile_success";
export const PROFILE_SUCCESS_AUTO_SELECT = "profile_success_auto_select";
export const PROFILE_FAIL = "profile_fail";
export const PROFILE_SELECTED = "profile_selected";
export const PROFILE_FINISHED = "profile_finished";

// update push notification token
export const UPDATE_PUSH_NOTIFICATION_TOKEN = "update_push_notification_token_start";
export const UPDATE_PUSH_NOTIFICATION_TOKEN_SUCCESS = "update_push_notification_token_success";
export const UPDATE_PUSH_NOTIFICATION_TOKEN_FAIL = "update_push_notification_token_fail";
export const UPDATE_PUSH_NOTIFICATION_TOKEN_FINISHED = "update_push_notification_token_finished";
// set and get push notification remote permission
export const SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION = "set_push_notification_token_remote_permission_start";
export const SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS = "set_push_notification_token_remote_permission_success";
export const SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL = "set_push_notification_token_remote_permission_fail";
export const SET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED = "set_push_notification_token_remote_permission_finished";
export const GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION = "get_push_notification_token_remote_permission_start";
export const GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_SUCCESS = "get_push_notification_token_remote_permission_success";
export const GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FAIL = "get_push_notification_token_remote_permission_fail";
export const GET_PUSH_NOTIFICATION_TOKEN_REMOTE_PERMISSION_FINISHED = "get_push_notification_token_remote_permission_finished";

// logout
export const LOGOUT_CLEARSTORE = "LOGOUT_CLEARSTORE";
