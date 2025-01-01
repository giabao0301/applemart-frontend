import React from "react";

type LogoProps = {
  className?: string;
};

export const Logo = (props: LogoProps) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="500"
    height="500"
    viewBox="0 0 500 500"
    className={props.className}
  >
    <path
      d="M0 0 C165 0 330 0 500 0 C500 165 500 330 500 500 C335 500 170 500 0 500 C0 335 0 170 0 0 Z "
      fill="#FEFEFE"
      transform="translate(0,0)"
    />
    <path
      d="M0 0 C3.63 0 7.26 0 11 0 C11.2266333 1.03294189 11.4532666 2.06588379 11.68676758 3.13012695 C12.53944673 7.01290566 13.39579395 10.89486816 14.25317383 14.77661133 C14.62166655 16.44729398 14.98920334 18.11818781 15.35571289 19.78930664 C17.35940046 28.92207632 19.38608955 38.01742523 22 47 C22.47308594 46.07364746 22.94617188 45.14729492 23.43359375 44.19287109 C25.2269526 40.68349888 27.02474243 37.17641128 28.82373047 33.66992188 C29.59475616 32.16563762 30.364654 30.66077463 31.13330078 29.15527344 C36.17415244 19.28442928 41.4049499 9.56837417 47 0 C50.3 0 53.6 0 57 0 C57 25.41 57 50.82 57 77 C52.05 77 47.1 77 42 77 C42 62.48 42 47.96 42 33 C40.22625 36.568125 38.4525 40.13625 36.625 43.8125 C31.23439764 54.62411818 25.66697786 65.33134986 20 76 C19.67 76.66 19.34 77.32 19 78 C17.02 78 15.04 78 13 78 C12.76289307 76.74864258 12.52578613 75.49728516 12.28149414 74.20800781 C11.40115208 69.56357994 10.51928721 64.91944229 9.63696289 60.27539062 C9.25536243 58.26570386 8.87417451 56.25593872 8.4934082 54.24609375 C7.94591072 51.35656338 7.39692834 48.46731849 6.84765625 45.578125 C6.59291283 44.23104462 6.59291283 44.23104462 6.33302307 42.85675049 C6.09288734 41.5958963 6.09288734 41.5958963 5.84790039 40.30957031 C5.70800186 39.57232727 5.56810333 38.83508423 5.42396545 38.07550049 C5.00670575 36.03282764 4.52132268 34.01837918 4 32 C3.731875 32.92554688 3.46375 33.85109375 3.1875 34.8046875 C0.45007297 44.20533677 -2.37892581 53.57681701 -5.25 62.9375 C-5.77980469 64.6707251 -5.77980469 64.6707251 -6.3203125 66.43896484 C-6.65289062 67.52000488 -6.98546875 68.60104492 -7.328125 69.71484375 C-7.6262207 70.68542725 -7.92431641 71.65601074 -8.23144531 72.65600586 C-9 75 -9 75 -10 77 C-14.62 77 -19.24 77 -24 77 C-23.413233 72.11312412 -22.40318621 67.6729567 -20.8828125 62.99487305 C-20.66969421 62.33382065 -20.45657593 61.67276825 -20.23699951 60.99168396 C-19.53849932 58.82986887 -18.83189678 56.67080128 -18.125 54.51171875 C-17.63512439 53.00208545 -17.14571098 51.49230209 -16.65673828 49.9823761 C-15.63465127 46.83012876 -14.60887428 43.67911669 -13.58007812 40.52905273 C-12.260204 36.48762757 -10.94674175 32.44415669 -9.63565063 28.39987469 C-8.38426117 24.54061981 -7.12977263 20.6823747 -5.875 16.82421875 C-5.63557678 16.08719915 -5.39615356 15.35017956 -5.1494751 14.59082603 C-4.47375611 12.51270637 -3.79584372 10.43531632 -3.1171875 8.3581543 C-2.73159668 7.17569626 -2.34600586 5.99323822 -1.94873047 4.77494812 C-1 2 -1 2 0 0 Z "
      fill="#707075"
      transform="translate(301,205)"
    />
    <path
      d="M0 0 C5.84051632 3.48899757 9.57627564 7.55089823 11.7734375 14.05859375 C12.9895543 24.84809509 10.80108527 33.04211693 4.6484375 41.87109375 C0.02208269 47.41093263 -5.14751359 50.48248596 -12.32421875 51.49609375 C-18.74059246 51.75052245 -21.97754926 50.96429443 -27.2265625 47.05859375 C-27.8746237 50.57902074 -28.51960737 54.10000499 -29.1640625 57.62109375 C-29.34646484 58.61173828 -29.52886719 59.60238281 -29.71679688 60.62304688 C-30.65515622 65.75843163 -31.53706188 70.88371018 -32.2265625 76.05859375 C-36.8465625 76.05859375 -41.4665625 76.05859375 -46.2265625 76.05859375 C-46.2265625 71.00648017 -46.01841538 66.91342325 -45.21679688 62.02172852 C-45.1095076 61.35746353 -45.00221832 60.69319855 -44.89167786 60.00880432 C-44.53978736 57.83831346 -44.18012342 55.66919062 -43.8203125 53.5 C-43.57320647 51.98550664 -43.32659124 50.47093311 -43.08044434 48.95628357 C-42.43431263 44.98861823 -41.78155802 41.02207067 -41.12738037 37.0557251 C-40.45979397 33.0006994 -39.79852913 28.94464352 -39.13671875 24.88867188 C-37.83948956 16.94429306 -36.53467266 9.00118818 -35.2265625 1.05859375 C-30.6065625 1.05859375 -25.9865625 1.05859375 -21.2265625 1.05859375 C-20.8965625 2.04859375 -20.5665625 3.03859375 -20.2265625 4.05859375 C-18.834375 3.09953125 -18.834375 3.09953125 -17.4140625 2.12109375 C-12.04604645 -1.3523284 -6.05258311 -2.55907461 0 0 Z "
      fill="#212123"
      transform="translate(192.2265625,231.94140625)"
    />
    <path
      d="M0 0 C5.33188029 2.66594014 8.43583207 5.90984975 10.4375 11.5625 C11.99535474 22.26612784 11.02903902 31.6168399 4.4375 40.5625 C-0.51085928 45.98833254 -5.223453 50.10067074 -12.71875 50.8984375 C-13.8221875 50.91132813 -14.925625 50.92421875 -16.0625 50.9375 C-17.1659375 50.96585937 -18.269375 50.99421875 -19.40625 51.0234375 C-23.1817475 50.47206534 -24.82392225 49.14779915 -27.5625 46.5625 C-29.8694124 52.35987117 -30.44572392 58.29135531 -31.1875 64.4375 C-31.3215625 65.50742187 -31.455625 66.57734375 -31.59375 67.6796875 C-31.92211609 70.30661623 -32.2430477 72.9344724 -32.5625 75.5625 C-37.1825 75.5625 -41.8025 75.5625 -46.5625 75.5625 C-46.83715925 67.19561153 -45.78256267 59.37318497 -44.41015625 51.12890625 C-44.18773178 49.76043044 -43.96593626 48.39185228 -43.74473572 47.0231781 C-43.28293737 44.17585859 -42.81606038 41.32943936 -42.3449707 38.48364258 C-41.74148292 34.83763454 -41.14717213 31.19020762 -40.55614567 27.54216099 C-39.9898791 24.04971388 -39.41886346 20.55804803 -38.84765625 17.06640625 C-38.73959215 16.40303316 -38.63152805 15.73966007 -38.52018929 15.05618477 C-38.21409683 13.18228717 -37.90413546 11.30902276 -37.59399414 9.43579102 C-37.41856583 8.37119156 -37.24313751 7.3065921 -37.06239319 6.20973206 C-36.5625 3.5625 -36.5625 3.5625 -35.5625 0.5625 C-30.9425 0.5625 -26.3225 0.5625 -21.5625 0.5625 C-21.5625 1.5525 -21.5625 2.5425 -21.5625 3.5625 C-20.60150391 3.02109375 -20.60150391 3.02109375 -19.62109375 2.46875 C-12.5640806 -1.31742695 -7.75095427 -2.79034354 0 0 Z "
      fill="#212123"
      transform="translate(136.5625,232.4375)"
    />
    <path
      d="M0 0 C3.09244792 0.03255208 6.18489583 0.06510417 9.27734375 0.09765625 C12.03679987 12.39136354 14.69518355 24.70307183 17.27734375 37.03515625 C17.77746586 39.4183065 18.27788273 41.80139474 18.77832031 44.18447876 C19.10881541 45.75940352 19.43889912 47.33441468 19.76855469 48.90951538 C20.64402564 53.09124355 21.52629461 57.27140135 22.41796875 61.44970703 C22.69640625 62.75881798 22.69640625 62.75881798 22.98046875 64.09437561 C23.33819081 65.77526006 23.69750153 67.45580739 24.05859375 69.13597107 C25.27734375 74.87347166 25.27734375 74.87347166 25.27734375 77.09765625 C19.99734375 77.09765625 14.71734375 77.09765625 9.27734375 77.09765625 C6.27734375 64.47265625 6.27734375 64.47265625 6.27734375 61.09765625 C-8.30380774 59.55250058 -8.30380774 59.55250058 -21.72314453 63.50292969 C-24.87115667 67.23042664 -26.3414702 71.47443936 -27.72265625 76.09765625 C-28.72265625 77.09765625 -28.72265625 77.09765625 -32.1015625 77.1953125 C-33.49612702 77.18863994 -34.89067368 77.17668157 -36.28515625 77.16015625 C-36.99607422 77.15564453 -37.70699219 77.15113281 -38.43945312 77.14648438 C-40.20055638 77.13466489 -41.96161661 77.11672888 -43.72265625 77.09765625 C-42.37212489 73.58414604 -40.84044549 70.25363318 -39.10546875 66.9140625 C-38.32816406 65.41637329 -38.32816406 65.41637329 -37.53515625 63.88842773 C-36.69984375 62.29043335 -36.69984375 62.29043335 -35.84765625 60.66015625 C-35.26757812 59.54777588 -34.6875 58.43539551 -34.08984375 57.28930664 C-29.42436025 48.37354231 -24.64200607 39.52615024 -19.796875 30.70703125 C-17.55301612 26.62248971 -15.32990036 22.52728041 -13.1171875 18.42578125 C-12.51970703 17.31855713 -11.92222656 16.21133301 -11.30664062 15.07055664 C-10.14392067 12.91417263 -8.98242164 10.75712975 -7.82226562 8.59936523 C-7.30083984 7.63329346 -6.77941406 6.66722168 -6.2421875 5.671875 C-5.77917236 4.81166748 -5.31615723 3.95145996 -4.83911133 3.06518555 C-3.1642029 0.11349365 -3.1642029 0.11349365 0 0 Z "
      fill="#202022"
      transform="translate(63.72265625,204.90234375)"
    />
    <path
      d="M0 0 C1.67337415 0.94993563 3.28054867 2.01473194 4.87109375 3.09765625 C4.87109375 3.75765625 4.87109375 4.41765625 4.87109375 5.09765625 C5.53109375 5.09765625 6.19109375 5.09765625 6.87109375 5.09765625 C6.87109375 3.77765625 6.87109375 2.45765625 6.87109375 1.09765625 C11.49109375 1.09765625 16.11109375 1.09765625 20.87109375 1.09765625 C19.54788539 11.36944579 18.03212383 21.57183411 16.30859375 31.78515625 C16.08510123 33.1282244 15.86179343 34.4713233 15.63867188 35.81445312 C14.00508233 45.56170195 14.00508233 45.56170195 12.87109375 50.09765625 C8.25109375 50.09765625 3.63109375 50.09765625 -1.12890625 50.09765625 C-1.12890625 49.10765625 -1.12890625 48.11765625 -1.12890625 47.09765625 C-2.20140625 47.75765625 -3.27390625 48.41765625 -4.37890625 49.09765625 C-9.82758617 51.81230105 -15.16306675 51.92951274 -21.12890625 51.09765625 C-26.44934463 48.53244489 -30.03981886 44.87561829 -32.20703125 39.34765625 C-34.47921955 31.3372297 -34.16710736 23.3095052 -30.69140625 15.72265625 C-24.82939852 5.3673643 -12.68695036 -5.37740465 0 0 Z "
      fill="#707075"
      transform="translate(397.12890625,231.90234375)"
    />
    <path
      d="M0 0 C3.96794067 2.78553787 5.60624696 5.90858464 7.13671875 10.5 C7.2313924 12.68584749 7.26660789 14.87460867 7.26171875 17.0625 C7.26558594 18.79693359 7.26558594 18.79693359 7.26953125 20.56640625 C7.13671875 23.5 7.13671875 23.5 6.13671875 25.5 C-4.42328125 25.5 -14.98328125 25.5 -25.86328125 25.5 C-24.97268164 34.76039974 -24.97268164 34.76039974 -21.86328125 37.5 C-18.53253757 38.08478294 -18.53253757 38.08478294 -14.86328125 37.5 C-13.51388894 36.18273608 -12.16456375 34.86540266 -10.81640625 33.546875 C-6.40572097 31.18274769 -0.63039423 32.78564034 4.13671875 33.5 C1.84200743 40.27929942 -3.05406537 43.75828616 -8.98828125 47.4375 C-15.43683021 49.82970365 -24.48509997 49.7530977 -30.92578125 47.375 C-35.97984863 44.14899954 -38.96879854 40.24186829 -40.86328125 34.5 C-41.96501813 24.84058598 -40.74778061 15.98548608 -35.0625 7.95703125 C-25.66765859 -3.22556639 -13.28342812 -7.34029309 0 0 Z "
      fill="#222224"
      transform="translate(270.86328125,234.5)"
    />
    <path
      d="M0 0 C4.62 0 9.24 0 14 0 C14 4.58025702 13.96168029 8.0876238 13.1953125 12.44140625 C13.02507568 13.42987549 12.85483887 14.41834473 12.67944336 15.43676758 C12.49647705 16.46825928 12.31351074 17.49975098 12.125 18.5625 C11.75270599 20.72375192 11.38160409 22.88520955 11.01171875 25.046875 C10.74560791 26.59665039 10.74560791 26.59665039 10.47412109 28.17773438 C9.72771166 32.62083072 9.10814251 37.07609024 8.4921875 41.5390625 C7.66254208 47.37291841 6.7222905 53.18914432 5.79296875 59.0078125 C5.24192816 62.45917483 4.70445831 65.91232981 4.17578125 69.3671875 C4.04163818 70.23706299 3.90749512 71.10693848 3.76928711 72.00317383 C3.51100357 73.6796979 3.25521303 75.35660839 3.00219727 77.03393555 C2.11234147 82.77531705 2.11234147 82.77531705 1 85 C-3.62 85 -8.24 85 -13 85 C-11.12630307 71.64492615 -9.14425429 58.31420783 -7 45 C-6.33258088 40.85428725 -5.66576161 36.70847928 -5 32.5625 C-4.83153564 31.51360596 -4.66307129 30.46471191 -4.48950195 29.3840332 C-2.92418619 19.59948569 -1.44578235 9.80284245 0 0 Z "
      fill="#222224"
      transform="translate(219,197)"
    />
    <path
      d="M0 0 C4.62 0 9.24 0 14 0 C13.45412201 5.69272761 12.86031632 11.34649274 12 17 C14.64 17 17.28 17 20 17 C19.67 20.96 19.34 24.92 19 29 C15.7 29 12.4 29 9 29 C8.87753906 30.53269531 8.75507813 32.06539062 8.62890625 33.64453125 C8.01723766 40.37288573 6.99738686 47.01732861 5.9375 53.6875 C5.75123047 54.87794922 5.56496094 56.06839844 5.37304688 57.29492188 C4.91848799 60.19710551 4.45968739 63.09862426 4 66 C-0.62 66 -5.24 66 -10 66 C-9.37483389 53.49667786 -7.1665126 41.3140421 -5 29 C-6.32 29 -7.64 29 -9 29 C-8.67 25.04 -8.34 21.08 -8 17 C-6.02 17 -4.04 17 -2 17 C-2.04125 16.05125 -2.0825 15.1025 -2.125 14.125 C-2.14492938 9.27219527 -1.03569645 4.72536505 0 0 Z "
      fill="#717176"
      transform="translate(469,216)"
    />
    <path
      d="M0 0 C0.80824219 0.10183594 1.61648438 0.20367187 2.44921875 0.30859375 C3.06410156 0.39238281 3.67898438 0.47617188 4.3125 0.5625 C4.00378878 2.35482337 3.69040936 4.14634321 3.375 5.9375 C3.20097656 6.93523437 3.02695312 7.93296875 2.84765625 8.9609375 C2.3125 11.5625 2.3125 11.5625 1.3125 13.5625 C0.57644531 13.50449219 -0.15960938 13.44648438 -0.91796875 13.38671875 C-2.38169922 13.31904297 -2.38169922 13.31904297 -3.875 13.25 C-4.83792969 13.19199219 -5.80085938 13.13398438 -6.79296875 13.07421875 C-10.87442941 13.76272426 -12.1817664 15.31624032 -14.6875 18.5625 C-15.63699748 21.12987233 -16.31586433 23.35745259 -16.875 26 C-17.03589111 26.69432129 -17.19678223 27.38864258 -17.36254883 28.10400391 C-18.67791942 33.98079407 -19.56450378 39.88968989 -20.29296875 45.8671875 C-20.6875 48.5625 -20.6875 48.5625 -21.6875 50.5625 C-26.3075 50.5625 -30.9275 50.5625 -35.6875 50.5625 C-35.0370025 45.8333639 -34.37950866 41.10526693 -33.71606445 36.37792969 C-33.49222679 34.77629669 -33.27016241 33.17441467 -33.05004883 31.57226562 C-31.6576762 21.44822592 -29.95741685 11.5341582 -27.6875 1.5625 C-23.0675 1.5625 -18.4475 1.5625 -13.6875 1.5625 C-13.3575 2.5525 -13.0275 3.5425 -12.6875 4.5625 C-11.924375 3.923125 -11.16125 3.28375 -10.375 2.625 C-6.6730729 -0.21601382 -4.4860525 -0.58513728 0 0 Z "
      fill="#717176"
      transform="translate(455.6875,231.4375)"
    />
    <path
      d="M0 0 C3.04669991 2.00952547 4.532327 3.55296473 5.6640625 7.0546875 C6.71052141 12.98462132 5.35457396 17.09032553 2 22 C-1.21285277 25.79700782 -3.39087239 26.82120804 -8.375 27.375 C-12 27 -12 27 -14.875 24.6875 C-17.80653032 20.97997636 -18.40849191 17.90573036 -18.34765625 13.1953125 C-17.54629304 8.13501899 -14.47849969 4.27870244 -10.6875 1 C-7.0029589 -0.37099204 -3.87349781 -0.80600055 0 0 Z "
      fill="#F9F9F9"
      transform="translate(184,244)"
    />
    <path
      d="M0 0 C2.69105198 2.17574416 4.45532928 3.91065856 6 7 C6.6046416 13.04641603 5.18415136 17.00099103 2 22 C-1.21285277 25.79700782 -3.39087239 26.82120804 -8.375 27.375 C-12 27 -12 27 -14.875 24.6875 C-18.19392114 20.49004091 -18.35561977 17.24539163 -18 12 C-15.06077279 3.5281098 -8.96471636 -1.59051419 0 0 Z "
      fill="#FBFBFB"
      transform="translate(396,244)"
    />
    <path
      d="M0 0 C2.8100346 1.79363911 4.50940468 3.01880935 6 6 C7.04699681 13.01090268 5.7620354 17.44762671 1.703125 23.1875 C-1.2940608 26.37716562 -3.60102792 26.94933688 -7.9375 27.5 C-11.42467978 27.37615623 -12.03934777 26.96966943 -15 24.6875 C-18.10497136 20.25633749 -17.83049385 15.15982751 -17 10 C-13.41155129 2.69019706 -8.27608645 -1.70537539 0 0 Z "
      fill="#FAFAFA"
      transform="translate(127,244)"
    />
    <path
      d="M0 0 C2.99307227 2.99307227 2.99607801 6.65405644 3.625 10.6875 C3.7590625 11.47833984 3.893125 12.26917969 4.03125 13.08398438 C4.80991629 17.89502964 5 22.01088641 5 27 C-0.61 27 -6.22 27 -12 27 C-8.27529718 17.85754761 -4.22702617 8.91695433 0 0 Z "
      fill="#F6F6F6"
      transform="translate(62,227)"
    />
    <path
      d="M0 0 C3.25 0.375 3.25 0.375 6.125 2.5625 C8.25 5.375 8.25 5.375 8.25 10.375 C2.31 10.375 -3.63 10.375 -9.75 10.375 C-8.61105812 5.81923249 -7.12225486 4.49433575 -3.75 1.375 C-2.75 0.375 -2.75 0.375 0 0 Z "
      fill="#F7F7F7"
      transform="translate(256.75,240.625)"
    />
    <path
      d="M0 0 C0.66 0.33 1.32 0.66 2 1 C1.67 3.97 1.34 6.94 1 10 C0.01 10 -0.98 10 -2 10 C-1.34 6.7 -0.68 3.4 0 0 Z "
      fill="#F0F0F1"
      transform="translate(459,235)"
    />
  </svg>
);