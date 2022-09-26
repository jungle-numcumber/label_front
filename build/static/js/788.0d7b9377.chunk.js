'use strict';
(self.webpackChunklabel_front = self.webpackChunklabel_front || []).push([
  [788],
  {
    788: function (e, s, r) {
      r.r(s),
        r.d(s, {
          default: function () {
            return X;
          },
        });
      var n = r(9439),
        t = 'Library_main__MCitx',
        a = 'Library_sectionTitle__N2arK',
        l = 'Library_p__FFm0A',
        c = 'Library_search__zvTDf',
        i = 'Library_searchImg__dIgre',
        u = 'Library_searchInput__y34aT',
        o = 'Library_section__bIMha',
        d = 'Library_sectionSearch__7W8Oa',
        h = 'Library_searchClose__PV1xk',
        p = 'Library_divTextSearch__vx3y7',
        x = 'Library_divText__6PHXN',
        _ = 'Library_bookList__XZGAi',
        f = 'Library_bookContainer__U8mQH',
        j = 'Library_book__YTeSR',
        b = 'Library_bookInfo__HSBHY',
        m = 'Library_label__KHl18',
        v = 'Library_pdfName__zRxUt',
        N = 'Library_author__q3-ld',
        y = 'Library_moreBtn__Iprpe',
        k = 'Library_moreDiv__vH8wH',
        g = r(2791),
        L = r(6871),
        P = r(4165),
        C = r(5861),
        S = 'Popup_popWrap__5qbdi',
        w = 'Popup_popBox__19e+S',
        Z = 'Popup_article__7mjbz',
        R = 'Popup_pTitle__vVV+L',
        I = 'Popup_pSubTitle__lkGxu',
        H = 'Popup_inputWrap__nwHK-',
        z = 'Popup_label__uVzaD',
        T = 'Popup_input__cIz+w',
        F = 'Popup_aside__b1vzF',
        A = 'Popup_file__pY4zC',
        D = 'Popup_btn__E2oC4',
        B = 'Popup_p__TcXkX',
        Y = r(9525),
        M = r(9658),
        V = r(184);
      function W() {
        var e = (0, g.useRef)(null),
          s = (0, g.useRef)(null),
          r = (0, g.useRef)(null),
          t = (0, g.useRef)(null),
          a = (0, g.useState)(!1),
          l = (0, n.Z)(a, 2),
          c = l[0],
          i = l[1];
        function u(e) {
          return o.apply(this, arguments);
        }
        function o() {
          return (o = (0, C.Z)(
            (0, P.Z)().mark(function e(n) {
              var a, l;
              return (0, P.Z)().wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (a = new FormData()),
                        (l = JSON.stringify({
                          title: s.current.value,
                          subTitle: r.current.value,
                          author: t.current.value,
                        })),
                        a.append('files', n.target.files[0]),
                        a.append('body', l),
                        e.abrupt('return', a)
                      );
                    case 5:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            }),
          )).apply(this, arguments);
        }
        var d = (0, g.useCallback)(
            (function () {
              var e = (0, C.Z)(
                (0, P.Z)().mark(function e(r) {
                  var n;
                  return (0, P.Z)().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (r.target.files) {
                            e.next = 4;
                            break;
                          }
                          return e.abrupt('return');
                        case 4:
                          if (s.current.value) {
                            e.next = 6;
                            break;
                          }
                          return e.abrupt('return');
                        case 6:
                          return i(!0), (e.next = 9), u(r);
                        case 9:
                          return (
                            (n = e.sent),
                            (e.next = 12),
                            fetch('https://inkyuoh.shop/upload', {
                              method: 'post',
                              body: n,
                            }).then(function (e) {
                              i(!1);
                            })
                          );
                        case 12:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function (s) {
                return e.apply(this, arguments);
              };
            })(),
            [],
          ),
          h = (0, g.useCallback)(function () {
            e.current && e.current.click();
          }, []),
          p = function (e, s) {
            'clickaway' !== s && i(!1);
          };
        return (0, V.jsx)('div', {
          className: S,
          children: (0, V.jsxs)('div', {
            className: w,
            children: [
              (0, V.jsxs)('article', {
                className: Z,
                children: [
                  (0, V.jsx)('p', { className: R, children: 'My Book' }),
                  (0, V.jsx)('p', { className: I, children: '\ud30c\uc77c \uc5c5\ub85c\ub4dc' }),
                  (0, V.jsxs)('div', {
                    className: H,
                    children: [
                      (0, V.jsxs)('label', {
                        className: z,
                        children: [
                          '\ud83d\udccc\ucc45 \ud0c0\uc774\ud2c0',
                          (0, V.jsx)('input', {
                            ref: s,
                            className: T,
                            type: 'text',
                            placeholder: '\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.',
                          }),
                        ],
                      }),
                      (0, V.jsxs)('label', {
                        className: z,
                        children: [
                          '\uc11c\ube0c \ud0c0\uc774\ud2c0(option)',
                          (0, V.jsx)('input', {
                            ref: r,
                            className: T,
                            type: 'text',
                            placeholder: '\ubd80\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.',
                          }),
                        ],
                      }),
                      (0, V.jsxs)('label', {
                        className: z,
                        children: [
                          '\uc800\uc790\uba85(option)',
                          (0, V.jsx)('input', {
                            ref: t,
                            className: T,
                            type: 'text',
                            placeholder: '\uc800\uc790\uba85\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, V.jsxs)('aside', {
                className: F,
                children: [
                  (0, V.jsx)('input', {
                    type: 'file',
                    accept: '.pdf',
                    className: A,
                    ref: e,
                    onChange: d,
                  }),
                  (0, V.jsxs)('p', {
                    className: B,
                    children: [
                      (0, V.jsxs)('h3', {
                        children: [
                          (0, V.jsx)('b', {
                            children: '\ud83d\udeab\uc8fc\uc758\uc0ac\ud56d',
                          }),
                          '\ud83d\udeab',
                        ],
                      }),
                      (0, V.jsx)('br', {}),
                      '1. ',
                      (0, V.jsx)('b', { style: { color: 'red' }, children: 'PDF \ud30c\uc77c' }),
                      '\ub9cc \uc5c5\ub85c\ub4dc\uac00 \uac00\ub2a5\ud569\ub2c8\ub2e4.',
                      (0, V.jsx)('br', {}),
                      '2. ',
                      (0, V.jsx)('b', {
                        style: { color: 'red' },
                        children: '\uc81c\ubaa9 \uc791\uc131',
                      }),
                      ' \ud6c4 \ud30c\uc77c \uc120\ud0dd\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694.',
                      (0, V.jsx)('br', {}),
                      '\u2192 \uc791\uc131\ud558\uc9c0 \uc54a\uc744 \uc2dc \ud30c\uc77c\uc774 \uc5c5\ub85c\ub4dc \ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4!',
                    ],
                  }),
                  (0, V.jsx)('button', {
                    className: D,
                    onClick: h,
                    children: '\ud30c\uc77c \uc5c5\ub85c\ub4dc',
                  }),
                  (0, V.jsx)(Y.Z, {
                    open: c,
                    autoHideDuration: 3e3,
                    onClose: p,
                    children: (0, V.jsx)(M.Z, {
                      onClose: p,
                      severity: 'success',
                      sx: { width: '100%' },
                      children: '\ud30c\uc77c \uc5c5\ub85c\ub4dc \uc911\uc785\ub2c8\ub2e4.',
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function X() {
        var e = (0, g.useState)([]),
          s = (0, n.Z)(e, 2),
          r = s[0],
          f = s[1],
          j = (0, g.useState)([]),
          b = (0, n.Z)(j, 2),
          v = b[0],
          N = b[1],
          L = (0, g.useState)([]),
          P = (0, n.Z)(L, 2),
          C = P[0],
          S = P[1],
          w = (0, g.useState)(!1),
          Z = (0, n.Z)(w, 2),
          R = Z[0],
          I = Z[1],
          H = (0, g.useState)(!0),
          z = (0, n.Z)(H, 2),
          T = z[0],
          F = z[1],
          A = (0, g.useState)(!1),
          D = (0, n.Z)(A, 2),
          B = D[0],
          Y = D[1],
          M = (0, g.useState)(!0),
          X = (0, n.Z)(M, 2),
          G = X[0],
          O = X[1];
        (0, g.useEffect)(function () {
          fetch('https://inkyuoh.shop/users/'.concat(58, '/pdfs'))
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              f(e.result);
            })
            .catch(function (e) {
              console.log(e);
            });
        }, []),
          (0, g.useEffect)(function () {
            fetch('https://inkyuoh.shop/pdfs')
              .then(function (e) {
                return e.json();
              })
              .then(function (e) {
                N(e.result), S(e.result);
              })
              .catch(function (e) {
                console.log(e);
              });
          }, []);
        return (0, V.jsxs)('main', {
          className: t,
          children: [
            T ? null : (0, V.jsx)(W, { onClose: F }),
            B
              ? (0, V.jsx)('label', {
                  onClick: function () {
                    F(!T), Y(!B), window.location.reload();
                  },
                  className: m,
                  children: '\ub2eb\uae30',
                })
              : (0, V.jsx)('label', {
                  onClick: function () {
                    F(!T), Y(!B);
                  },
                  className: m,
                  children: 'Upload',
                }),
            (0, V.jsxs)('article', {
              children: [
                (0, V.jsxs)('section', {
                  className: a,
                  children: [
                    (0, V.jsx)('p', {
                      style: { fontSize: '40px', fontWeight: 'bold' },
                      children: 'MY LIBRARY',
                    }),
                    (0, V.jsx)('p', {
                      className: l,
                      children:
                        '\ucd5c\uadfc\uc5d0 \uc77d\uc5c8\ub358 \ucc45 \ub610\ub294 \ud55c \ubc88\uc774\ub77c\ub3c4 \uc5f4\uc5b4\ubd24\ub358 \ucc45 \ub9ac\uc2a4\ud2b8\uc785\ub2c8\ub2e4. \uc624\ub298\ub3c4 Label\uacfc \uc990\uac70\uc6b4 \ucc45 \uc77d\uae30\ub97c \ud574\ubcf4\uc138\uc694.',
                    }),
                    (0, V.jsxs)('label', {
                      className: c,
                      onFocus: function () {
                        I(!0);
                      },
                      children: [
                        (0, V.jsx)('img', { className: i, src: '/images/search.png' }),
                        (0, V.jsx)('input', {
                          onChange: function (e) {
                            e.preventDefault(),
                              '' !== e.target.value &&
                                fetch('https://inkyuoh.shop/pdfs/library/search?keyword='.concat(e.target.value))
                                  .then(function (e) {
                                    return e.json();
                                  })
                                  .then(function (e) {
                                    S(e.result);
                                  });
                          },
                          type: 'text',
                          className: u,
                          placeholder:
                            '\ucc3e\uace0 \uc2f6\uc740 \ucc45 \uc774\ub984 \ub610\ub294 \uc81c\ubaa9\uc744 \uc785\ub825\ud574\ubcf4\uc138\uc694.',
                        }),
                      ],
                    }),
                  ],
                }),
                !0 === R
                  ? (0, V.jsxs)('section', {
                      className: d,
                      children: [
                        (0, V.jsxs)('div', {
                          className: p,
                          children: [
                            (0, V.jsx)('h2', { children: 'Searched Result' }),
                            (0, V.jsx)('button', {
                              className: h,
                              onClick: function () {
                                I(!1);
                              },
                            }),
                          ],
                        }),
                        (0, V.jsx)('div', {
                          className: _,
                          children: (0, V.jsx)(E, { result: C }),
                        }),
                      ],
                    })
                  : (0, V.jsxs)(V.Fragment, {
                      children: [
                        (0, V.jsxs)('section', {
                          className: o,
                          children: [
                            (0, V.jsx)('div', {
                              className: x,
                              children: (0, V.jsx)('h2', { children: 'Recently Read' }),
                            }),
                            (0, V.jsx)('div', {
                              className: _,
                              children: (0, V.jsx)(q, { result: r }),
                            }),
                          ],
                        }),
                        G
                          ? (0, V.jsxs)(V.Fragment, {
                              children: [
                                (0, V.jsxs)('section', {
                                  className: o,
                                  children: [
                                    (0, V.jsx)('div', {
                                      className: x,
                                      children: (0, V.jsx)('h2', {
                                        children: 'How about this one?',
                                      }),
                                    }),
                                    (0, V.jsx)('div', {
                                      className: _,
                                      children: (0, V.jsx)(U, {
                                        result: v,
                                        length: v.length,
                                      }),
                                    }),
                                  ],
                                }),
                                (0, V.jsx)('div', {
                                  className: k,
                                  children: (0, V.jsx)('button', {
                                    className: y,
                                    onClick: function () {
                                      O(!G);
                                    },
                                    children: '\ub354\ubcf4\uae30',
                                  }),
                                }),
                              ],
                            })
                          : (0, V.jsxs)(V.Fragment, {
                              children: [
                                (0, V.jsxs)('section', {
                                  className: o,
                                  children: [
                                    (0, V.jsx)('div', {
                                      className: x,
                                      children: (0, V.jsx)('h2', {
                                        children: 'How about this one?',
                                      }),
                                    }),
                                    (0, V.jsx)('div', {
                                      className: _,
                                      children: (0, V.jsx)(K, {
                                        result: v,
                                        length: v.length,
                                      }),
                                    }),
                                  ],
                                }),
                                (0, V.jsx)('div', { className: k }),
                              ],
                            }),
                      ],
                    }),
              ],
            }),
          ],
        });
      }
      var E = function (e) {
          return (function () {
            for (var s = Array(), r = 0; r < e.result.length; r++) s.push((0, V.jsx)(G, { result: e.result[r] }, r));
            return s;
          })();
        },
        K = function (e) {
          return (function () {
            for (var s = Array(), r = 0; r < e.result.length; r++) s.push((0, V.jsx)(G, { result: e.result[r] }, r));
            return s;
          })();
        },
        U = function (e) {
          return (function () {
            for (var s = Array(), r = 0; r < 8; r++) s.push((0, V.jsx)(G, { result: e.result[r] }, r));
            return s;
          })();
        },
        q = function (e) {
          return (function () {
            for (var s = Array(), r = 0; r < 4; r++) s.push((0, V.jsx)(O, { result: e.result[r] }, r));
            return s;
          })();
        },
        G = function (e) {
          var s,
            r,
            n,
            t = (0, L.s0)();
          return (0, V.jsxs)('div', {
            className: f,
            children: [
              (0, V.jsx)('div', {
                onClick: function () {
                  t('/personalreading', { state: { pdfIdx: e.result.pdfIdx, recentlyReadPage: 1 } });
                },
                className: j,
                style: {
                  backgroundImage:
                    'url(' +
                    ''.concat('' + ''.concat(null === (s = e.result) || void 0 === s ? void 0 : s.firstPageLink)),
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                },
              }),
              (0, V.jsxs)('div', {
                className: b,
                children: [
                  (0, V.jsx)('div', {
                    className: v,
                    children: null === (r = e.result) || void 0 === r ? void 0 : r.pdfName,
                  }),
                  (0, V.jsx)('div', {
                    className: N,
                    children: null === (n = e.result) || void 0 === n ? void 0 : n.author,
                  }),
                ],
              }),
            ],
          });
        },
        O = function (e) {
          var s,
            r,
            n,
            t = (0, L.s0)();
          return (0, V.jsxs)('div', {
            className: f,
            children: [
              (0, V.jsx)('div', {
                onClick: function () {
                  t('/personalreading', {
                    state: { pdfIdx: e.result.pdfIdx, recentlyReadPage: e.result.recentlyReadPage },
                  });
                },
                className: j,
                style: {
                  backgroundImage:
                    'url(' +
                    ''.concat('' + ''.concat(null === (s = e.result) || void 0 === s ? void 0 : s.firstPageLink)),
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                },
              }),
              (0, V.jsxs)('div', {
                className: b,
                children: [
                  (0, V.jsx)('div', {
                    className: v,
                    children: null === (r = e.result) || void 0 === r ? void 0 : r.pdfName,
                  }),
                  (0, V.jsx)('div', {
                    className: N,
                    children: null === (n = e.result) || void 0 === n ? void 0 : n.author,
                  }),
                ],
              }),
            ],
          });
        };
    },
  },
]);
//# sourceMappingURL=788.0d7b9377.chunk.js.map
