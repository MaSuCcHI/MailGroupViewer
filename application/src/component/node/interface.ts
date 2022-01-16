
export interface mailGroup {
    name: string
    address: string
    isUser: boolean
    children: [mailGroup]
}

export interface mailGroups {
    groups: Map<string,mailGroup>
}
