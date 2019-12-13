export * from "./axios"

// TODO REMOVE
export async function post() {
  return new Promise(resolve => setTimeout(resolve, 2000))
}