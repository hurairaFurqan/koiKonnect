
export const BASIC_AUTH_URL_USERS = "http://localhost:3000/api/users"
export const BASIC_AUTH_URL_POSTS = "http://localhost:3000/api/posts"


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
    // getProfileImage: "/getProfileImage", // Api route has been eliminated
    deleteProfileImage: "/deleteProfileImage",
    getMe: "/getMe",
    updateUserDetails: "/updateUserDetails",
}


export const currentUser = {
    uploadCoverPhoto : "/uploadCoverPhoto",
    getCurrentUser: "/getCurrentUser",
}


export const postSlug = {
    // saveImage : "/saveImage"
    newPost: "/newPost",
    getPost: "/getPost",
    postLikeStatus: "/postLikeStatus",
    postComment : "/postComment",
}

export const settingsSideBaUrlSlug = {
    userProfile: `${sideNavUrlSlug.settings}`,
    accountSetting: `${sideNavUrlSlug.settings}/accountSettings`,
    chatSettings: `${sideNavUrlSlug.settings}/chatSettings`,
    notificationSettings: `${sideNavUrlSlug.settings}/notificationSettings`,
    appearanceSettings: `${sideNavUrlSlug.settings}/appearanceSettings`
}