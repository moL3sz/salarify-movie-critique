export const API = "http://localhost:4000";
export const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
}
export const rating_keys = ["directing", "acting", "costume_design", "editing", "music", "visual_effects", "screenplay"]