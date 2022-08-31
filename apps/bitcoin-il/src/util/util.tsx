import { HTMLElementWithID } from '../utils/interfaces'

export const flashElement = (
  el: HTMLElement | HTMLElementWithID | undefined | null
) => {
  // if (!el) return
  // const duration = 300
  // el.style.opacity = '0.2'
  // window.setTimeout(() => {
  //   el.style.opacity = '1'
  // }, duration)
  // window.setTimeout(() => {
  //   el.style.opacity = '0.2'
  // }, duration * 2)
  // window.setTimeout(() => {
  //   el.style.opacity = '1'
  // }, duration * 3)
  // window.setTimeout(() => {
  //   el.style.opacity = '0.2'
  // }, duration * 4)
  // window.setTimeout(() => {
  //   el.style.opacity = '1'
  // }, duration * 5)
}

export const scrollToElement = (el: HTMLElement | null) => {
  if (!el) return null

  el.scrollIntoView({ behavior: 'smooth', inline: 'start' })
}
