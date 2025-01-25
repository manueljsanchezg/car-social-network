import { useLocalStorage } from "@vueuse/core"

export const emailStorage = useLocalStorage('email', '');

export const jwtStorage = useLocalStorage('jwt', '');