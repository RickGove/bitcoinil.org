import * as React from 'react'

import { FormattedMessage } from '../components/FormattedMessageWithHover'
import { BodyCard, tableOfContentItem } from '../utils/interfaces'

export const devItems: tableOfContentItem[] = [
  {
    categoryHeading: (
      <>
        <FormattedMessage
          id={`developers.general.title`}
          defaultMessage={`General`}
          description={`developers.desc`}
        />
      </>
    ),
    hasSubheadings: true,
    body: () => <></>,
    key: 'general',
    isSubmenuItem: true,
    isSubmenuParent: true,
    parentMenuKey: 'general',
    subHeadings: [
      {
        categoryHeading: (
          <>
            <FormattedMessage
              id={`developers.core-title`}
              defaultMessage={`Bitcoin Israel Core Repository`}
              description={`developers.desc`}
            />
          </>
        ),
        hasSubheadings: true,
        body: () => <></>,
        key: 'core-repo-title',
        subHeadings: [
          {
            categoryHeading: (
              <>
                <FormattedMessage
                  id={`developers.core-repo.mesage`}
                  defaultMessage={`BitCoin Israel Core GitHub Repo`}
                  description={`developers.desc`}
                />
              </>
            ),
            hasSubheadings: false,
            body: () => (
              <>
                <p>
                  <a href="https://github.com/bitcoinil/bitcoinil">
                    https://github.com/bitcoinil/bitcoinil
                  </a>
                </p>
                <p>
                  <FormattedMessage
                    id={`developers.core-repo-desc`}
                    defaultMessage={`This repository contains the Bitcoin Israel Core code which is
                  a direct modification of the official Bitcoin Core github
                  repo.`}
                    description={`developers.desc`}
                  />
                </p>
              </>
            ),
            key: 'core-repo'
          },
          {
            categoryHeading: (
              <>
                <FormattedMessage
                  id={`developers.webite-repo-title`}
                  defaultMessage={`BitCoin Israel Website GitHub Repo`}
                  description={`developers.desc`}
                />
              </>
            ),
            hasSubheadings: false,
            body: () => (
              <>
                <p>
                  <a href="https://github.com/bitcoinil/bitcoinil.org">
                    https://github.com/bitcoinil/bitcoinil.org
                  </a>
                </p>
                <p>
                  <FormattedMessage
                    id={`developers.website-repo-desc`}
                    defaultMessage={` The bitcoinil.org website is an open source and fully
                  automated deploy flow for the website designed to be easily
                  copied by similar projects.`}
                    description={`developers.desc`}
                  />
                </p>
              </>
            ),
            key: 'website-repo'
          }
        ]
      }
    ]
  },
  {
    categoryHeading: (
      <>
        <FormattedMessage
          id={`developers.Mining.title`}
          defaultMessage={`Mining`}
          description={`developers.desc`}
        />
      </>
    ),
    hasSubheadings: true,
    body: () => <></>,
    key: 'mining',
    isSubmenuItem: true,
    isSubmenuParent: true,
    parentMenuKey: 'mining',
    subHeadings: [
      {
        categoryHeading: (
          <>
            <FormattedMessage
              id={`developers.compatible-title`}
              defaultMessage={`Bitcoin Israel Core Repository`}
              description={`developers.desc`}
            />
          </>
        ),
        hasSubheadings: true,
        body: () => <></>,
        key: 'core-repo-title',
        subHeadings: [
          {
            categoryHeading: (
              <>
                <FormattedMessage
                  id={`developers.mining.compatible.title`}
                  defaultMessage={`Compatible Software`}
                  description={`developers.desc`}
                />
              </>
            ),
            hasSubheadings: false,
            body: () => (
              <>
                <section>
                  <h3 id="wallet-binaries">
                    <FormattedMessage
                      id={`developers.binaries`}
                      defaultMessage={`Wallet Binaries`}
                      description={`developers.desc`}
                    />
                  </h3>

                  <p>
                    <FormattedMessage
                      id={`developers.download-windows`}
                      defaultMessage={`Download BitcoinIL for Windows:`}
                      description={`developers.desc`}
                    />
                    <a href="/assets/downloads/binaries/windows/bitcoinil-0.21.0-win64-setup.exe">
                      bitcoinil-0.21.0-win64-setup.exe
                    </a>
                  </p>

                  <p>
                    <FormattedMessage
                      id={`developers.download-osx`}
                      defaultMessage={`Download BitcoinIL for OSX:`}
                      description={`developers.desc`}
                    />
                    <a href="/assets/downloads/binaries/osx/BitcoinIL-Qt.dmg">
                      BitcoinIL-Qt.dmg
                    </a>
                  </p>

                  <p>
                    <FormattedMessage
                      id={`developers.download-linux`}
                      defaultMessage={`Download BitcoinIL for Linux Ubuntu:`}
                      description={`developers.desc`}
                    />
                    <a href="/assets/downloads/binaries/linux/btcil-ubuntu20.zip">
                      btcil-ubuntu20.zip
                    </a>
                  </p>

                  <h3 id="installation-guides">
                    <FormattedMessage
                      id={`developers.install-guides`}
                      defaultMessage={`Installation Guides`}
                      description={`developers.desc`}
                    />
                  </h3>

                  <p>
                    <a href="./install/windows.html">
                      <FormattedMessage
                        id={`developers.windows-install-guide`}
                        defaultMessage={`BitcoinIL Windows Wallet and Miner Installation Guide`}
                        description={`developers.desc`}
                      />
                    </a>
                  </p>

                  <p>
                    <a href="./install/osx.html">
                      <FormattedMessage
                        id={`developers.osx-install-guide`}
                        defaultMessage={`BitcoinIL OSX Wallet Installation Guide`}
                        description={`developers.desc`}
                      />
                    </a>
                  </p>
                </section>
              </>
            ),
            key: 'mining-software'
          },
          {
            categoryHeading: (
              <>
                <FormattedMessage
                  id={`developers.mining.pools.title`}
                  defaultMessage={`Pools`}
                  description={`developers.desc`}
                />
              </>
            ),
            hasSubheadings: false,
            body: () => (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage
                          id={`developers.pool.title`}
                          defaultMessage={`Pool`}
                          description={`developers.desc`}
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id={`developers.cpu-gpu`}
                          defaultMessage={`CPU/GPU Support`}
                          description={`developers.desc`}
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id={`developers.stratum`}
                          defaultMessage={`Stratum URL`}
                          description={`developers.desc`}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="https://btcilpool.com/">btcilpool.com</a>
                      </td>
                      <td>GPU, CPU</td>
                      <td>
                        <code className="language-plaintext highlighter-rouge">
                          stratum+tcp://btcilpool.com:8228
                        </code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="https://multipoolil.com/">multipoolil.com</a>
                      </td>
                      <td>GPU, CPU</td>
                      <td>
                        <code className="language-plaintext highlighter-rouge">
                          stratum+tcp://multipoolil.com:4467
                        </code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="https://pool.btcil.co.il/">pool.btcil.co.il</a>
                      </td>
                      <td>GPU, CPU</td>
                      <td>
                        <code className="language-plaintext highlighter-rouge">
                          stratum+tcp://stratum.btcil.co.il:8736
                        </code>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="http://bitcoinilpool.com/">
                          bitcoinilpool.com
                        </a>
                      </td>
                      <td>GPU, CPU</td>
                      <td>
                        <code className="language-plaintext highlighter-rouge">
                          stratum+tcp://asia.bitcoinilpool.com:6101
                        </code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ),
            key: 'mining-pools'
          }
        ]
      }
    ]
  },
  {
    categoryHeading: (
      <>
        <FormattedMessage
          id={`developers.Wallets.title`}
          defaultMessage={`Wallets`}
          description={`developers.desc`}
        />
      </>
    ),
    hasSubheadings: true,
    body: () => <></>,
    key: 'wallets',
    isSubmenuItem: true,
    isSubmenuParent: true,
    parentMenuKey: 'wallets',
    subHeadings: [
      {
        categoryHeading: (
          <>
            <FormattedMessage
              id={`developers.wallets-title`}
              defaultMessage={`Wallets`}
              description={`developers.desc`}
            />
          </>
        ),
        hasSubheadings: true,
        body: () => <></>,
        key: 'wallets-title',
        subHeadings: [
          {
            categoryHeading: (
              <>
                <FormattedMessage
                  id={`developers.adresses.mesage`}
                  defaultMessage={`Bitcoin Israel Public Addresses`}
                  description={`developers.desc`}
                />
              </>
            ),
            hasSubheadings: false,
            body: () => (
              <>
                <p>
                  <FormattedMessage
                    id={`developers.legacy`}
                    defaultMessage={`Legacy`}
                    description={`developers.desc`}
                  />
                </p>
                <p>
                  <FormattedMessage
                    id={`developers.segwit-compatible`}
                    defaultMessage={`SegWit Compatible`}
                    description={`developers.desc`}
                  />
                </p>
                <p>
                  <FormattedMessage
                    id={`developers.segwit-native`}
                    defaultMessage={`SegWit Native`}
                    description={`developers.desc`}
                  />
                </p>
              </>
            ),
            key: 'wallets-body'
          },
          {
            categoryHeading: (
              <>
                <FormattedMessage
                  id={`developers.open-source-wallets-title`}
                  defaultMessage={`Open Source Wallets`}
                  description={`developers.desc`}
                />
              </>
            ),
            hasSubheadings: false,
            body: () => <>N/A</>,
            key: 'website-repo'
          }
        ]
      }
    ]
  }
]

export const devCards: BodyCard[] = [
  {
    img: '',
    title: (
      <FormattedMessage
        id={`devCards.general.title`}
        defaultMessage={`General`}
        description={`developer cards title`}
      />
    ),
    text: (
      <React.Fragment>
        <p className="title-p">
          <FormattedMessage
            id={`devCard.core-repo.text`}
            defaultMessage={`Bitcoin Israel Core Repository`}
            description={`developer cards text`}
          />
        </p>

        <a href="https://github.com/bitcoinil/bitcoinil">
          <p>
            <FormattedMessage
              id={`devCard.core-repo.link`}
              defaultMessage={`https://github.com/bitcoinil/bitcoinil`}
              description={`developer cards text`}
            />
          </p>
        </a>

        <p>
          <FormattedMessage
            id={`devCard.core-repo.subtext`}
            defaultMessage={`This repository contains the Bitcoin Israel Core code which is a
              direct modification of the official Bitcoin Core github repo.`}
            description={`developer cards text`}
          />
        </p>
      </React.Fragment>
    ),
    id: `lowfee`
  },
  {
    img: '',
    title: (
      <FormattedMessage
        id={`devCards.control.title`}
        defaultMessage={'Protection against fraud'}
        description={`developer cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`devCard.control.text`}
        defaultMessage={`Any business that accepts credit cards or PayPal knows the problem of payments that are later reversed. Chargeback frauds result in limited market reach and increased prices, which in turn penalizes customers. Bitcoin payments are irreversible and secure, meaning that the cost of fraud is no longer pushed onto the shoulders of the merchants.`}
        description={`developer cards text`}
      />
    ),
    id: 'control'
  },
  {
    img: '',
    title: (
      <FormattedMessage
        id={`devCards.international.title`}
        defaultMessage={`Fast international payments`}
        description={`developer cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`devCard.international.text`}
        defaultMessage={`Sending bitcoins across borders is as easy as sending them across the street. There are no banks to make you wait three business days, no extra fees for making an international transfer, and no special limitations on the minimum or maximum amount you can send.`}
        description={`developer cards text`}
      />
    ),
    id: `international`
  },
  {
    img: '',
    title: (
      <FormattedMessage
        id={`devCards.pci.title`}
        defaultMessage={`No PCI compliance required`}
        description={`developer cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`devCard.pci.text`}
        defaultMessage={`Accepting credit cards online typically requires extensive security checks in order to comply with the PCI standard. Bitcoin still requires you to secure your wallet and your payment requests, however, you do not carry the costs and responsibilities that come with processing sensitive information from your customers like with credit card numbers.`}
        description={`developer cards text`}
      />
    ),
    id: `visib`
  },
  {
    img: '',
    title: (
      <FormattedMessage
        id={`devCards.visib.title`}
        defaultMessage={`Get some free visibility`}
        description={`developer cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`devCard.visib.text`}
        defaultMessage={`Bitcoin is an emerging market of new customers who are searching for ways to spend their bitcoins. Accepting them is a good way to get new customers and give your business some new visibility. Accepting a new payment method has often shown to be a clever practice for online businesses.`}
        description={`developer cards text`}
      />
    ),
    id: `visib`
  },
  {
    img: '',
    title: (
      <FormattedMessage
        id={`devCards.multi-sig.title`}
        defaultMessage={'Multi-signature'}
        description={`developer cards title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`devCard.multi-sig.text`}
        defaultMessage={`Bitcoin also includes a multi-signature feature which allows bitcoins to be spent only if a subset of a group of people authorize the transaction. This can be used by a board of directors, for example, to prevent members from making expenditures without enough consent from other members, as well as to track which members permitted particular transactions.`}
        description={`developer cards text`}
      />
    ),
    id: `multi`
  },
  {
    img: '',
    title: (
      <FormattedMessage
        id={`devCards.transparency.title`}
        defaultMessage={'Accounting Transparency'}
        description={`developer cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`devCard.transparency.text`}
        defaultMessage={`Many organizations are required to produce accounting documents about their activity. Using Bitcoin allows you to offer the highest level of transparency since you can provide information to verify balances and transactions through the block chain. For example, non-profit organizations can allow the public to see how much they receive in donations.`}
        description={`developer cards text`}
      />
    ),
    id: `transparency`
  }
]
