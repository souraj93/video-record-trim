import api from './api.util';

// AUTH APIS
export const LOGIN_API = `${api}/user/auth/login`;
export const SOCIAL_LOGIN_API = `${api}/user/auth/social-login`;
export const SIGNUP_API = `${api}/user/auth/signup`;
export const SIGNUP_VERIFICATION_API = `${api}/user/auth/signup/verify`;
export const SIGNUP_VERIFICATION_RESEND_API = `${api}/user/auth/resend-email-otp`;
export const FORGOT_PASSWORD_API = `${api}/user/auth/forgot-password/request-otp`;
export const RESET_PASSWORD_API = `${api}/user/auth/forgot-password/verify-otp`;
export const LOGOUT_API = `${api}/account/user/auth/logout`;
export const CITY_API = `${api}/account/user/city`;
