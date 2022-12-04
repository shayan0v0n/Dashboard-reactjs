import create from 'zustand'

const useLoading: any = create((set: Function) => ({
  loadingStatus: false,
  toggleModeOn: () => set((state: any) => ({loadingStatus: true})),
  toggleModeOff: () => set((state: any) => ({loadingStatus: false})),
}))

export default useLoading