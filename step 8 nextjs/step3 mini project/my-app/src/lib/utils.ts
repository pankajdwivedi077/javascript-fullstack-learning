export { cn } from "cn"

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim() 
    .replace(/[^\w\s-]/g, "") 
    .replace(/[\s_-]+/g, "-") 
    .replace(/^-+|-+$/g, ""); 
}

export function formDate(date: Date){
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date)
}