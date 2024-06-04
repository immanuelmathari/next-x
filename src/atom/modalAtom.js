import { atom } from "recoil";

export const modalState = atom({
    key: 'modalState',
    default: false,
});

// to pass id
export const postIdState = atom({
    key: 'postIdState',
    default: '',
})