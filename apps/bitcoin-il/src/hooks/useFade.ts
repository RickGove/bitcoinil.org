import * as React from 'react'

export const useFade = () => {
  const disappearReappearHTMLElement = (
    el: HTMLElement,
    fadeOut: number,
    fadeIn: number,
    onFinish?: Function
  ) => {
    // console.log('What is the disappear, reappear el?', el)
    // if (!el) return null
    // el.style.transition = `opacity ${fadeOut}ms`
    // el.style.opacity = '0'
    // window.setTimeout(() => {
    //   el.style.opacity = '1'
    //   onFinish ? onFinish() : null
    // }, fadeIn + 500)
  }

  return { disappearReappearHTMLElement }
}
