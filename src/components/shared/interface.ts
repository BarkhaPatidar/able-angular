export interface PostModal {
    postId?: number,
    user?: string,
    userProfile?: string,
    pic?: string,
    caption?: string,
    time?: Date,
    likes?: number,
    comments?: number,
    share?: number,
    liked?: string
}

export interface UserModal {
    email?: string,
    password?: string,
    name?: string,
    profile?: string,
    profession?: string,
    gender?: string,
    dob?: string,
    maritalStatus?: string,
    location?: string,
    skills?: string,
    jobs?: string,
    followers?: string
}