export const STEAM_ID: RegExp = /^STEAM_[0-5]:[01]:\d+$/g
export const USERNAME: RegExp = /[\w\s\-_]+/g
export const NOT_USERNAME: RegExp = /[^\w\s\-_]+/g
export const SLUG: RegExp = /^[a-z0-9_]+(?:-[a-z0-9_]+)*$/g