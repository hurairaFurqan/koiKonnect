
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
    followUser: "/followUser",
    getFollowStatus: "/getFollowStatus",
    getFollowers: "/getFollowers",
    getFollowing: "/getFollowing"
}


export const searchSlugs= {
    searchUser : "/searchUser",
}


export const postSlug = {
    // saveImage : "/saveImage"
    newPost: "/newPost",
    getPost: "/getPost",
    postLikeStatus: "/postLikeStatus",
    postComment : "/postComment",
    getAllPosts: "/getAllPosts",
}

export const settingsSideBaUrlSlug = {
    userProfile: `${sideNavUrlSlug.settings}`,
    accountSetting: `${sideNavUrlSlug.settings}/accountSettings`,
    chatSettings: `${sideNavUrlSlug.settings}/chatSettings`,
    notificationSettings: `${sideNavUrlSlug.settings}/notificationSettings`,
    appearanceSettings: `${sideNavUrlSlug.settings}/appearanceSettings`
}


export const linkHrefSlugs = {
    followers: "/profile/settings/followers",
    following: "/profile/settings/following",
    profile: "/profile/settings",
}

export const openModal = {
    query: "modal=true",
    settingModalPath: "/profile/settings",
    // searchResultModalPath: "/"
}