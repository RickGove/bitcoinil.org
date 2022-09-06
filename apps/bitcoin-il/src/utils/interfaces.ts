import * as React from 'react'

import type { CompiledTheme } from '@djitsu/themes'

export interface ClickedMenuItemData {
  key: string
  keyPath: [string]
}
export interface MainMenuItem {
  label: JSX.Element
  key: string
  submenu?: MainMenuItem[]
  element?: React.ReactNode
}
export interface RoutePageProps {
  title: JSX.Element
  subtitle: JSX.Element | null
  body: JSX.Element | Function
  id: string
}

export interface SpendBitilProps {}

export interface AvailableLanguageData {
  icon: string | JSX.Element
  locale: string
  name: string
}

export interface ThemeVariant {
  css: string
  isDark: boolean
  monaco: string
  name: string
  title: string
}

export interface SiteButtonProps {
  onClick?: Function
  type?: any // Any because it's for the AntD component and I can't figure out the type
  className?: string
  children: React.ReactNode
  color?: string
  background?: string
  href?: string
  opacity?: string
  transition?: string
  buttonLinkWrapUrl?: string
  buttonLinkId?: string
  size?: string
  style?: {}
}

export interface TranslationDictionary {
  [key: string]: string
}

export interface StyledSupportProps {
  onClick: Function
  isExtended: boolean
}

export interface Messages {
  [key: string]: TranslationDictionary
}

export type ThemeContextValue = [ThemeContextState, ThemeContextActions]
export interface ThemeContextState {
  themes: CompiledTheme[]
  active: {
    theme: string
    variant?: string
    isDark: boolean
  }
  debug: {
    hrefLight?: string
    hrefDark?: string
  }
}

export interface BoxProps {
  index: number
  imgSrc: string
  id: string
  titleDefaultMessage: JSX.Element
  titleDescription: string
  subtitleDefaultMessage: JSX.Element
  subtitleDescription: string
  link: string
}

export interface SubHeadingProps {
  i: number
  item: tableOfContentItem
  elInView: string
  handleRef: (
    ref: HTMLElement | null,
    left: boolean,
    item: tableOfContentItem | tableOfContentSubheading,
    menuParent?: string | null
  ) => null | undefined
  handleOpenSubmenu: (key: string) => void
  openSubmenus: string[]
  isSubmenuOpen: (key: string) => boolean
  scrollToRightSideElement: (key: string) => null | undefined
}

export interface ItemDisplayProps {
  name?: string
  logo?: string
  description?: string
  url?: string
  className?: string
}

export interface ContentSubheadingsProps {
  i: number
  item: tableOfContentItem
  handleRef: (
    ref: HTMLElement | null,
    left: boolean,
    item: tableOfContentItem | tableOfContentSubheading,
    menuParent?: string | null
  ) => null | undefined
}
export interface ThemeContextActions {
  setTheme: (theme: string, variant?: string) => void
  toggleDarkMode: Function
  getUserThemePreferenceFromLocalStorage: Function
  storeCurrentThemeToLocalStorage: Function
  setThemeWithFade: Function
}

export interface TranslationsAdminProps {}

export interface LanguageAtomValue {
  language: string
}

export interface WhitePaperBodyProps {}

export interface WhitePaperTranslation {
  link: string
  language: JSX.Element
  translatedBy?: {
    author: JSX.Element
    link: string
  }[]
}

export interface ThemeSwitchProps {
  isMobile: boolean
}

export interface ThemeSelectMobileProps {}

export interface ResourcesBodyProps {}

export interface QuickOverviewBoxProps {
  index: Number
  imgSrc: string
  id: string
  titleDefaultMessage: JSX.Element
  titleDescription: string
  subtitleDefaultMessage: JSX.Element
  subtitleDescription: string
  baseFormattedMessage?: String
  link: string
  isDarkMode?: boolean
}

export interface NotARouteProps {}

export interface AlertnatingTwoColumnRowItemProps {
  index: number
  imgSrc: string
  titleText: JSX.Element
  bodyText: JSX.Element
}

export interface GetStartedWithBitcoinProps {}

export interface FooterProps {}

export interface FAQBodyProps {}

export interface tableOfContentSubheading {
  subHeadingTitle: JSX.Element
  subHeadingBody?: JSX.Element
  hasSubheadings: boolean
  subHeadings?: tableOfContentSubheading[]
  isSubmenuParent?: boolean
  key: string
}

export interface FAQBodyProps {}

export interface ElementToTrack {
  element: HTMLElementWithID
  hasSubheadings: boolean
  key: string
  isSubMenuItem?: boolean
  menuParent?: string | null
}

export interface StickyTOCProps {
  categories: Record<string, any>
  itemsOrganized?: boolean
}
export type StickyTOCCategory = {
  [name: string]: StickyTOCSubCategory
}
export type StickyTOCSubCategory = {
  [name: string]: StikcyTOCItem
}
export type StikcyTOCItem = {
  name: string
  description: string
  logo: string
  url: string
}

export interface LogoProps {
  isDark: boolean
  props?: any
  isHeader?: boolean
}

export interface tableOfContentItem {
  categoryHeading: JSX.Element
  hasSubheadings: boolean
  mobileBody?: () => JSX.Element
  body?: () => JSX.Element
  subHeadings?: tableOfContentItem[]
  key: string
  isSubmenuItem?: boolean
  isSubmenuParent?: boolean
  parentMenuKey?: string | null
}

export interface HTMLElementWithID extends HTMLElement {
  id: string
}

export interface EventsBodyProps {}

export interface CustomNavLinkProps {
  to: string
  children?: React.ReactNode
  style?: any
  className?: string
}

export interface YouShouldKnowProps {}

export interface BuyBodyProps {}

export interface CommunityBodyProps {}

export interface FormattedMessageWithHoverInfoProps {
  id: string
  defaultMessage: string
  description?: string | undefined
}
export interface StyledDevToolsProps {
  positions: { leftRight: string; topBottom: string }
  showingTheme: boolean
  isMin: boolean
}

export interface BurgerMenuMenuProps {
  items: MainMenuItem[]
}

export interface StyledQuickOverviewBoxProps {
  isDarkMode: boolean | undefined
}

export interface ThemeSwitchMobileProps {}

export interface LanguageSelectMobileNewProps {}

export interface LanguageSelectMobileProps {}

export interface QuickOverviewBox {
  index: Number
  imgSrc: string
  id: string
  titleDefaultMessage: JSX.Element
  titleDescription: string
  subtitleDefaultMessage: JSX.Element
  subtitleDescription: string
  baseFormattedMessage?: String
  link: string
}

export interface BurgerMenuProps {}

export interface IndividualsBodyProps {}

export interface InnovationBodyProps {}

export interface BusinessBodyProps {}

export interface SupportBodyProps {}

export interface BodyCard {
  img: string
  title: JSX.Element
  text: JSX.Element
  id: string
}

export interface TimelineCompProps {
  items: JSX.Element[]
}

export interface GettingStartedBodyProps {}

export interface TimelineItemProps {
  title: JSX.Element
  body: JSX.Element
  buttonText: JSX.Element
  buttonOnClick?: Function
  navigateTo?: string
  key?: string
  buttonLinkWrapUrl?: string
}

export interface HowItWorksProps {}

export interface AlternatingTwoColumnRowProps {
  index: number
  imgSrc?: string | null
  sideElement?: JSX.Element | null
  titleText: JSX.Element
  bodyText: JSX.Element
}

export interface HeaderProps {}

export interface LanguageSelectProps {}

export interface VocabularyProps {}

export interface VocabularyTerm {
  word: JSX.Element
  definition: JSX.Element
}

export interface DevelopersProps {}

export interface ExchangesBodyProps {}

export interface CoreShortcutBox {
  image: string
  title: JSX.Element
  subtitle: JSX.Element
  link: string
}
export interface CoreBodyProps {}

export interface Link {
  linkText: string
  link: string
  postLinkText: string
}

export interface CoreBox {
  img: string
  title: JSX.Element
  mainText: JSX.Element
}

export interface AvailableLanguage {
  name: string
  icon: string
  locale: string
  longName: string
}

export interface LongNamesForLanguageType {
  [key: string]: string
}

export interface Exchange {
  name: JSX.Element
  link: string
}

export interface WalletChoice {
  nameAsElement: JSX.Element
  id: string
  gitHubRepo: string
  releases: string
  appstoreLink?: string
  websiteLink: string
}

export interface ExchangeCountry {
  city: JSX.Element
  exchanges: Exchange[]
  flag: string
  countryCode?: string
}
export interface ExchangeLocation {
  location: JSX.Element
  exchanges?: Exchange[]
  cities?: ExchangeCountry[]
  countryCode?: string
}

export interface CardsDisplayProps {
  cards: BodyCard[]
}

export interface MenuItemProps {
  label: JSX.Element
}

export interface SupportProps {}

export interface AppProps {}

export interface AppWrappersProps {
  children: JSX.Element
}

export interface AppLayoutProps {
  children: JSX.Element
}

export interface StickyTOCBurgerProps {
  label: JSX.Element
  items: tableOfContentItem[]
  elInView: string
  scrollToRightSideElement: Function
  handleRef: Function
  handleOpenSubmenu: Function
  openSubmenus: string[]
  isSubmenuOpen: Function
  disabled: boolean
}

export interface SubmenuRef {
  ref: HTMLElement
  size?: number
  key: string
}
