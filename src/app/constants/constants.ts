
export const BASIC_AUTH_URL = "http://localhost:3000/api/users"

export const sideNavUrlSlug = {
    feed: "/profile",
    addPost: "/profile/addPost",
    resumeEnhancer: "/profile/resumeEnhancer",
    jobs: "/profile/jobs",
    settings: "/profile/settings",
}

export const authUrlSlug = {
    login : "/login",
    register: "/signup",
    resetPassword: "/resetPassword",
    uploadProfileImage: "/uploadProfileImage",
    getProfileImage: "/getProfileImage",
    deleteProfileImage: "/deleteProfileImage"
}

export const settingsSideBaUrlSlug = {
    userProfile: `${sideNavUrlSlug.settings}`,
    accountSetting: `${sideNavUrlSlug.settings}/accountSettings`,
    chatSettings: `${sideNavUrlSlug.settings}/chatSettings`,
    notificationSettings: `${sideNavUrlSlug.settings}/notificationSettings`,
    appearanceSettings: `${sideNavUrlSlug.settings}/appearanceSettings`
}